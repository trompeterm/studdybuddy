from autogen import GroupChat, GroupChatManager
from agents.task_manager import TaskManager
from agents.flashcard_generator import FlashcardGenerator
from agents.quiz_generator import QuizGenerator
from agents.refiner import Refiner


class StudyGroupChat:
    def __init__(self):
        self.task_manager = TaskManager()
        self.flashcard_generator = FlashcardGenerator()
        self.quiz_generator = QuizGenerator()
        self.refiner = Refiner()
        
        self.agents = [
            self.task_manager.get_agent(),
            self.flashcard_generator.get_agent(),
            self.quiz_generator.get_agent(),
            self.refiner.get_agent()
        ]

        self.group_chat = GroupChat(
            agents=self.agents,
            messages=[
                {
                    "role": "user",
                    "content": "Please generate flashcard content (question and answer) or a quiz question (question, 3 incorrect answers, and the correct answer) for the user."
                }
            ],
            max_round=10
        )

        self.manager = GroupChatManager(
            groupchat=self.group_chat,
            llm_config={
                "config_list": [{"model": "gpt-3.5-turbo"}],
                "temperature": 0.7,
                "timeout": 60
            }
        )
    
    def initiate_chat(self, user_message: str):
        chat_result = self.manager.run(
            messages=[{
                "role": "user",
                "content": user_message
            }]
        )

        # Extract the chat history from the group chat
        chat_history = []
        for message in self.group_chat.messages:
            if isinstance(message, dict):  # Ensure message is a dictionary
                chat_history.append({
                    "role": message.get("role", "assistant"),
                    "content": message.get("content", ""),
                    "name": message.get("name", "Unknown")
                })
        
        return chat_history
