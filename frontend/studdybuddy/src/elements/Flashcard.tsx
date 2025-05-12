import './Flashcard.css';

export default function Flashcard() {
    return (
        <div className="container">
            <div className="info-container">
                <h3>Topic</h3>
                <ul>
                    <li><label>Card #/#</label></li>
                    <li><button>Star</button></li>
                </ul>
            </div>
            <div className="card-container">
                <div className="front">
                    <p>Question</p>
                </div>
                <div className="back">
                    <p>Answer</p>
                </div>
            </div>
            <div className="button-container">
                <button>Previous</button>
                <button>Next</button>
            </div>
        </div>
    );
}
