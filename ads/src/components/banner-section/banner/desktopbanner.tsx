import { useRef } from "react";

interface BannerData {
  id: number;
  image: string;
  name: string;
  description: string;
  logo: string;
  video: string;
  link: string;
  horizon_img: string;
}

interface DesktopBannerProps {
  bannerList: BannerData[];
  onBannerClick: (banner: BannerData) => void;
}

const DesktopBanner = ({ bannerList, onBannerClick }: DesktopBannerProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -208 * 6, behavior: "smooth" }); // Scroll by the width of 6 banners
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 208 * 6, behavior: "smooth" }); // Scroll by the width of 6 banners
    }
  };

  const isScrollable = bannerList.length >= 6; // Check if the number of banners is 6 or more

  return (
    <div className="relative">
      {/* Left Button */}
      {isScrollable && (
        <button
          type="button"
          className="absolute top-0 left-[-80px] z-30 hidden md:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={scrollLeft}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
      )}

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className={`flex items-center h-[500px] overflow-x-auto space-x-4.5 scrollbar-hide ${!isScrollable ? "justify-center" : ""
          }`}
        style={{
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For Internet Explorer and Edge
        }}
      >
        {bannerList.map((banner) => (
          <div
            key={banner.id}
            className="flex-shrink-0 w-[208px] h-[416px] relative rounded-lg shadow-md group transition-transform duration-300 ease-in-out hover:-translate-y-4 cursor-pointer"
            onClick={() => onBannerClick(banner)}
          >
            <img
              src={banner.image}
              alt={banner.name}
              loading="lazy"
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Logo at the Bottom */}
            <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 z-10">
              <img
                src={banner.logo}
                alt={`${banner.name} logo`}
                loading="lazy"
                className="w-20 h-20"
              />
            </div>

            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-black/30 opacity-0 rounded-lg group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4 pointer-event-none">
              <h3 className="text-lg font-medium text-white">{banner.name}</h3>
              <p className="mt-2 text-sm text-gray-300">{banner.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Button */}
      {isScrollable && (
        <button
          type="button"
          className="absolute top-0 right-[-80px] z-30 hidden md:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={scrollRight}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      )}
    </div>
  );
};

export default DesktopBanner;