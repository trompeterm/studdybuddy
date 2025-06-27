import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './SavedFlashcards.css';

interface SavedFlashcard {
    id: number;
    question: string;
    answer: string;
    user_id: string;
    starred: boolean;
}

export default function SavedFlashcards() {
    const [flashcards, setFlashcards] = useState<SavedFlashcard[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (isAuthenticated && user) {
            loadUserFlashcards();
        }
    }, [isAuthenticated, user]);

    const loadUserFlashcards = async () => {
        if (!user) return;
        
        setIsLoading(true);
        try {
            const user_id = user.email || user.sub || 'unknown';
            const response = await fetch(`http://127.0.0.1:8000/get-user-flashcards?user_id=${encodeURIComponent(user_id)}`);
            if (response.ok) {
                const data = await response.json();
                setFlashcards(data);
            } else {
                console.error('Failed to load flashcards');
            }
        } catch (error) {
            console.error('Error loading flashcards:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnstar = async (flashcardId: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/unstar-flashcard?flashcard_id=${flashcardId}`, {
                method: 'PATCH'
            });
            if (response.ok) {
                // Remove the flashcard from the list
                setFlashcards(prev => prev.filter(fc => fc.id !== flashcardId));
            } else {
                console.error('Failed to unstar flashcard');
            }
        } catch (error) {
            console.error('Error unstarring flashcard:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="saved-flashcards-container">
                <h1>Saved Flashcards</h1>
                <p>Please log in to view your saved flashcards.</p>
            </div>
        );
    }

    return (
        <div className="saved-flashcards-container">
            <h1>Your Saved Flashcards</h1>
            {isLoading ? (
                <div className="loading">Loading your flashcards...</div>
            ) : flashcards.length === 0 ? (
                <div className="no-flashcards">
                    <p>You haven't saved any flashcards yet.</p>
                    <p>Start studying and click the star icon to save flashcards!</p>
                </div>
            ) : (
                <div className="flashcards-grid">
                    {flashcards.map((flashcard) => (
                        <div key={flashcard.id} className="flashcard-item">
                            <div className="flashcard-header">
                                <h3>Flashcard #{flashcard.id}</h3>
                                <button 
                                    onClick={() => handleUnstar(flashcard.id)}
                                    className="unstar-button"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="flashcard-content">
                                <div className="question">
                                    <strong>Question:</strong>
                                    <p>{flashcard.question}</p>
                                </div>
                                <div className="answer">
                                    <strong>Answer:</strong>
                                    <p>{flashcard.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 