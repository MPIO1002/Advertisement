import { useState, useEffect } from 'react';
import DesktopBanner from './banner/desktopbanner';
import MobileBanner from './banner/mobilebanner';

interface BannerData {
  id: number;
  image: string;
  name: string;
  description: string;
  logo: string;
  video: string;
  link: string;
}

const BannerSection = () => {
  const [bannerList, setBannerList] = useState<BannerData[]>([]);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile breakpoint
    };

    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBannerClick = (banner: BannerData) => {
    if (window.gtag) {
      window.gtag('event', 'banner_click', {
        event_category: 'Banner',
        event_label: banner.name,
        value: banner.id,
      });
    }
  };

  if (bannerList.length === 0) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <section className="bg-[#f7f9fa] py-8">
      {/* Title */}
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800">TOP GAMES</h1>
      </div>

      {/* Banner */}
      <div className="container mx-auto px-5 md:px-22">
        {isMobile ? (
          <MobileBanner bannerList={bannerList} onBannerClick={handleBannerClick} />
        ) : (
          <DesktopBanner bannerList={bannerList} onBannerClick={handleBannerClick} />
        )}
      </div>
    </section>
  );
};

export default BannerSection;