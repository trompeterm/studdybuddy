import { useState } from 'react';
import './Flashcard.css';

export default function Flashcard() {
    const [flipped, setFlipped] = useState(true);

    return (
        <div className="content-container">
            <div className="info-container">
                <h3>Topic</h3>
                <ul>
                    <li><label>Card #/#</label></li>
                    <li><button>Star</button></li>
                </ul>
            </div>
            <div className="card-container" onClick={() => setFlipped(!flipped)}>
                {/* Front of card */}
                <div className={flipped ? "front" : "back"}>
                    <p className="question-text">This is the question</p>
                    <p className="answer-text">This is the answer</p>
                </div>
            </div>
            <div className="button-container">
                <button>Previous</button>
                <button>Next</button>
            </div>
        </div>
    );
}
