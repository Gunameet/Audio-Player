import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, STATIC_USER } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === STATIC_USER.email && password === STATIC_USER.password) {
      login(STATIC_USER);
      navigate("/", { replace: true });
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      login(storedUser);
      navigate("/", { replace: true });
      return;
    }

    alert("Invalid email or password");
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
          <div className="flex justify-center w-full">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);
                login(decoded);
                navigate("/", { replace: true });
              }}
              onError={() => console.log("Google login failed")}
            />
          </div>

          <Separator className="my-2 w-full" />

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full mt-2">
              Login
            </Button>
          </form>

          <p className="text-xs text-gray-500 mt-2">
            Demo user → <b>{STATIC_USER.email}</b> / <b>{STATIC_USER.password}</b>
          </p>
        </CardContent>

        {/* <CardFooter className="flex justify-center">
          <p className="text-sm sm:text-base text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </CardFooter> */}
      </Card>
    </div>
  );
}

export default LoginForm;
