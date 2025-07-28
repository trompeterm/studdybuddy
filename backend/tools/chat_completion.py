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
                You have been given group chat message data and you must generate a JSON array that represents 5 flashcards. 
                
                This is the JSON structure for the flashcards:
                
                [
                    {
                        "question": "string",
                        "answer": "string"
                    },
                    {
                        "question": "string",
                        "answer": "string"
                    },
                    {
                        "question": "string",
                        "answer": "string"
                    },
                    {
                        "question": "string",
                        "answer": "string"
                    },
                    {
                        "question": "string",
                        "answer": "string"
                    }
                ]
                
                Return ONLY the JSON array, no additional text or formatting.
                """
                },

                {"role": "user", "content": f"""Please generate a flashcard JSON array given this group chat data: {content}"""}
            ]
        )
        return response.choices[0].message.content
    
    def generate_quiz(self, content: str) -> str:
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": 
                
                """
                You have been given group chat message data and you must generate a JSON array that represents 5 quiz questions. 
                
                This is the JSON structure for the quiz questions:
                
                [
                    {
                        "question": "string",
                        "answer1": "string",
                        "answer2": "string",
                        "answer3": "string",
                        "answer4": "string",
                        "correctAnswer": 1
                    },
                    {
                        "question": "string",
                        "answer1": "string",
                        "answer2": "string",
                        "answer3": "string",
                        "answer4": "string",
                        "correctAnswer": 2
                    },
                    {
                        "question": "string",
                        "answer1": "string",
                        "answer2": "string",
                        "answer3": "string",
                        "answer4": "string",
                        "correctAnswer": 3
                    },
                    {
                        "question": "string",
                        "answer1": "string",
                        "answer2": "string",
                        "answer3": "string",
                        "answer4": "string",
                        "correctAnswer": 4
                    },
                    {
                        "question": "string",
                        "answer1": "string",
                        "answer2": "string",
                        "answer3": "string",
                        "answer4": "string",
                        "correctAnswer": 1
                    }
                ]
                
                Return ONLY the JSON array, no additional text or formatting.
                """
                },

                {"role": "user", "content": f"""Please generate a quiz JSON array given this group chat data: {content}"""}
            ]
        )
        return response.choices[0].message.content

