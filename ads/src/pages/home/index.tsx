import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import HeroSection from "../../components/hero-section/hero-section";
import BannerSection from "../../components/banner-section/banner-section";
import Footer from "../../components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const HomePage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="font-family relative min-h-screen">
      <Navbar />
      <HeroSection />
      <BannerSection />
      <Footer />

      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#333333] text-white flex items-center justify-center shadow-lg z-50 hover:bg-[#222222] hover:scale-125 transition duration-300"
        onClick={() => setShowPopup(true)}
        aria-label="Thông tin"
      >
        <FontAwesomeIcon icon={faCircleInfo} size="xl" />
      </button>

      {/* Overlay & Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setShowPopup(false)}
          />
          {/* Popup */}
          <div
            className="relative bg-white rounded-lg p-8 max-w-sm w-full z-10"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Thông tin</h2>
            <p>Đây là nội dung popup. Bạn có thể đặt thông tin hướng dẫn hoặc liên hệ ở đây.</p>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setShowPopup(false)}
              aria-label="Đóng"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;