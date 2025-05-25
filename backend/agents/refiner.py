from autogen import ConversableAgent

class Refiner:
    def __init__(self):
        self.agent = ConversableAgent(
            name="Refiner",
            system_message="""
            You are a information refiner that verifies the quality of the information provided by other agents. 
            When another agent provides flashcard or quiz questions, you must verify that the information is accurate and correct. 
            If the information is not accurate or correct, you must provide the correct information.
            """
        )

    def get_agent(self):
        return self.agent