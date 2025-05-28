from tools.group_chat import StudyGroupChat
from dotenv import load_dotenv

load_dotenv()

group_chat = StudyGroupChat()

# Start the conversation with a specific request
chat_history = group_chat.initiate_chat("Generate a flashcard about the process of photosynthesis in plants")

print(group_chat.test())
