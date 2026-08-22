import { useState } from "react";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

function Login({ onRegisterClick }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { loginUser } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            const data = await login(email, password);
            loginUser(data.user, data.token);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="card">
            <h2>UrbanPulse Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {error && <p className="error-text">{error}</p>}
            </form>
            <button onClick={onRegisterClick} className="link-button" style={{ marginTop: 10 }}>
                Don't have an account? Register
            </button>
        </div>
    );
}

export default Login;