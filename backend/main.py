from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tools.chat_completion import ChatCompletion
app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate-flashcard")
async def generate_flashcard(topic: str):
    llm = ChatCompletion()
    flashcard = llm.generate_flashcard(topic)
    return flashcard