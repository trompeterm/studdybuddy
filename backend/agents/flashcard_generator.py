from autogen import ConversableAgent

class FlashcardGenerator:
    def __init__(self):
        self.agent = ConversableAgent(
            name="Flashcard_Generator",
            system_message="""
            You are a flashcard generator that creates educational flashcards. When asked to generate a flashcard:
            1. Create a clear, concise question that tests understanding
            2. Provide a detailed, accurate answer
            3. Do not ask any kind of follow-up questions such as what specific topic you are generating flashcards for or clarifying the topic.
            4. Format your response as:
               Question: [your question]
               Answer: [your answer]
            
            Focus on creating flashcards that promote deep understanding rather than simple memorization.
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