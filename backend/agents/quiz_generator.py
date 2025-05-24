from autogen import ConversableAgent

class QuizGenerator:
    def __init__(self):
        self.agent = ConversableAgent(
            name="Quiz Generator",
            system_message="You are a quiz generator that generates quizzes for the user.",
        )

    def get_agent(self):
        return self.agent
