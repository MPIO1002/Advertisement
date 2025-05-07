import React, { useState } from 'react';

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
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const handlePlay = (video: string) => {
        setSelectedVideo(video);
    };

    const closeModal = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="relative w-full">
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

            {/* Mobile Hero Content */}
            {bannerList.map((banner) => (
                <div key={banner.id} className="relative">
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
                            className="w-12 h-12 border border-white rounded-full p-4"
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
            {/* Curve Background */}
            <div
                className="absolute bottom-0 left-0 w-full h-2 sm:h-6 md:h-8 bg-no-repeat bg-cover z-10"
                style={{ backgroundImage: "url('/assets/curve-bg.png')" }}
            ></div>
        </div>
    );
};

export default MobileHero;