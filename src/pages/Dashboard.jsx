import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllIssues } from "../api/issues";
import ReportIssue from "./ReportIssue";

function Dashboard() {
    const { user, logoutUser } = useAuth();
    const [issues, setIssues] = useState([]);
    const [error, setError] = useState("");
    const [showReportIssue, setShowReportIssue] = useState(false);

    useEffect(() => {
        getAllIssues()
            .then((data) => setIssues(data.filter((i) => i.reporterName === user.name)))
            .catch((err) => setError(err.message));
    }, [showReportIssue]);

    if (showReportIssue) {
        return <ReportIssue onBack={() => setShowReportIssue(false)} />;
    }

    return (
        <div>
            <div style={{
                backgroundColor: "#2c3e50",
                color: "white",
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
            }}>
                <h2 style={{ margin: 0 }}>Welcome, {user.name}</h2>
                <button onClick={() => setShowReportIssue(true)}>Report New Issue</button>
                <button onClick={logoutUser} style={{ marginLeft: "auto" }}>Log out</button>
            </div>

            <div style={{ padding: 24 }}>
                <h3>My Reported Issues</h3>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {issues.length === 0 && !error && <p>No issues reported yet.</p>}
                <ul>
                    {issues.map((issue) => (
                        <li key={issue.id}>
                            [{issue.status}] {issue.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;