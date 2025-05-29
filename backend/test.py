from tools.group_chat import StudyGroupChat
from dotenv import load_dotenv

load_dotenv()

group_chat = StudyGroupChat()

# Start a group conversation with all agents
chat_history = group_chat.initiate_chat("Let's work together to create a study plan for learning Python programming. The Task Manager should coordinate, the Flashcard Generator should create flashcards, the Quiz Generator should create practice questions, and the Refiner should help improve the materials.")

# Print the chat history to see how the agents interacted
for message in chat_history:
    print(f"\n{message['name']} ({message['role']}):")
    print(message['content'])
