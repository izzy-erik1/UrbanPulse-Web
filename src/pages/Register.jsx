import { useState } from "react";
import { register } from "../api/auth";

function Register({ onSuccess }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("CITIZEN");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setMessage("");
        try {
            const user = await register(name, email, password, role);
            setMessage(`Account created for ${user.name}! You can now log in.`);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="card">
            <h2>UrbanPulse Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password (min 8 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="CITIZEN">Citizen</option>
                    <option value="MUNICIPALITY_STAFF">Municipality Staff</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <button type="submit">Register</button>
                {message && <p className="success-text">{message}</p>}
                {error && <p className="error-text">{error}</p>}
            </form>
            <button onClick={onSuccess} className="link-button" style={{ marginTop: 10 }}>
                Already have an account? Login
            </button>
        </div>
    );
}

export default Register;