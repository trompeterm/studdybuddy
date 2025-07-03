from autogen import ConversableAgent

class QuizGenerator:
    def __init__(self):
        self.agent = ConversableAgent(
            name="Quiz_Generator",
            system_message="""You are responsible for creating educational quiz questions.
            Only respond if TaskManager explicitly asks you to generate a question.
            If the task is not directed at you, say nothing.
            """,
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