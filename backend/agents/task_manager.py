from autogen import ConversableAgent

class TaskManager:
    def __init__(self):
        self.agent = ConversableAgent(
            name="Task_Manager",
            system_message="""Coordinate team tasks. Delegate to FlashcardGenerator OR QuizGenerator (not both), then Refiner. Be concise.
            It is important that only one of FlashcardGenerator or QuizGenerator speaks in the chat.
            If you are asked to generate a flashcard, you should delegate to FlashcardGenerator.
            If you are asked to generate a quiz, you should delegate to QuizGenerator.
            If asked for a flashcard, do not generate a quiz. If asked for a quiz, do not generate a flashcard.
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