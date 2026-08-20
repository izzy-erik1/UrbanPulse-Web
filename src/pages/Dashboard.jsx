import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllIssues } from "../api/issues";
import ReportIssue from "./ReportIssue";
import IssueDetail from "./IssueDetail";

function Dashboard() {
    const { user, logoutUser } = useAuth();
    const [issues, setIssues] = useState([]);
    const [error, setError] = useState("");
    const [showReportIssue, setShowReportIssue] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);

    useEffect(() => {
        getAllIssues()
            .then((data) => setIssues(data.filter((i) => i.reporterName === user.name)))
            .catch((err) => setError(err.message));
    }, [showReportIssue, selectedIssue]);

    if (showReportIssue) {
        return <ReportIssue onBack={() => setShowReportIssue(false)} />;
    }

    if (selectedIssue) {
        return <IssueDetail issue={selectedIssue} onBack={() => setSelectedIssue(null)} />;
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
                        <li
                            key={issue.id}
                            onClick={() => setSelectedIssue(issue)}
                            style={{ cursor: "pointer", textDecoration: "underline", marginBottom: 6 }}
                        >
                            [{issue.status}] {issue.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;