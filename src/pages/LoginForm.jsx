import { useState } from "react";
import { Card, Input, Button, Form, Divider } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("auth", "true");
      onLogin(email, password);
      navigate("/", { replace: true });
    } else {
      alert("Invalid email or password");
    }
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
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Google Login */}
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("Google login:", decoded);

            localStorage.setItem("user", JSON.stringify(decoded));
            localStorage.setItem("auth", "true");
            navigate("/", { replace: true });
          }}
          onError={() => console.log("Google login failed")}
        />

        <Divider>Or login with</Divider>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email">
            <Input
              placeholder="Enter email"
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

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        {/* Signup link */}
        <div className="text-center mt-4">
          <span>Don’t have an account? </span>
          <Link to="/signup" className="text-blue-600 font-semibold">
            Create one
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default LoginForm;
