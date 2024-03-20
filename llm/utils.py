import yaml
from sentence_transformers import SentenceTransformer
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core import Settings
from llama_index.llms.huggingface import HuggingFaceLLM
from llama_index.core import PromptTemplate

def load_config(CONFIG_PATH):
  with open(CONFIG_PATH, 'r') as f:
      config = yaml.safe_load(f)
  return config
  

def generate_prompt_medical(question, context, answer=None):
    """Generates a prompt from the given question, context, and answer."""
    if answer:
        return f"question: {question} context: {context} answer: {answer} </s>"
    else:
        return f"question: {question} context: {context} </s>"
    

Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")

query_wrapper_prompt = PromptTemplate(
    "Below is an instruction that describes a task. "
    "Write a response that appropriately completes the request.\n\n"
    "### Instruction:\n{query_str}\n\n### Response:"
)

llm = HuggingFaceLLM(
    context_window=2048,
    max_new_tokens=256,
    generate_kwargs={"temperature": 0.25, "do_sample": False},
    query_wrapper_prompt=query_wrapper_prompt,
    tokenizer_name="Intel/neural-chat-7b-v3-1-int4-inc",
    model_name="Intel/neural-chat-7b-v3-1-int4-inc",
    device_map="auto",
    tokenizer_kwargs={"max_length": 2048},
    # uncomment this if using CUDA to reduce memory usage
    # model_kwargs={"torch_dtype": torch.float16}
)

Settings.chunk_size = 512
Settings.llm = llm

