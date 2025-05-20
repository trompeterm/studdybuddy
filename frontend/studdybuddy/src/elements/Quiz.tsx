import './Quiz.css';

interface QuizProps {
    topic: string;
}

export default function Quiz( { topic }: QuizProps) {
    return (
        <div className="quiz-container">
            <div className="quiz-info">
                <h3>{topic}</h3>
                <p>Question #/#</p>
            </div>
            <div className="question-container">
                <p>Question</p>
                <ul>
                    <li><button>Answer 1</button></li>
                    <li><button>Answer 2</button></li>
                    <li><button>Answer 3</button></li>
                    <li><button>Answer 4</button></li>
                </ul>
            </div>
            <div className="quiz-controls">
                <button>Close</button>
                <ul>
                    <button>Previous</button>
                    <button>Next</button>
                </ul>
            </div>
        </div>
    );
}