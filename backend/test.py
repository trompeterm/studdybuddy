from tools.group_chat import StudyGroupChat
from dotenv import load_dotenv

load_dotenv()

group_chat = StudyGroupChat()

# Start the conversation with a specific request
chat_history = group_chat.initiate_chat("Generate a flashcard about the process of photosynthesis in plants")

# Print the conversation in a readable format
print("\n=== Group Chat Conversation ===\n")
for message in chat_history:
    print(f"Agent: {message['name']}")
    print(f"Role: {message['role']}")
    print(f"Message: {message['content']}")
    print("-" * 50)
