from chat_completion import ChatCompletion

def main():
    chat_completion = ChatCompletion()
    print(chat_completion.generate("Generate a flashcard for the topic 'Python'"))


if __name__ == "__main__":
    main()
