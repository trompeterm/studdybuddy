from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tools.chat_completion import ChatCompletion
from tools.group_chat import StudyGroupChat

app = FastAPI()
group_chat = StudyGroupChat()
chat_completion = ChatCompletion()

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate-flashcard")
async def generate_flashcard(topic: str):
    flashcard_data = group_chat.initiate_chat("Please generate a flashcard about " + topic)
    flashcard = chat_completion.generate_flashcard(flashcard_data)
    return flashcard

@app.get("/generate-quiz")
async def generate_quiz(topic: str):
    llm = ChatCompletion()
    quiz = llm.generate_quiz(topic)
    return quiz