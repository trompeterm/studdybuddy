import { useAuth0 } from '@auth0/auth0-react';
import './LoginLogoutButton.css';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <button onClick={() => loginWithRedirect()}>
            Login
        </button>
    )
}

export default LoginButton;
