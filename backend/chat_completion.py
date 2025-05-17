from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

class ChatCompletion:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    def generate(self, message: str) -> str:
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": 
                
                """
                You are a professional tutor that creates flashcards and quizzes for users. 
                You will be given a topic and you will generate a flashcard or a quiz for the user.
                
                If asked for a flashcard, you will generate a flashcard with this JSON structure:
                
                {
                    "question": "string",
                    "answer": "string"
                }
                
                If asked for a quiz, you will generate a quiz question with this JSON structure:
                
                {
                    "question": "string",
                    "options": ["string", "string", "string", "string"],
                    "answer": "string"
                }
                
                """
                },

                {"role": "user", "content": message}
            ],
            response_format={"type": "json_object"}
        )
        return response.choices[0].message.content