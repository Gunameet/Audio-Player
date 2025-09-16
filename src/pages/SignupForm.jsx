import { useState } from "react";
import { Card, Input, Button, Form, Divider } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        localStorage.setItem("user", JSON.stringify({ email, password }));
        localStorage.setItem("auth", "true");
        navigate("/", { replace: true });
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen w-screen overflow-hidden"
            style={{
                backgroundImage:
                    'url("https://www.baps.org/Data/Sites/1/Media/GalleryImages/33296/WebImages/2025_06_02_001_Kanad.jpg")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <Card
                className="w-96 p-6 rounded-2xl shadow-xl"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
            >
                <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

                {/* Google Signup */}
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        const decoded = jwtDecode(credentialResponse.credential);
                        console.log("Google user:", decoded);

                        localStorage.setItem("user", JSON.stringify(decoded));
                        localStorage.setItem("auth", "true");
                        navigate("/", { replace: true });
                    }}
                    onError={() => console.log("Google signup failed")}
                />

                <Divider>Or continue with</Divider>

                {/* Manual Email Signup */}
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Email">
                        <Input
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="Password">
                        <Input.Password
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="Confirm Password">
                        <Input.Password
                            placeholder="Re-enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" block htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                {/* login link */}
                <div className="text-center mt-4">
                    <span>You have an account? </span>
                    <Link to="/login" className="text-blue-600 font-semibold">
                        Login
                    </Link>
                </div>
            </Card>
        </div>
    );
}

export default SignupForm;
