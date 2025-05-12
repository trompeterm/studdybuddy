import { useState } from 'react';
import './Flashcards.css';

export default function Flashcards() {
    const [visibleMath, setVisibleMath] = useState(false);
    const [visibleScience, setVisibleScience] = useState(false);
    const [visibleHistory, setVisibleHistory] = useState(false);
    const [visibleEnglish, setVisibleEnglish] = useState(false);
    const [visibleCoding, setVisibleCoding] = useState(false);

    return (
        <div className="container">
            <h1 className="main-label">I want to studdy...</h1>
            <div className="input-container">
                <div className="input-group">
                    <button onClick={() => setVisibleMath(!visibleMath)}>Math</button>
                    <ul className={visibleMath ? 'visible' : ""}>
                        <li><button>Algebra</button></li>
                        <li><button>Geometry</button></li>
                        <li><button>Calculus</button></li>
                    </ul>
                </div>
                <div className="input-group">
                    <button onClick={() => setVisibleScience(!visibleScience)}>Science</button>
                    <ul className={visibleScience ? 'visible' : ""}>
                        <li><button>Physics</button></li>
                        <li><button>Chemistry</button></li>
                        <li><button>Biology</button></li>
                    </ul>
                </div>
                <div className="input-group">
                    <button onClick={() => setVisibleHistory(!visibleHistory)}>History</button>
                    <ul className={visibleHistory ? 'visible' : ""}>
                        <li><button>World History</button></li>
                        <li><button>US History</button></li>
                        <li><button>European History</button></li>
                    </ul>
                </div>
                <div className="input-group">
                    <button onClick={() => setVisibleEnglish(!visibleEnglish)}>English</button>
                    <ul className={visibleEnglish ? 'visible' : ""}>
                        <li><button>Literature</button></li>
                        <li><button>Grammar</button></li>
                        <li><button>Writing</button></li>
                    </ul>
                </div>
                <div className="input-group">
                    <button onClick={() => setVisibleCoding(!visibleCoding)}>Coding</button>
                    <ul className={visibleCoding ? 'visible' : ""}>
                        <li><button>Python</button></li>
                        <li><button>SQL</button></li>
                        <li><button>Java</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
