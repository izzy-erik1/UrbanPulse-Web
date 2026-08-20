import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
    const { user } = useAuth();
    const [showRegister, setShowRegister] = useState(false);

    if (!user) {
        return showRegister ? (
            <Register onSuccess={() => setShowRegister(false)} />
        ) : (
            <Login onRegisterClick={() => setShowRegister(true)} />
        );
    }

    return <Dashboard />;
}

export default App;