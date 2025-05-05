import { useState, useEffect, useRef } from 'react';

interface BannerData {
    id: number;
    image: string;
    name: string;
    description: string;
    link: string;
    video: string;
    logo: string; // Added logo field
}

interface MobileBannerProps {
    bannerList: BannerData[];
    onBannerClick: (banner: BannerData) => void;
}

const MobileBanner = ({ bannerList, onBannerClick }: MobileBannerProps) => {
    const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
    const videoRefs = useRef<HTMLVideoElement[]>([]); // Store refs for all videos

    useEffect(() => {
        // Ensure all videos start at the first second
        videoRefs.current.forEach((video) => {
            if (video) {
                video.currentTime = 1; // Set video to start at 1 seconds
            }
        });
    }, [bannerList]);

    const handlePlay = (id: number) => {
        setPlayingVideoId(id);
    };

    return (
        <div className="grid grid-cols-1 gap-4 p-4 bg-white">
            {bannerList.map((banner, index) => (
                <div
                    key={banner.id}
                    className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                    <a
                        href={banner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            if (playingVideoId !== null) {
                                e.preventDefault(); // Prevent navigation if video is playing
                            }
                            onBannerClick(banner);
                        }}
                    >
                        <div className="relative">
                            <video
                                ref={(el) => {
                                    if (el) videoRefs.current[index] = el;
                                }}
                                className="rounded-t"
                                src={banner.video}
                                controls={playingVideoId === banner.id} // Show controls only for the playing video
                            />
                            {playingVideoId !== banner.id && (
                                <button
                                    className="absolute inset-0 flex items-center justify-center text-white"
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent navigation
                                        handlePlay(banner.id);
                                    }}
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
                        </div>
                    </a>
                    <div className="p-5">
                        <div className="flex items-center justify-between">
                            {/* Logo on the left */}
                            <img
                                src={banner.logo}
                                alt={`${banner.name} logo`}
                                className="w-8 h-8 mr-2"
                            />
                            {/* Name */}
                            <div className="flex-1">
                                <a href={banner.link} target="_blank" rel="noopener noreferrer">
                                    <h5 className="text-sm font-bold tracking-tight text-gray-900 text-left">
                                        {banner.name}
                                    </h5>
                                </a>
                            </div>
                            {/* Read More Button on the Right */}
                            <a
                                href={banner.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-2 py-1 text-xs font-medium text-center text-white bg-[#333333] rounded-lg hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300"
                                onClick={(e) => {
                                    e.stopPropagation(); // Ensure only this button triggers navigation
                                }}
                            >
                                XEM
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
    );
};

export default MobileBanner;