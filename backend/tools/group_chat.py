from autogen import GroupChat, GroupChatManager, UserProxyAgent
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
        self.user_proxy = UserProxyAgent(
            name="User",
            human_input_mode="NEVER",
            llm_config={
                "config_list": [{"model": "gpt-3.5-turbo"}],
                "temperature": 0.7,
                "timeout": 60
            },
            is_termination_msg=lambda msg: "final answer" in msg.get("content", "").lower()
        )
        
        self.agents = [
            self.task_manager.get_agent(),
            self.flashcard_generator.get_agent(),
            self.quiz_generator.get_agent(),
            self.refiner.get_agent(),
            self.user_proxy
        ]

        self.group_chat = GroupChat(
            agents=self.agents,
            messages=[],
            max_round=5
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

        self.user_proxy.initiate_chat(
            self.manager,
            message=user_message
        )

        chat_history = []
        for message in self.group_chat.messages:
            if isinstance(message, dict):
                chat_history.append({
                    "role": message.get("role", "assistant"),
                    "content": message.get("content", ""),
                    "name": message.get("name", "Unknown")
                })
        
        return chat_history
