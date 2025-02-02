from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_nvidia_ai_endpoints import ChatNVIDIA
import logging
import traceback
import sys

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI()

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

client = ChatNVIDIA(
    model="deepseek-ai/deepseek-r1",
    api_key="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",
    temperature=0.6,
    top_p=0.7,
    max_tokens=4096,
)

@app.websocket("/chat")
async def chat_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            message = await websocket.receive_text()
            logger.info(f"Received message: {message}")
            try:
                messages = [{"role": "user", "content": message}]
                logger.info(f"Sending request to NVIDIA AI with messages: {messages}")
                try:
                    response_stream = client.stream(messages)
                    logger.info("Got response stream")
                except Exception as api_error:
                    logger.error(f"NVIDIA AI API Error: {str(api_error)}")
                    logger.error(f"API Error Traceback: {traceback.format_exc()}")
                    await websocket.send_text("Error connecting to NVIDIA AI. Please try again.")
                
                response_text = ""
                for chunk in response_stream:
                    if chunk and isinstance(chunk.content, str):
                        # Filter out XML tags
                        content = chunk.content.replace("<think>", "").replace("</think>", "")
                        if content.strip():  # Only send non-empty chunks
                            response_text += content
                            await websocket.send_text(content)
                            print(f"Sent chunk: {content}")
                
                if not response_text:
                    print("No response received from AI")
                    await websocket.send_text("Sorry, I couldn't generate a response. Please try again.")
                    
            except Exception as e:
                error_msg = f"Error in stream: {str(e)}"
                print(error_msg)
                import traceback
                print(f"Traceback: {traceback.format_exc()}")
                await websocket.send_text("Sorry, there was an error processing your request. Please try again.")
                
    except Exception as e:
        print(f"Error in websocket: {str(e)}")
        try:
            await websocket.close(code=1000)
        except Exception as close_error:
            print(f"Error closing websocket: {str(close_error)}")
            pass

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}
