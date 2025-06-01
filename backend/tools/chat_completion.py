from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

class ChatCompletion:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    def generate_flashcard(self, content: str) -> str:
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": 
                
                """
                You have been given group chat message data and you must generate a JSON object that represents a flashcard. 
                
                This is the JSON structure for the flashcard:
                
                {
                    "question": "string",
                    "answer": "string"
                }
                """
                },

                {"role": "user", "content": f"""Please generate a flashcard JSON given this group chat data: {content}"""}
            ],
            response_format={"type": "json_object"}
        )
        return response.choices[0].message.content
    
    def generate_quiz(self, topic: str) -> str:
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": 
                
                """
                You are a professional tutor that creates quizzes for users. 
                You will be given a topic and you will generate a quiz for the user.
                
                If asked for a quiz, you will generate a quiz with this JSON structure:
                
                {
                    "question": "string",
                    "answer1": "string",
                    "answer2": "string",
                    "answer3": "string",
                    "answer4": "string",
                    "correctAnswer": "number"
                }
                """
                },

                {"role": "user", "content": f"""Please generate me a quiz questionabout {topic}"""}
            ],
            response_format={"type": "json_object"}
        )
        return response.choices[0].message.content

