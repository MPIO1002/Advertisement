import { useState } from 'react';

interface BannerData {
    id: number;
    image: string;
    name: string;
    description: string;
    link_ios: string;
    link_android: string;
    video: string;
    logo: string;
    horizon_img: string;
}

interface MobileBannerProps {
    bannerList: BannerData[];
    onBannerClick: (banner: BannerData) => void;
}

const MobileBanner = ({ bannerList, onBannerClick }: MobileBannerProps) => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // State to track the selected video

    const handlePlay = (video: string) => {
        setSelectedVideo(video); // Set the selected video to display in the modal
    };

    const closeModal = () => {
        setSelectedVideo(null); // Close the modal
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="grid grid-cols-1 gap-4 p-4 bg-white">
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
                            <video
                                src={selectedVideo}
                                controls
                                autoPlay
                                playsInline
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                )}

                {bannerList.map((banner) => (
                    <div
                        key={banner.id}
                        className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="relative">
                                <img
                                    src={banner.horizon_img} // Use horizon_img instead of video
                                    alt={banner.name}
                                    loading="lazy"
                                    className="rounded-t w-full h-auto"
                                />
                                <button
                                    className="absolute z-50 inset-0 flex items-center justify-center text-white rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent navigation
                                        handlePlay(banner.video); // Open the modal with the video
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-12 h-12"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5.25 5.25v13.5L19.5 12 5.25 5.25z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </a>
                        <div className="p-5">
                            <div className="flex items-center justify-between">
                                {/* Logo on the left */}
                                <img
                                    src={banner.logo}
                                    alt={`${banner.name} logo`}
                                    loading="lazy"
                                    className="w-8 h-8 mr-2"
                                />
                                {/* Name */}
                                <div className="flex-1">
                                    <a
                                        href="#"
                                        onClick={e => {
                                            e.preventDefault();
                                            onBannerClick(banner);
                                        }}
                                    >
                                        <h5 className="text-sm font-bold tracking-tight text-gray-900 text-left">
                                            {banner.name}
                                        </h5>
                                    </a>
                                </div>
                                {/* Read More Button on the Right */}
                                <a
                                    href="#"
                                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-center text-white bg-[#333333] rounded-lg hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300"
                                    onClick={e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onBannerClick(banner);
                                    }}
                                >
                                    Tải game
                                </a>
                            </div>
                            {/* Description */}
                            <p className="mt-2 text-xs font-normal text-gray-700">
                                {banner.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MobileBanner;