import React from 'react';
import Banner from './banner/banner';

const BannerSection = () => {
  return (
    <section className="bg-gray-100 py-8">
      {/* Title */}
      <div className="container mx-auto text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">DANH SÁCH SẢN PHẨM</h1>
      </div>

      {/* Banner */}
      <div className="container mx-auto px-5 md:px-40">
        <Banner />
      </div>
    </section>
  );
};

export default BannerSection;