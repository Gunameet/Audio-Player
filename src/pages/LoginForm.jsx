import { useState } from "react";
import { Card, Input, Button, Form } from "antd";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onLogin(username, password);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen w-screen overflow-hidden"
      style={{
        backgroundImage: 'url("https://www.baps.org/Data/Sites/1/Media/GalleryImages/33296/WebImages/2025_06_02_001_Kanad.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Card
        className="w-96 p-6 rounded-2xl shadow-xl"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">BAPS Swaminarayan sanstha Login</h2>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Username">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Password">
            <Input.Password
              placeholder="Password"
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
      </Card>
    </div>
  );
}
