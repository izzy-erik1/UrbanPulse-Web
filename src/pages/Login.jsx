import { useState } from "react";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

function Login() {
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
        <div style={{ maxWidth: 360, margin: "60px auto" }}>
            <h2>UrbanPulse Login</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}

export default Login;