import { useEffect, useState } from "react";
import { getAllIssues, updateIssueStatus } from "../api/issues";

const STATUSES = ["SUBMITTED", "IN_REVIEW", "IN_PROGRESS", "RESOLVED", "REJECTED"];

function Admin({ onBack }) {
    const [issues, setIssues] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    function loadIssues() {
        getAllIssues()
            .then(setIssues)
            .catch((err) => setError(err.message));
    }

    useEffect(() => {
        loadIssues();
    }, []);

    async function handleStatusChange(issueId, newStatus) {
        setError("");
        setMessage("");
        try {
            await updateIssueStatus(issueId, newStatus);
            setMessage(`Status updated for issue #${issueId}`);
            loadIssues();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div style={{ maxWidth: 700, margin: "40px auto", padding: 24 }}>
            <h2>Admin Dashboard</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}

            <ul style={{ listStyle: "none", padding: 0 }}>
                {issues.map((issue) => (
                    <li key={issue.id} style={{ marginBottom: 12, borderBottom: "1px solid #ddd", paddingBottom: 8 }}>
                        <div>
                            #{issue.id} [{issue.status}] {issue.title} ({issue.municipalityName})
                        </div>
                        <select
                            value={issue.status}
                            onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                        >
                            {STATUSES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </li>
                ))}
            </ul>

            <button onClick={onBack} style={{ marginTop: 20 }}>Back to Dashboard</button>
        </div>
    );
}

export default Admin;