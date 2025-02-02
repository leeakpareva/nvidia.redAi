from langchain_nvidia_ai_endpoints import ChatNVIDIA
import logging
import os

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def test_nvidia_api():
    try:
        client = ChatNVIDIA(
            model="deepseek-ai/deepseek-r1",
            api_key="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",
            temperature=0.6,
            top_p=0.7,
            max_tokens=4096,
        )
        
        messages = [{"role": "user", "content": "What is NVIDIA?"}]
        logger.info("Sending test request to NVIDIA AI")
        
        response = client.stream(messages)
        for chunk in response:
            if chunk and isinstance(chunk.content, str):
                print(chunk.content, end="")
                
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        logger.error(f"Error type: {type(e)}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")

if __name__ == "__main__":
    test_nvidia_api()
