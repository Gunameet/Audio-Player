import { useState } from "react";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Name is required!");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long!");
            return;
        }

        if (!role) {
            setError("Please select a role!");
            return;
        }

        setIsLoading(true);

        try {
            console.log("Attempting to connect to API...");
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email,
                    password,
                    role,
                }),
            });

            console.log("Response status:", response.status);
            const data = await response.json();
            // console.log("Response data:", data);

            if (response.ok) {
                // Signup successful
                const normalizedRole = (data.user?.role || role).toString().toLowerCase();
                const userData = {
                    email: data.user?.email || email,
                    name: data.user?.name || name.trim(),
                    id: data.user?.id || Date.now(),
                    role: normalizedRole
                };

                login(userData);
                navigate(normalizedRole === 'admin' ? "/admin" : "/", { replace: true });
            } else {
                // Handle error response
                setError(data.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup error:", error);

            // More specific error handling
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                // Offer fallback to local signup
                const useLocalSignup = window.confirm(
                    "Cannot connect to server. Would you like to sign up locally instead? (This will only work for this session)"
                );

                if (useLocalSignup) {
                    // Fallback to local signup
                    const userData = {
                        email,
                        name: name.trim(),
                        id: Date.now(),
                        role
                    };

                    login(userData);
                    navigate("/", { replace: true });
                    return;
                } else {
                    setError("Cannot connect to server. Please ensure your backend server is running on http://localhost:5000");
                }
            } else if (error.name === 'TypeError' && error.message.includes('ERR_INTERNET_DISCONNECTED')) {
                setError("No internet connection. Please check your network and try again.");
            } else {
                setError("Network error. Please check your connection and try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen w-screen p-4"
            style={{
                backgroundImage:
                    'url("https://www.baps.org/Data/Sites/1/Media/GalleryImages/33296/WebImages/2025_06_02_001_Kanad.jpg")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <Card className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white/80">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                    Create an Account
                </h2>

                {/* Error Display */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Google Signup */}
                <div className="flex justify-center mb-4">
                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                            try {
                                const decoded = jwtDecode(credentialResponse.credential);
                                console.log("Google user:", decoded);

                                // You might want to send Google user data to your API as well
                                // For now, we'll use the existing flow
                                const userData = {
                                    email: decoded.email,
                                    name: decoded.name,
                                    id: decoded.sub,
                                    picture: decoded.picture
                                };

                                login(userData);
                                navigate("/", { replace: true });
                            } catch (error) {
                                console.error("Google signup error:", error);
                                setError("Google signup failed. Please try again.");
                            }
                        }}
                        onError={() => {
                            console.log("Google signup failed");
                            setError("Google signup failed. Please try again.");
                        }}
                    />
                </div>

                {/* <Divider className="my-4">Or continue with</Divider> */}

                {/* Manual Email Signup */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="password">Password *</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Re-enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="role">Role *</Label>
                        <Select value={role} onValueChange={setRole} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                {/* <SelectItem value="moderator">Moderator</SelectItem> */}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </Button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-4">
                    <span>Already have an account? </span>
                    <Link to="/login" className="text-blue-600 font-semibold">
                        Login
                    </Link>
                </div>
            </Card>
        </div>
    );
}

export default SignupForm;
