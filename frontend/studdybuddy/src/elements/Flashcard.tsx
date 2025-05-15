import { useState } from 'react';
import { Star } from 'lucide-react';
import './Flashcard.css';

export default function Flashcard() {
    const [isQuestionSide, setIsQuestionSide] = useState(true);

    return (
        <div className="content-container">
            <div className="info-container">
                <h3>Topic</h3>
                <ul>
                    <li><label>Card #/#</label></li>
                    <li><Star>Star</Star></li>
                </ul>
            </div>
            <div className="card-container" onClick={() => setIsQuestionSide(!isQuestionSide)}>
                {/* Front of card */}
                <div className={isQuestionSide ? "front" : "back"}>
                    <p className={isQuestionSide ? "show" : ""}>This is the question</p>
                    <p className={isQuestionSide ? "" : "show"}>This is the answer</p>
                </div>
            </div>
            <div className="button-container">
                <button>Close</button>
                <ul>
                    <button>Previous</button>
                    <button>Next</button>
                </ul>
            </div>
        </div>
    );
}
