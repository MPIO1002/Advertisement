import { useState, useEffect } from 'react';
import MobileHero from './component/mobilehero';
import DesktopHero from './component/desktophero';

interface BannerData {
  id: number;
  video: string;
  name: string;
  description: string;
  link: string;
  horizon_img?: string;
}

const HeroSection = () => {
  const [bannerList, setBannerList] = useState<BannerData[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    const fetchBannerData = async () => {
      try {
        const response = await fetch('http://103.92.25.7:4000/banners');
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

  if (bannerList.length === 0) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const handleBannerClick = (banner: BannerData) => {
    if (window.gtag) {
      window.gtag('event', 'banner_click', {
        event_category: 'Banner',
        event_label: banner.name,
        value: banner.id,
      });
    }
    window.open(banner.link, '_blank'); // Mở liên kết banner
  };

  return isMobile ? (
    <MobileHero bannerList={bannerList} />
  ) : (
    <DesktopHero bannerList={bannerList} onBannerClick={handleBannerClick} />
  );
}

export default HeroSection;