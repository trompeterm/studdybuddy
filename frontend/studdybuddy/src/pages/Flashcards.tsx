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
                        <li>Algebra</li>
                        <li>Geometry</li>
                        <li>Calculus</li>
                    </ul>
                </div>
                <div className="input-group">
                    <button onClick={() => setVisibleScience(!visibleScience)}>Science</button>
                    <ul className={visibleScience ? 'visible' : ""}>
                        <li>Physics</li>
                        <li>Chemistry</li>
                        <li>Biology</li>
                    </ul>
                </div>
                <div className="input-group">
                    <button onClick={() => setVisibleHistory(!visibleHistory)}>History</button>
                    <ul className={visibleHistory ? 'visible' : ""}>
                        <li>World History</li>
                        <li>US History</li>
                        <li>European History</li>
                    </ul>
                </div>
                <div className="input-group">
                    <button onClick={() => setVisibleEnglish(!visibleEnglish)}>English</button>
                    <ul className={visibleEnglish ? 'visible' : ""}>
                        <li>Literature</li>
                        <li>Grammar</li>
                        <li>Writing</li>
                    </ul>
                </div>
                <div className="input-group">
                    <button onClick={() => setVisibleCoding(!visibleCoding)}>Coding</button>
                    <ul className={visibleCoding ? 'visible' : ""}>
                        <li>Python</li>
                        <li>SQL</li>
                        <li>Java</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
