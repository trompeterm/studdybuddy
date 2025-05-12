import './Flashcards.css';

export default function Flashcards() {
    return (
        <div className="container">
            <h1 className="main-label">I want to studdy...</h1>
            <div className="input-container">
                <div className="input-group">
                    <button>Math</button>
                </div>
                <div className="input-group">
                    <button>Science</button>
                </div>
                <div className="input-group">
                    <button>History</button>
                </div>
                <div className="input-group">
                    <button>English</button>
                </div>
                <div className="input-group">
                    <button>Coding</button>
                </div>
            </div>
        </div>
    )
}
