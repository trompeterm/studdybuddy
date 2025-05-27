from autogen import ConversableAgent

class QuizGenerator:
    def __init__(self):
        self.agent = ConversableAgent(
            name="Quiz_Generator",
            system_message="""
            You are a quiz generator that creates educational multiple-choice questions. When asked to generate a quiz:
            1. Create a clear, focused question
            2. Provide 4 answer choices (A, B, C, D)
            3. Include one correct answer and three plausible distractors
            4. Format your response as:
               Question: [your question]
               A) [first choice]
               B) [second choice]
               C) [third choice]
               D) [fourth choice]
               Correct Answer: [letter]
            
            Focus on creating questions that test understanding and application of concepts.
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