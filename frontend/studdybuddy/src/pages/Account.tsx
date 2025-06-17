import LoginButton from '../elements/LoginButton';
import LogoutButton from '../elements/LogoutButton';
import './Account.css';
import { useAuth0 } from '@auth0/auth0-react'

export default function Account() {
    const { user, isLoading } = useAuth0();
    let account = user?.email;

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(!user) {
        account = "Not logged in"
    }

    return (
        <>
            <div className="account-header">
                <h1>Account Information</h1>
                <div className="account-buttons">
                    <LoginButton />
                    <LogoutButton />
                </div>
            </div>
            <div className="account-container">
                <h3>Account: {account}</h3>
            </div>
        </>
    )
}
