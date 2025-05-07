import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

interface Banner {
    id: number;
    video: string;
    name: string;
    description: string;
    link: string;
    horizon_img: string;
}

const HeroCarousel = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // State for modal video
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

    const handlePlay = (video: string) => {
        setSelectedVideo(video); // Open modal with the selected video
    };

    const closeModal = () => {
        setSelectedVideo(null); // Close the modal
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
        onSwipedLeft: () => setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length),
        onSwipedRight: () => setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length),
        preventScrollOnSwipe: true,
        trackMouse: true, // Allows swipe gestures with a mouse (optional)
    });

    return (
        <div {...handlers} id="default-carousel" className="relative w-full" data-carousel="slide">
            {/* Modal for Video */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    onClick={closeModal} // Close modal when clicking outside
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-75"></div>

                    {/* Modal Content */}
                    <div
                        className="relative w-full max-w-4xl z-10"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        <button
                            className="absolute top-2 right-2 text-white text-2xl"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <video
                            src={selectedVideo}
                            controls
                            autoPlay
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            )}

            {/* Carousel Wrapper */}
            <div className="relative h-56 sm:h-96 xl:h-[calc(80vh)] overflow-hidden">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        data-carousel-item
                    >
                        {isMobile ? (
                            <>
                                {/* Mobile View: Show horizon_img */}
                                <img
                                    src={banner.horizon_img}
                                    alt={banner.name}
                                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                />
                                {/* Play Button */}
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
                                        className="w-12 h-12 border border-white rounded-full p-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5.25 5.25v13.5L19.5 12 5.25 5.25z"
                                        />
                                    </svg>
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Desktop View: Show video */}
                                <video
                                    ref={(el) => {
                                        videoRefs.current[index] = el!;
                                    }}
                                    autoPlay={index === currentIndex}
                                    loop={true}
                                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                    onEnded={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)}
                                >
                                    <source src={banner.video} type="video/mp4" />
                                </video>
                            </>
                        )}

                        {/* Button for Each Banner */}
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
            </div>
        </div>
    );
};

export default HeroCarousel;