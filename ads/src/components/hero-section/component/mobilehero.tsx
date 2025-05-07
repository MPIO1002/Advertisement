import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

interface BannerData {
  id: number;
  video: string;
  name: string;
  description: string;
  link: string;
  horizon_img: string;
}

interface MobileHeroProps {
  bannerList: BannerData[];
}

const MobileHero: React.FC<MobileHeroProps> = ({ bannerList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handlePlay = (video: string) => {
    setSelectedVideo(video); // Set the selected video to display in the modal
  };

  const closeModal = () => {
    setSelectedVideo(null); // Close the modal
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerList.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Swipeable handlers
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
  });

  return (
    <div className="relative w-full" {...handlers}>
      {/* Modal for Video */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black opacity-75"></div>
          <div
            className="relative w-full max-w-4xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedVideo && ( // Kiểm tra trạng thái trước khi hiển thị video
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full h-auto"
              />
            )}
          </div>
        </div>
      )}

      {/* Mobile Hero Content */}
      <div className="relative h-56 sm:h-96 overflow-hidden">
        {bannerList.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={banner.horizon_img}
              alt={banner.name}
              className="w-full h-auto"
            />
            <button
              className="absolute inset-0 flex items-center justify-center text-white rounded-full"
              onClick={() => handlePlay(banner.video)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 border border-white rounded-full p-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.25v13.5L19.5 12 5.25 5.25z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Slider Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-3 left-1/2 space-x-2">
        {bannerList.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'
              }`}
            aria-current={index === currentIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>

      {/* Curve Background */}
      <div
        className="absolute bottom-0 left-0 w-full h-2 sm:h-4 bg-no-repeat bg-cover z-10"
        style={{ backgroundImage: "url('/assets/curve-bg.png')" }}
      ></div>
    </div>
  );
};

export default MobileHero;