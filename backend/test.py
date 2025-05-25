from tools.group_chat import StudyGroupChat
from dotenv import load_dotenv

load_dotenv()

group_chat = StudyGroupChat()

print(group_chat.initiate_chat("Please generate a flashcard about Science."))
