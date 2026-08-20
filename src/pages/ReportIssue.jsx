import { useEffect, useState } from "react";
import { createIssue } from "../api/issues";
import { getCategories, getMunicipalities } from "../api/lookups";

function ReportIssue({ onBack }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("LOW");
    const [categoryId, setCategoryId] = useState("");
    const [municipalityId, setMunicipalityId] = useState("");
    const [categories, setCategories] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        getCategories().then(setCategories).catch((err) => setError(err.message));
        getMunicipalities().then(setMunicipalities).catch((err) => setError(err.message));
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setMessage("");
        try {
            const issue = await createIssue(title, description, priority, Number(municipalityId), Number(categoryId));
            setMessage(`Issue submitted: ${issue.title}`);
            setTitle("");
            setDescription("");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div style={{ maxWidth: 500, margin: "40px auto", padding: 24 }}>
            <h2>Report New Issue</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input
                    type="text"
                    placeholder="Issue title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                </select>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="">Select category</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <select value={municipalityId} onChange={(e) => setMunicipalityId(e.target.value)}>
                    <option value="">Select municipality</option>
                    {municipalities.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
                <button type="submit">Submit Issue</button>
                {message && <p style={{ color: "green" }}>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
            <button onClick={onBack} style={{ marginTop: 10 }}>Back to Dashboard</button>
        </div>
    );
}

export default ReportIssue;