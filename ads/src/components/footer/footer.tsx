import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocationDot, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-[#222222] text-white py-10 px-8">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-40">
                {/* Logo Section */}
                <div className="flex flex-col items-center justify-center">
                    <img
                        src="/assets/logo.png"
                        alt="GGO Logo"
                        className="w-40 md:w-60 mb-4"
                    />
                    <p className="text-center font-bold text-sm">
                        CÔNG TY CỔ PHẦN GGO
                    </p>
                </div>

                {/* Information Section */}
                <div className="text-left">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <FontAwesomeIcon icon={faCircleInfo} className="text-red-500 mr-2" /> THÔNG TIN
                    </h3>
                    <p className="text-sm">
                        Chơi quá 180 phút 1 ngày ảnh hưởng xấu đến sức khỏe.
                    </p>
                    <p className="text-sm">
                        Giấy phép G1 số: 103/GP-BTTTT Ngày 17/01/2020.
                    </p>
                    <p className="text-sm">
                        Bộ Thông tin và Truyền thông cấp ngày 16/3/2020.
                    </p>
                    <p className="text-sm">
                        Điều Khoản Sử Dụng | Chính Sách Bảo Mật
                    </p>
                </div>

                {/* Contact Section */}
                <div className="text-left">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <FontAwesomeIcon icon={faPhone} className="text-red-500 mr-2" /> LIÊN HỆ
                    </h3>
                    <p className="text-sm">+84 282-239-6999</p>
                    <p className="text-sm">lienhe@ggo.vn</p>

                    <h3 className="text-lg font-semibold mt-6 mb-4 flex items-center">
                        <FontAwesomeIcon icon={faLocationDot} className="text-red-500 mr-2" /> TRỤ SỞ
                    </h3>
                    <p className="text-sm">
                        Địa chỉ: Tầng 19, Khu Văn Phòng, Tòa Nhà Indochina,
                        <br />
                        04 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, TPHCM
                    </p>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="text-center text-sm mt-16">
                Bản quyền nội dung thuộc về GGO JSC.
            </div>
        </footer>
    );
};

export default Footer;