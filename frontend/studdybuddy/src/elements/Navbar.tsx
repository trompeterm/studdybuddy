import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './Navbar.css';

function CustomLink({ to, children, ...props }: any) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <li className={ isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}

export default function Navbar() {
    return (
        <div className="nav">
            <Link to="/" className="site-title">StuddyBuddy</Link>
            <ul>
                <CustomLink to="/flashcard">Flashcards</CustomLink>
                <CustomLink to="/quiz">Quiz</CustomLink>
                <CustomLink to="/game">Games</CustomLink>
                <CustomLink to="/upload">Upload</CustomLink>
            </ul>
        </div>
    );
}