import React from 'react';
import Logo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-[#222222] text-white fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-16 h-auto mr-2 cursor-pointer" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="#home" className="hover:text-gray-400">
              Trang chủ
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-gray-400">
              Về chúng tôi
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-400">
              Liên hệ
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              if (menu) menu.classList.toggle('hidden');
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="hidden absolute top-full left-0 w-full bg-[#333333] z-40"
      >
        <ul className="flex flex-col space-y-2 p-4">
          <li>
            <a href="#home" className="hover:text-gray-400">
              Trang chủ
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-gray-400">
              Về chúng tôi
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-400">
              Liên hệ
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;