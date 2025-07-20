from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from tools.chat_completion import ChatCompletion
from tools.group_chat import StudyGroupChat
from sqlalchemy.orm import Session
from tools.database import SessionLocal
from tools.models import Flashcard
from tools.pdf_reader import PDFReader
from pydantic import BaseModel

app = FastAPI()
group_chat = StudyGroupChat()
chat_completion = ChatCompletion()

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["https://studdybuddy-gamma.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class FlashcardCreate(BaseModel):
    question: str
    answer: str
    user_id: str

@app.get("/get-flashcards")
async def get_flashcards(db: Session = Depends(get_db)):
    return db.query(Flashcard).all()

@app.get("/get-user-flashcards")
async def get_user_flashcards(user_id: str, db: Session = Depends(get_db)):
    flashcards = db.query(Flashcard).filter(Flashcard.user_id == user_id).all()
    return flashcards

@app.get("/generate-flashcard")
async def generate_flashcard(topic: str):
    flashcard_data = group_chat.initiate_chat("Please generate a flashcard about " + topic)
    flashcard = chat_completion.generate_flashcard(flashcard_data)
    return flashcard

@app.post("/save-flashcard")
async def save_flashcard(flashcard: FlashcardCreate, db: Session = Depends(get_db)):
    db_flashcard = Flashcard(
        question=flashcard.question,
        answer=flashcard.answer,
        user_id=flashcard.user_id,
        starred=True
    )
    db.add(db_flashcard)
    db.commit()
    db.refresh(db_flashcard)
    return {"message": "Flashcard saved", "id": db_flashcard.id}

@app.get("/generate-quiz")
async def generate_quiz(topic: str):
    quiz_data = group_chat.initiate_chat("Please generate a quiz question about " + topic)
    quiz = chat_completion.generate_quiz(quiz_data)
    return quiz

@app.patch("/star-flashcard")
async def star_flashcard(flashcard_id: int, db: Session = Depends(get_db)):
    flashcard = db.query(Flashcard).filter(Flashcard.id == flashcard_id).first()
    if not flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    flashcard.starred = True
    db.commit()
    return {"message": "Flashcard starred"}

@app.patch("/unstar-flashcard")
async def unstar_flashcard(flashcard_id: int, db: Session = Depends(get_db)):
    flashcard = db.query(Flashcard).filter(Flashcard.id == flashcard_id).first()
    if not flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    flashcard.starred = False
    db.commit()
    return {"message": "Flashcard unstarred"}

@app.post("/flashcard-from-pdf")
async def flashcard_from_pdf(file: UploadFile = File(...)):
    # Save uploaded file to a temporary location
    import tempfile
    import shutil
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name
    pdf_reader = PDFReader(tmp_path)
    text = pdf_reader.get_text()
    flashcard_data = group_chat.initiate_chat("Please generate a flashcard from these class notes: " + str(text))
    flashcard = chat_completion.generate_flashcard(flashcard_data)
    return flashcard