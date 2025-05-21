import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../admin/components/notification"

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    open: false,
    type: "success" as "success" | "danger" | "warning",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification({ ...notification, open: false, message: "" });
    try {
      const res = await fetch("http://103.92.25.7:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        setNotification({
          open: true,
          type: "success",
          message: "Đăng nhập thành công, chuyển hướng đến trang quản trị...",
        });
        setTimeout(() => {
          setNotification({ ...notification, open: false });
          navigate("/admin");
        }, 1200);
      } else {
        setNotification({
          open: true,
          type: "danger",
          message: data.error || "Đăng nhập thất bại",
        });
      }
    } catch {
      setNotification({
        open: true,
        type: "danger",
        message: "Lỗi kết nối mạng",
      });
    }
  };

  return (
    <>
      {/* Admin-style Navbar */}
      <nav className="bg-[#222222e7] text-white w-full">
        <div className="flex items-center p-4">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-16 h-auto mr-2 object-contain"
          />
        </div>
      </nav>
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#333333] text-white rounded hover:bg-[#222222] transition"
          >
            Login
          </button>
        </form>
      </div>
      <Notification
        open={notification.open}
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </>
  );
};

export default LoginPage;