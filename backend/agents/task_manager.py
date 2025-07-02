from autogen import ConversableAgent

class TaskManager:
    def __init__(self):
        self.agent = ConversableAgent(
            name="Task_Manager",
            system_message="""Coordinate team tasks. Delegate to FlashcardGenerator or QuizGenerator, then Refiner. Be concise.""",
            llm_config={
                "config_list": [{"model": "gpt-3.5-turbo"}],
                "temperature": 0.3,
                "timeout": 30
            },
            is_termination_msg=lambda msg: "final answer" in msg.get("content", "").lower(),
            human_input_mode="NEVER"
        )

    def get_agent(self):
        return self.agent