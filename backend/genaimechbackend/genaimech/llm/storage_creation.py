from llama_index.core.extractors import SummaryExtractor, TitleExtractor
from llama_index.core import VectorStoreIndex, get_response_synthesizer
from llama_index.core.postprocessor import SimilarityPostprocessor
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.query_engine import RetrieverQueryEngine
import shutil
from llama_index.core.ingestion import IngestionPipeline
import chromadb
from llama_index.core.node_parser import SentenceSplitter
import requests
from pathlib import Path
from llama_index.readers.file import PDFReader
from typing import Any, Callable, List, Sequence
from typing import Union
from llama_index.core.schema import (
    BaseNode,
    Document,
    MetadataMode,
    NodeRelationship,
    TransformComponent,
)
from ..llm.utils import Settings
from llama_index.core import StorageContext
import os
import sys
from llama_index.vector_stores.chroma import ChromaVectorStore
from bs4 import BeautifulSoup
sys.path.append(os.getcwd())

class DocStore:
    def __init__(self):
        self.base_dir = 'genaimech/llm/docs'
        self.vector_store_dir = 'vector_store'
        if not os.path.exists(self.vector_store_dir):
            os.makedirs(self.vector_store_dir)
        self.index = None
        self.pipeline = None

    def create_docs(self, file_name: str) -> List[Document]:
        docs = []
        if file_name == 'link.txt':
            with open(os.path.join(self.base_dir, file_name), 'r') as f:
                links = f.readlines()
                for link in links:
                    # print(link)
                    req = requests.get(link.strip()).content
                    text = BeautifulSoup(req, 'html.parser').get_text()
                    doc = Document(
                        text=text,
                        metadata={
                            'url': link.strip()
                        }
                    )
                    doc.excluded_llm_metadata_keys = ['url']
                    doc.excluded_embed_metadata_keys = ['url']
                    docs.append(doc)
        elif file_name.endswith('.pdf'):
            reader = PDFReader()
            file_path = Path(os.path.join(self.base_dir, file_name))
            docs = reader.load_data(file_path)
            for doc in docs:
                doc.excluded_llm_metadata_keys = ['page_label']
            return docs

        print('Created docs...', end='||')
        return docs

    def create_nodes(self, doc: List[Document]) -> List[BaseNode]:
        if self.pipeline is None:
            extractors = [
                TitleExtractor(nodes=3),
                # SummaryExtractor(),
            ]
            transformations = [SentenceSplitter(
                chunk_size=256, chunk_overlap=20)]
            self.pipeline = IngestionPipeline(
                transformations=transformations,
            )

        return self.pipeline.run(documents=doc)

    def create_index(self) -> VectorStoreIndex:

        final_nodes = []

        for file_name in os.listdir(self.base_dir):
            docs = self.create_docs(file_name)
            nodes = self.create_nodes(docs)
            final_nodes.extend(nodes)

        db = chromadb.PersistentClient(path=self.vector_store_dir)
        chroma_collection = db.get_or_create_collection("quickstart")
        vector_store = ChromaVectorStore(chroma_collection)
        storage_context = StorageContext.from_defaults(
            vector_store=vector_store)

        self.index = VectorStoreIndex(
            nodes=final_nodes, storage_context=storage_context
        )
        return self.index

    def delete_index(self) -> bool:
        try:
            shutil.rmtree(self.vector_store_dir)
            shutil.rmtree(self.base_dir)
            print('Deleted index')
            print('Deleted docs')
            return True
        except:
            return False

    def load_index(self) -> VectorStoreIndex:
        db2 = chromadb.PersistentClient(path="vector_store")
        chroma_collection = db2.get_or_create_collection("quickstart")
        vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
        self.index = VectorStoreIndex.from_vector_store(
            vector_store,
        )
        return self.index

    def search_index(self, query: str) -> List[Document]:

        if self.index is None:
            self.index = self.load_index()

        retriever = VectorIndexRetriever(
            index=self.index,
            similarity_top_k=10,
        )
        response_synthesizer = get_response_synthesizer()

        query_engine = RetrieverQueryEngine(
            retriever=retriever,
        )
        x = retriever.retrieve(query)
        texts, source = [], set()
        for i in x:
            texts.append(i.node.text)
            source.add(i.node.metadata['url'])

        res = self.generate_response(query, texts)
        return {
            'response': res,
            'source': source

        }

    def generate_response(self, query: str, texts: List[str]) -> str:
        template = '''
        You are given below user query.
        User Query: {query}

        Below are the relevant documents found for the query from a reliable source.

        Relevant_Searches : {texts}

        You need to take care of the following points:
        - Use only above information to answer the user query.
        - Do not generate any new or hallucinated information.
        - Return the response in nice and readable format.
'''
        prompt = template.format(query=query, texts='\n'.join(texts))
        res = Settings.llm.complete(prompt)
        return res.text


# A = DocStore()
# A.create_index()
