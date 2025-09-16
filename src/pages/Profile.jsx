import { useEffect, useState } from "react";
import { Card, Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (auth !== "true" || !storedUser) {
            navigate("/login", { replace: true }); // redirect if not logged in
        } else {
            setUser(storedUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
        navigate("/login", { replace: true }); // redirect after logout
    };

    if (!user) return null; // prevent flicker while loading

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card
                className="w-96 p-6 rounded-2xl shadow-xl text-center"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            >
                <h2 className="text-2xl font-bold mb-4">My Profile</h2>

                {/* Show Google or manual signup data */}
                {user.picture && (
                    <img
                        src={user.picture}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                )}

                <p className="text-lg">
                    <strong>Name:</strong> {user.name || "N/A"}
                </p>
                <p className="text-lg">
                    <strong>Email:</strong> {user.email || "N/A"}
                </p>

                <div className="mt-6 flex flex-col gap-3">
                    <Button type="primary" onClick={() => navigate("/")}>
                        Back to Home
                    </Button>
                    <Divider />
                    <Button danger onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </Card>
        </div>
    );
}
