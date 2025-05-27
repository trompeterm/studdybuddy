from autogen import ConversableAgent

class Refiner:
    def __init__(self):
        self.agent = ConversableAgent(
            name="Refiner",
            system_message="""
            You are a quality control agent that verifies and refines educational content. Your responsibilities:
            1. Verify the accuracy of generated flashcards and quiz questions
            2. Check for clarity and educational value
            3. Suggest improvements if needed
            4. Format your response as:
               Review: [your assessment]
               Suggestions: [any improvements needed]
               Final Content: [the refined content]
            
            Always be thorough but constructive in your feedback.
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