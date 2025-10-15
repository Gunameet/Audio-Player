import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Attempting to login via API...");
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("Login response status:", response.status);
      const data = await response.json();
      console.log("Login response data:", data);

      if (response.ok) {
        const role = data.user?.role?.toLowerCase() || "user";

        const userData = {
          ...data.user,
          token: data.token,
        };

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        login(userData);

        navigate(role === "admin" ? "/admin" : "/", { replace: true });
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
        setError("Cannot connect to server. Please ensure your backend is running.");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen p-4 sm:p-6"
      style={{
        backgroundImage:
          'url("https://www.baps.org/Data/Sites/1/Media/GalleryImages/33296/WebImages/2025_06_02_001_Kanad.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-full max-w-md rounded-2xl shadow-xl bg-white/90">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center">Login</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 items-center">
          {error && (
            <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-center w-full">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log("Google user:", decoded);

                  const userData = {
                    email: decoded.email,
                    name: decoded.name,
                    id: decoded.sub,
                    picture: decoded.picture,
                    role: 'user'
                  };

                  login(userData);
                  navigate("/", { replace: true });
                } catch (error) {
                  console.error("Google login error:", error);
                  setError("Google login failed. Please try again.");
                }
              }}
              onError={() => {
                console.log("Google login failed");
                setError("Google login failed. Please try again.");
              }}
            />
          </div>

          <Separator className="my-2 w-full" />

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {/* <div className="flex flex-col space-y-1">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm sm:text-base text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginForm;
