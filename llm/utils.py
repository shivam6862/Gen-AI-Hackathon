import yaml

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