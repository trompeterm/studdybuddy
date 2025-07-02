from autogen import ConversableAgent

class Refiner:
    def __init__(self):
        self.agent = ConversableAgent(
            name="Refiner",
            system_message="""Review educational content. Format: Review: [brief assessment] Final Content: [refined content]. Keep content concise.""",
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