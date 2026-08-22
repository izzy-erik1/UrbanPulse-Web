import { useEffect, useState } from "react";
import { getCommentsByIssue, addComment } from "../api/comments";

function IssueDetail({ issue, onBack }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState("");

    function loadComments() {
        getCommentsByIssue(issue.id)
            .then(setComments)
            .catch((err) => setError(err.message));
    }

    useEffect(() => {
        loadComments();
    }, []);

    async function handlePostComment(e) {
        e.preventDefault();
        setError("");
        try {
            await addComment(newComment, issue.id);
            setNewComment("");
            loadComments();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="card-wide">
            <h2>{issue.title}</h2>
            <p><strong>Status:</strong> {issue.status}</p>
            <p><strong>Priority:</strong> {issue.priority}</p>
            <p><strong>Category:</strong> {issue.categoryName}</p>
            <p><strong>Municipality:</strong> {issue.municipalityName}</p>
            <p>{issue.description}</p>

            <hr style={{ margin: "20px 0" }} />

            <h3>Comments</h3>
            {error && <p className="error-text">{error}</p>}
            <ul>
                {comments.map((c) => (
                    <li key={c.id}>
                        <strong>{c.authorName}:</strong> {c.content}
                    </li>
                ))}
            </ul>

            <form onSubmit={handlePostComment} style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{ flex: 1 }}
                />
                <button type="submit">Post</button>
            </form>

            <button onClick={onBack} style={{ marginTop: 20 }}>Back to Dashboard</button>
        </div>
    );
}

export default IssueDetail;