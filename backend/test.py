from tools.group_chat import StudyGroupChat
from dotenv import load_dotenv

load_dotenv()

group_chat = StudyGroupChat()

# Start a group conversation with all agents
chat_history = group_chat.initiate_chat("Generate me a flashcard about any topic in Science")

# Print the chat history to see how the agents interacted
print("\n=== Group Chat Conversation ===\n")
for message in chat_history:
    print(f"\n{message['name']} ({message['role']}):")
    print(message['content'])
