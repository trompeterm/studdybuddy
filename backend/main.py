from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from tools.chat_completion import ChatCompletion
from tools.group_chat import StudyGroupChat
from sqlalchemy.orm import Session
from tools.database import SessionLocal
from tools.models import Flashcard

app = FastAPI()
group_chat = StudyGroupChat()
chat_completion = ChatCompletion()

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/star-flashcard")
async def star_flashcard(db: Session = Depends(get_db)):
    return db.query(Flashcard).all()

@app.get("/generate-flashcard")
async def generate_flashcard(topic: str):
    flashcard_data = group_chat.initiate_chat("Please generate a flashcard about " + topic)
    flashcard = chat_completion.generate_flashcard(flashcard_data)
    return flashcard

@app.get("/generate-quiz")
async def generate_quiz(topic: str):
    quiz_data = group_chat.initiate_chat("Please generate a quiz about " + topic)
    quiz = chat_completion.generate_quiz(quiz_data)
    return quiz