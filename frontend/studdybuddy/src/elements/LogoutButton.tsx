import { useAuth0 } from '@auth0/auth0-react';
import './LoginLogoutButton.css';

const LogoutButton = () => {
    const { logout } = useAuth0();

    return <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Logout
    </button>
}

export default LogoutButton;
