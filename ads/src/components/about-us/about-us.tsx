import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faGamepad, faBuilding, faRuler } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
    return (
        <div className="relative bg-[#ededed] text-[#222222] py-16 px-10">
            {/* Curve Image */}
            <img
                src="/assets/curve-bg.png" // Replace with the actual path to your curve image
                alt="Curve Background"
                className="absolute top-0 left-0 w-full h-4 sm:h-6 md:h-8 bg-no-repeat bg-cover transform scale-y-[-1] z-10"
            />
            <div className="max-w-4xl mx-auto text-center">
                {/* Title */}
                <h2 className="text-3xl sm:text-2xl md:text-3xl font-bold mb-6">
                    VỀ CHÚNG TÔI
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-lg font-medium leading-relaxed mb-12">
                    Công Ty GGO được thành lập từ tháng 8/2018, là đơn vị trong lĩnh vực công nghệ chuyên cung cấp các sản phẩm trò chơi trực tuyến đa nền tảng.
                    Mang sứ mệnh trở thành một trong những đội ngũ tiên phong trong dịch vụ cung cấp trò chơi trực tuyến và công nghệ số,
                    GGO không ngừng đổi mới để nâng cao chất lượng dịch vụ & đón đầu xu thế trong thời đại 4.0.
                </p>

                {/* Feature Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 mb-12">
                    <div className="group flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:bg-[#333333] hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <FontAwesomeIcon icon={faRuler} className="text-4xl text-[#333333] group-hover:text-white" />
                        <p className="mt-4 text-sm font-medium text-[#333333] group-hover:text-white">Game Planning</p>
                    </div>
                    <div className="group flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:bg-[#333333] hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <FontAwesomeIcon icon={faBuilding} className="text-4xl text-[#333333] group-hover:text-white" />
                        <p className="mt-4 text-sm font-medium text-[#333333] group-hover:text-white">Game Release</p>
                    </div>
                    <div className="group flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:bg-[#333333] hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <FontAwesomeIcon icon={faGamepad} className="text-4xl text-[#333333] group-hover:text-white" />
                        <p className="mt-4 text-sm font-medium text-[#333333] group-hover:text-white">Game Technology</p>
                    </div>
                    <div className="group flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:bg-[#333333] hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <FontAwesomeIcon icon={faPalette} className="text-4xl text-[#333333] group-hover:text-white" />
                        <p className="mt-4 text-sm font-medium text-[#333333] group-hover:text-white">Art & UX</p>
                    </div>
                </div>

                {/* Statistics */}
                <div className="text-center">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
                        Số người dùng ở Việt Nam & Đông Nam Á
                    </h3>
                    <div className="flex justify-center gap-3">
                        <p className="text-5xl sm:text-6xl md:text-7xl font-bold">
                            1.500.000
                        </p>
                        <div className=" font-extrabold text-3xl sm:text-4xl md:text-5xl animate-bounce">+</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;