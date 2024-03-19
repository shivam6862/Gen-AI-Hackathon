import logging
import os
import random
import re

os.environ["SYCL_PI_LEVEL_ZERO_USE_IMMEDIATE_COMMANDLISTS"] = "1"
os.environ["ENABLE_SDP_FUSION"] = "1"
import warnings

warnings.filterwarnings("ignore")

import torch
import intel_extension_for_pytorch as ipex

from transformers import AutoModelForCausalLM, AutoTokenizer
from transformers import LlamaTokenizer, LlamaForCausalLM
from transformers import BertTokenizer, BertForSequenceClassification

from ipywidgets import VBox, HBox, Button, Dropdown, IntSlider, FloatSlider, Text, Output, Label, Layout
import ipywidgets as widgets
from ipywidgets import HTML


# random seed
if torch.xpu.is_available():
    seed = 88
    random.seed(seed)
    torch.xpu.manual_seed(seed)
    torch.xpu.manual_seed_all(seed)

def select_device(preferred_device=None):
    """
    Selects the best available XPU device or the preferred device if specified.

    Args:
        preferred_device (str, optional): Preferred device string (e.g., "cpu", "xpu", "xpu:0", "xpu:1", etc.). If None, a random available XPU device will be selected or CPU if no XPU devices are available.

    Returns:
        torch.device: The selected device object.
    """
    try:
        if preferred_device and preferred_device.startswith("cpu"):
            print("Using CPU.")
            return torch.device("cpu")
        if preferred_device and preferred_device.startswith("xpu"):
            if preferred_device == "xpu" or (
                ":" in preferred_device
                and int(preferred_device.split(":")[1]) >= torch.xpu.device_count()
            ):
                preferred_device = (
                    None  # Handle as if no preferred device was specified
                )
            else:
                device = torch.device(preferred_device)
                if device.type == "xpu" and device.index < torch.xpu.device_count():
                    vram_used = torch.xpu.memory_allocated(device) / (
                        1024**2
                    )  # In MB
                    print(
                        f"Using preferred device: {device}, VRAM used: {vram_used:.2f} MB"
                    )
                    return device

        if torch.xpu.is_available():
            device_id = random.choice(
                range(torch.xpu.device_count())
            )  # Select a random available XPU device
            device = torch.device(f"xpu:{device_id}")
            vram_used = torch.xpu.memory_allocated(device) / (1024**2)  # In MB
            print(f"Selected device: {device}, VRAM used: {vram_used:.2f} MB")
            return device
    except Exception as e:
        print(f"An error occurred while selecting the device: {e}")
    print("No XPU devices available or preferred device not found. Using CPU.")
    return torch.device("cpu")


print( select_device())
