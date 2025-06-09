import { useState, useEffect } from 'react';
import DesktopBanner from './banner/desktopbanner';
import MobileBanner from './banner/mobilebanner';
import { getMobileOS } from "../../identify_devices"

interface BannerData {
  id: number;
  image: string;
  name: string;
  description: string;
  logo: string;
  video: string;
  link_ios: string;
  link_android: string;
  horizon_img: string;
}

const BannerSection = () => {
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

  const handleBannerClick = (banner: BannerData) => {
    if (window.gtag) {
      window.gtag('event', 'banner_click', {
        event_category: 'Banner',
        event_label: banner.name,
        value: banner.id,
      });
    }
    // Chọn link phù hợp với thiết bị
    const os = getMobileOS();
    let link = banner.link_ios || banner.link_android; // Mặc định nếu không xác định được
    if (os === "android" && banner.link_android) link = banner.link_android;
    else if (os === "ios" && banner.link_ios) link = banner.link_ios;
    window.open(link, '_blank');
  };

  if (bannerList.length === 0) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <section className="bg-[#f7f9fa] py-8">
      {/* Title */}
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">TOP GAMES</h1>
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