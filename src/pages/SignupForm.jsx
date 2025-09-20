import { useState } from "react";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { Link, useNavigate } from "react-router-dom";

function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
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

                {/* Google Signup */}
                <div className="flex justify-center mb-4">
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
                </div>

                {/* <Divider className="my-4">Or continue with</Divider> */}

                {/* Manual Email Signup */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Re-enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="w-full mt-2">
                        Sign Up
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
