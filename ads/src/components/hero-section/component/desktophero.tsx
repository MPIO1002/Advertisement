import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

interface BannerData {
    id: number;
    video: string;
    name: string;
    description: string;
    link: string;
}

interface DesktopHeroProps {
    bannerList: BannerData[];
    onBannerClick: (banner: BannerData) => void;
}

const DesktopHero: React.FC<DesktopHeroProps> = ({ bannerList, onBannerClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

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
        <div id="default-carousel" className="relative w-full" data-carousel="slide" {...handlers}>
            {/* Carousel Wrapper */}
            <div className="relative h-56 sm:h-96 xl:h-[calc(80vh)] overflow-hidden">
                {bannerList.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        data-carousel-item
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        >
                            <source src={banner.video} type="video/mp4" />
                        </video>
                        <div className="absolute z-30 flex -translate-x-1/2 bottom-10 sm:bottom-12 md:bottom-14 lg:bottom-15 left-1/2">
                            <button
                                type="button"
                                className="px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-2 text-sm sm:text-base lg:text-xl text-white bg-[#333333e6] rounded-sm hover:bg-[#222222e6] focus:outline-none cursor-pointer"
                                onClick={() => onBannerClick(banner)}
                            >
                                KHÁM PHÁ NGAY
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Slider Indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                {bannerList.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'
                            }`}
                        aria-current={index === currentIndex}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => handleDotClick(index)}
                    ></button>
                ))}
            </div>

            {/* Slider Controls */}
            <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={handlePrev}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
                    <svg
                        className="w-4 h-4 text-white"
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
            <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={handleNext}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
                    <svg
                        className="w-4 h-4 text-white"
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

            {/* Curve Background */}
            <div
                className="absolute bottom-0 left-0 w-full h-2 sm:h-6 md:h-8 bg-no-repeat bg-cover z-10"
                style={{ backgroundImage: "url('/assets/curve-bg.png')" }}
            ></div>
        </div>
    );
};

export default DesktopHero;