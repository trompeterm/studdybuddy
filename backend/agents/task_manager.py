from autogen import ConversableAgent

class TaskManager:
    def __init__(self):
        self.agent = ConversableAgent(
            name="Task_Manager",
            system_message="""
            You are the coordinator of the team. Your responsibilities include:
            1. Analyzing user requests to determine if they need flashcards or quizzes
            2. Delegating tasks to the appropriate agents (FlashcardGenerator or QuizGenerator)
            3. Ensuring the Refiner verifies the quality of generated content
            4. Coordinating the final response to the user
            
            Please ensure that your responses are concise and to the point.
            """,
            llm_config={
                "config_list": [{"model": "gpt-3.5-turbo"}],
                "temperature": 0.7,
                "timeout": 60
            },
            is_termination_msg=lambda msg: "final answer" in msg.get("content", "").lower(),
            human_input_mode="NEVER"
        )

    def get_agent(self):
        return self.agent