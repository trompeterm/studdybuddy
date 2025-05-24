from autogen import ConversableAgent

class FlashcardGenerator:
    def __init__(self):
        self.agent = ConversableAgent(
            name="Flashcard Generator",
            system_message="You are a flashcard generator that generates flashcards for the user.",
        )

    def get_agent(self):
        return self.agent
