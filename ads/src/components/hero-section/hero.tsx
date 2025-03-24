import HeroVideo from '../../assets/hero.mp4';

const Hero = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Video */}
            <video
                src={HeroVideo}
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
            ></video>

            {/* Overlay */}
            <div
                className="absolute inset-0"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            ></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">CÔNG TY CỔ PHẦN GGO</h1>
                <p className="text-lg md:text-xl leading-relaxed max-w-3xl">
                    Công Ty GGO được thành lập từ tháng 8/2018, là đơn vị trong lĩnh vực công nghệ chuyên cung cấp các sản phẩm trò chơi trực tuyến đa nền tảng.
                    Mang sứ mệnh trở thành một trong những đội ngũ tiên phong trong dịch vụ cung cấp trò chơi trực tuyến và công nghệ số, GGO không ngừng đổi mới
                    để nâng cao chất lượng dịch vụ & đón đầu xu thế trong thời đại 4.0.
                </p>
            </div>
        </div>
    );
};

export default Hero;