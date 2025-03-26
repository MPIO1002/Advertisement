import { useEffect, useState } from 'react';

interface BannerData {
  id: number;
  url: string;
  title: string;
  content: string;
  link: string;
}

const Banner = () => {
  const [bannerList, setBannerList] = useState<BannerData[]>([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchBannerData = async () => {
      try {
        const response = await fetch('http://localhost:3000/banners');
        const data: BannerData[] = await response.json();
        setBannerList(data);
      } catch (error) {
        console.error('Failed to fetch banner data:', error);
      }
    };

    fetchBannerData();
  }, []);
  
  const handleBannerClick = (banner: BannerData) => {
    // Send click event to Google Analytics
    if (window.gtag) {
      window.gtag('event', 'banner_click', {
        event_category: 'Banner',
        event_label: banner.title,
        value: banner.id,
      });
    }
  };

  if (bannerList.length === 0) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bannerList.map((banner) => (
        <a
          key={banner.id}
          href={banner.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleBannerClick(banner)}
          className="relative w-full h-auto mx-auto rounded-lg overflow-hidden shadow-lg"
          style={{
            backgroundImage: `url(${banner.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 transition duration-300 ease-in-out"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          ></div>

          {/* Content */}
          <div className="relative z-10 p-6 text-center text-white">
            <h2 className="text-xl font-bold mb-2">{banner.title}</h2>
            <p className="text-sm mb-4">{banner.content}</p>
            <button className="px-4 py-2 bg-white text-gray-800 font-semibold rounded-md hover:bg-gray-200">
              XEM NGAY
            </button>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Banner;