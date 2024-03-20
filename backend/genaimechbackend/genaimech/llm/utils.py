import sys
import os
from llama_index.llms.gemini.base import Gemini
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv, find_dotenv
from llama_index.embeddings.gemini import GeminiEmbedding
import google.generativeai as genai
import yaml
from llama_index.core import Settings


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


sys.path.append(os.getcwd())

load_dotenv(find_dotenv())
genai.configure(api_key=os.environ['GOOGLE_API_KEY'])

llm = ChatGoogleGenerativeAI(model="gemini-pro")

print("os.environ['GOOGLE_API_KEY']", os.environ['GOOGLE_API_KEY'])

Settings.embed_model = GeminiEmbedding(
    model_name="models/embedding-001", api_key=os.environ["GOOGLE_API_KEY"]
)

Settings.llm = Gemini()
