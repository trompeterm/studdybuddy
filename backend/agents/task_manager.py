from autogen import ConversableAgent

class TaskManager:
    def __init__(self):
        self.agent = ConversableAgent(
            name="Task Manager",
            system_message="""
            You are the coordinator of the team. 
            Delegate content extraction, flashcard generation, and quiz generation to the appropriate agents.
            """
        )

    def get_agent(self):
        return self.agent