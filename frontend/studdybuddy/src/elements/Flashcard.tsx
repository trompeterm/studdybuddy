import { useState } from 'react';
import './Flashcard.css';

export default function Flashcard() {
    const [isQuestionSide, setIsQuestionSide] = useState(true);

    return (
        <div className="content-container">
            <div className="info-container">
                <h3>Topic</h3>
                <ul>
                    <li><label>Card #/#</label></li>
                    <li><button>Star</button></li>
                </ul>
            </div>
            <div className="card-container" onClick={() => setIsQuestionSide(!isQuestionSide)}>
                {/* Front of card */}
                <div className={isQuestionSide ? "front" : "back"}>
                    <p className={isQuestionSide ? "show" : ""}>This is the,dsfnsdfs,dmf ,mdsfn ,msd n,mds sdfdsfdsfdsffdsfndsf sdf  sdf ds fdf fsdf dsfdsfdsffsfdsfdsquestion</p>
                    <p className={isQuestionSide ? "" : "show"}>This is the answer</p>
                </div>
            </div>
            <div className="button-container">
                <button>Previous</button>
                <button>Next</button>
            </div>
        </div>
    );
}
