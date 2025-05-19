import React from "react";
import Navbar from "../../components/navbar/navbar";
import HeroSection from "../../components/hero-section/hero-section";
import BannerSection from "../../components/banner-section/banner-section";
import Footer from "../../components/footer/footer";

const HomePage: React.FC = () => (
  <div className="font-family">
    <Navbar />
    <HeroSection />
    <BannerSection />
    <Footer />
  </div>
);

export default HomePage;