from peft import PeftModel
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import torch
import yaml
from sentence_transformers import SentenceTransformer
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core import Settings
from llama_index.llms.huggingface import HuggingFaceLLM
from llama_index.core import PromptTemplate
from transformers import AutoModelForCausalLM, AutoTokenizer, GPTQConfig, TrainingArguments


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


Settings.embed_model = HuggingFaceEmbedding(
    model_name="BAAI/bge-small-en-v1.5")

query_wrapper_prompt = PromptTemplate(
    "Below is an instruction that describes a task. "
    "Write a response that appropriately completes the request.\n\n"
    "### Instruction:\n{query_str}\n\n### Response:"
)

bnb_config = GPTQConfig(bits=4, disable_exllama=True)
x = "Intel/Mistral-7B-v0.1-int4-inc"
tokenizer = AutoTokenizer.from_pretrained(x)
tokenizer.pad_token = tokenizer.eos_token

model = AutoModelForCausalLM.from_pretrained(x,
                                             quantization_config=bnb_config,
                                             device_map="auto",
                                             use_cache=False,
                                             )


llm = HuggingFaceLLM(
    context_window=2048,
    max_new_tokens=256,
    # quantization_config=gptq_config,
    generate_kwargs={"temperature": 0.25, "do_sample": False},
    query_wrapper_prompt=query_wrapper_prompt,
    tokenizer=tokenizer,
    #    model_name="Intel/neural-chat-7b-v3-1-int4-inc",
    model=model,
    device_map="auto",
    tokenizer_kwargs={"max_length": 2048},
    # uncomment this if using CUDA to reduce memory usage
    # model_kwargs={"torch_dtype": torch.float16}
)

Settings.chunk_size = 512
Settings.llm = llm


base_model_id = "mistralai/Mistral-7B-v0.1"
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16
)

base_model = AutoModelForCausalLM.from_pretrained(
    base_model_id,  # Mistral, same as before
    quantization_config=bnb_config,  # Same quantization config as before
    device_map="auto",
    trust_remote_code=True,
)

eval_tokenizer = AutoTokenizer.from_pretrained(
    base_model_id,
    add_bos_token=True,
    trust_remote_code=True,
)

ft_model = PeftModel.from_pretrained(base_model, "results/checkpoint-144")

#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
# import sys
# import os
# from llama_index.llms.gemini.base import Gemini
# from langchain_google_genai import ChatGoogleGenerativeAI
# from dotenv import load_dotenv, find_dotenv
# from llama_index.embeddings.gemini import GeminiEmbedding
# import google.generativeai as genai
# import yaml
# from llama_index.core import Settings


# def load_config(CONFIG_PATH):
#     with open(CONFIG_PATH, 'r') as f:
#         config = yaml.safe_load(f)
#     return config


# def generate_prompt_medical(question, context, answer=None):
#     """Generates a prompt from the given question, context, and answer."""
#     if answer:
#         return f"question: {question} context: {context} answer: {answer} </s>"
#     else:
#         return f"question: {question} context: {context} </s>"


# sys.path.append(os.getcwd())

# load_dotenv(find_dotenv())
# genai.configure(api_key=os.environ['GOOGLE_API_KEY'])

# llm = ChatGoogleGenerativeAI(model="gemini-pro")

# print("os.environ['GOOGLE_API_KEY']", os.environ['GOOGLE_API_KEY'])

# Settings.embed_model = GeminiEmbedding(
#     model_name="models/embedding-001", api_key=os.environ["GOOGLE_API_KEY"]
# )

# Settings.llm = Gemini()
