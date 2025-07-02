from autogen import ConversableAgent

class FlashcardGenerator:
    def __init__(self):
        self.agent = ConversableAgent(
            name="Flashcard_Generator",
            system_message="""Create educational flashcards. Format: Question: [question] Answer: [answer]. Keep answers under 30 words. No follow-up questions.""",
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