import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

interface Banner {
    id: number;
    video: string;
    name: string;
    description: string;
    link: string;
}

const HeroCarousel = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const videoRefs = useRef<HTMLVideoElement[]>([]);

    useEffect(() => {
        // Detect if the screen is mobile
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Check on initial render
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // Fetch banners from API
        fetch('http://103.92.25.7:4000/banners')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setBanners(data);
            })
            .catch((error) => {
                console.error('Error fetching banners:', error);
            });
    }, []);

    useEffect(() => {
        if (!isMobile) {
            // Pause all videos and play the current one on desktop
            videoRefs.current.forEach((video, index) => {
                if (video) {
                    if (index === currentIndex) {
                        video.play().catch((error) => {
                            console.error('Error playing video:', error);
                        });
                    } else {
                        video.pause();
                        video.currentTime = 0; // Reset video to the beginning
                    }
                }
            });
        }
    }, [currentIndex, isMobile]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
        setIsPlaying(false); // Reset play state
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        setIsPlaying(false); // Reset play state
    };

    const handlePlay = () => {
        setIsPlaying(true);
        const currentVideo = videoRefs.current[currentIndex];
        if (currentVideo) {
            currentVideo.play().catch((error) => {
                console.error('Error playing video:', error);
            });
        }
    };

    const handleBannerClick = (banner: Banner) => {
        if (window.gtag) {
            window.gtag('event', 'banner_click', {
                event_category: 'Hero Banner',
                event_label: banner.name,
                value: banner.id,
            });
        }
        window.location.href = banner.link; // Navigate to the banner's link
    };

    // Swipeable handlers
    const handlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
        preventScrollOnSwipe: true,
        trackMouse: true, // Allows swipe gestures with a mouse (optional)
    });

    return (
        <div {...handlers} id="default-carousel" className="relative w-full" data-carousel="slide">
            {/* Carousel Wrapper */}
            <div className="relative h-56 sm:h-96 xl:h-[calc(80vh)] overflow-hidden">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        data-carousel-item
                    >
                        <video
                            ref={(el) => {
                                videoRefs.current[index] = el!;
                            }}
                            loop={false}
                            muted={true}
                            playsInline
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            onEnded={handleNext}
                            controls={isMobile && isPlaying} // Show controls only on mobile when playing
                        >
                            <source src={banner.video} type="video/mp4" />
                        </video>

                        {/* Play Button for Mobile */}
                        {isMobile && !isPlaying && index === currentIndex && (
                            <button
                                className="absolute inset-0 flex items-center justify-center text-white rounded-full"
                                onClick={handlePlay}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-12 h-12 border border-white rounded-full p-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5.25 5.25v13.5L19.5 12 5.25 5.25z"
                                    />
                                </svg>
                            </button>
                        )}

                        {/* Button for Each Video */}
                        {index === currentIndex && (
                            <div className="absolute z-30 flex -translate-x-1/2 bottom-10 sm:bottom-12 md:bottom-14 lg:bottom-15 left-1/2">
                                <button
                                    type="button"
                                    className="px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-2 text-sm sm:text-base lg:text-xl text-white bg-[#333333e6] rounded-sm hover:bg-[#222222e6] focus:outline-none cursor-pointer"
                                    onClick={() => handleBannerClick(banner)}
                                >
                                    KHÁM PHÁ NGAY
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {/* Curve Background */}
                <div
                    className="absolute bottom-0 left-0 w-full h-2 sm:h-6 md:h-8 bg-no-repeat bg-cover z-10"
                    style={{ backgroundImage: "url('/assets/curve-bg.png')" }}
                ></div>
            </div>

            {/* Slider Indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-2 sm:space-x-3 md:space-x-4 rtl:space-x-reverse">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'
                            }`}
                        aria-current={index === currentIndex}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setCurrentIndex(index)}
                        data-carousel-slide-to={index}
                    ></button>
                ))}
            </div>

            {/* Slider Controls */}
            <button
                type="button"
                className="absolute top-0 start-0 z-30 hidden md:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={handlePrev}
                data-carousel-prev
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
            <button
                type="button"
                className="absolute top-0 end-0 z-30 hidden md:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={handleNext}
                data-carousel-next
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
        </div>
    );
};

export default HeroCarousel;