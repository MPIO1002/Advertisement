import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../admin/components/notification";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md p-8 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold mb-6 text-center">Đăng nhập</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative">
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? (
                  // Eye open icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5-4.03 9-9 9S3 17 3 12 7.03 3 12 3s9 4.03 9 9z" />
                  </svg>
                ) : (
                  // Eye closed icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.657 1.343-3 3-3 .512 0 1.02.08 1.5.23m3.5-2.23c.98-.13 1.98-.2 3-.2 5 0 9 4 9 7 0 1.657-1.343 3-3 3-.512 0-1.02-.08-1.5-.23m-3.5 2.23l-6.364-6.364M3 3l18 18" />
                  </svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#333333] text-white rounded hover:bg-[#222222] transition"
            >
              Đăng nhập
            </button>
          </form>
        </div>
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