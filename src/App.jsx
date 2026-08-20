import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";

function App() {
    const { user } = useAuth();

    if (!user) {
        return <Login />;
    }

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
        </div>
    );
}

export default App;