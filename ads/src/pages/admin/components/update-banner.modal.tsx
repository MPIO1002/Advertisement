import React, { useState } from "react";
import Notification from "./notification";

interface UpdateBannerModalProps {
    open: boolean;
    onClose: () => void;
    onUpdated: () => void;
    banner: any; // Nên thay bằng interface Banner nếu có
}

const UpdateBannerModal: React.FC<UpdateBannerModalProps> = ({
    open,
    onClose,
    onUpdated,
    banner,
}) => {
    const [form, setForm] = useState({
        name: banner?.name || "",
        description: banner?.description || "",
        link: banner?.link || "",
        image: undefined as File | undefined,
        logo: undefined as File | undefined,
        video: undefined as File | undefined,
        horizon_img: undefined as File | undefined,
    });
    const [loading, setLoading] = useState(false);
    const [showNoti, setShowNoti] = useState(false);
    const [notiType, setNotiType] = useState<"success" | "danger">("success");

    React.useEffect(() => {
        if (banner) {
            setForm({
                name: banner.name || "",
                description: banner.description || "",
                link: banner.link || "",
                image: undefined,
                logo: undefined,
                video: undefined,
                horizon_img: undefined,
            });
        }
    }, [banner]);

    if (!open) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as any;
        if (files) {
            setForm((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("link", form.link);

        // Nếu có file mới thì gửi file, không thì gửi lại url cũ
        if (form.image) {
            formData.append("image", form.image);
        } else if (banner?.image) {
            formData.append("image", banner.image);
        }
        if (form.logo) {
            formData.append("logo", form.logo);
        } else if (banner?.logo) {
            formData.append("logo", banner.logo);
        }
        if (form.video) {
            formData.append("video", form.video);
        } else if (banner?.video) {
            formData.append("video", banner.video);
        }
        if (form.horizon_img) {
            formData.append("horizon_img", form.horizon_img);
        } else if (banner?.horizon_img) {
            formData.append("horizon_img", banner.horizon_img);
        }

        try {
            const res = await fetch(`http://103.92.25.7:4000/banners/${banner.id}`, {
                method: "PUT",
                body: formData,
            });
            if (!res.ok) throw new Error();
            setNotiType("success");
            setShowNoti(true);
            onUpdated();
            setTimeout(() => {
                setShowNoti(false);
                onClose();
            }, 2000);
        } catch {
            setNotiType("danger");
            setShowNoti(true);
            setTimeout(() => setShowNoti(false), 2000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed font-family inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
            <form
                className="relative bg-white rounded-lg shadow-lg p-6 w-3/4"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <h2 className="text-lg font-semibold mb-4">Cập nhật Banner</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="mb-3">
                            <label className="block mb-1 font-medium">Tên banner</label>
                            <input
                                name="name"
                                required
                                className="w-full border border-gray-200 rounded px-3 py-2"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-1 font-medium">Mô tả</label>
                            <textarea
                                name="description"
                                required
                                className="w-full border border-gray-200 rounded px-3 py-2"
                                value={form.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-1 font-medium">Link</label>
                            <input
                                name="link"
                                required
                                className="w-full border border-gray-200 rounded px-3 py-2"
                                value={form.link}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-1 font-medium">Video</label>
                            {banner?.video && (
                                <video
                                    src={banner.video}
                                    controls
                                    className="w-65 h-40 object-cover rounded mb-2 mx-auto"
                                />
                            )}
                            <input
                                type="file"
                                name="video"
                                accept="video/*"
                                className="w-full border border-gray-200 p-2"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mb-3">
                            <label className="block mb-1 font-medium">Ảnh dọc</label>
                            {banner?.image && (
                                <img
                                    src={banner.image}
                                    alt="Ảnh dọc"
                                    className="w-24 h-48 object-cover rounded mb-2 mx-auto"
                                />
                            )}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className="w-full border border-gray-200 p-2"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-1 font-medium">Logo</label>
                            {banner?.logo && (
                                <img
                                    src={banner.logo}
                                    alt="Logo"
                                    className="w-16 h-16 object-cover rounded mb-2 mx-auto"
                                />
                            )}
                            <input
                                type="file"
                                name="logo"
                                accept="image/*"
                                className="w-full border border-gray-200 p-2"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-1 font-medium">Ảnh ngang</label>
                            {banner?.horizon_img && (
                                <img
                                    src={banner.horizon_img}
                                    alt="Ảnh ngang"
                                    className="w-32 h-20 object-cover rounded mb-2 mx-auto"
                                />
                            )}
                            <input
                                type="file"
                                name="horizon_img"
                                accept="image/*"
                                className="w-full border border-gray-200 p-2"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 rounded bg-[#333333] text-white hover:bg-[#222222]"
                        disabled={loading}
                    >
                        {loading ? "Đang lưu..." : "Cập nhật"}
                    </button>
                </div>
                {showNoti && (
                    <Notification
                        open={showNoti}
                        type={notiType}
                        message={notiType === "success" ? "Cập nhật thành công!" : "Cập nhật thất bại!"}
                        onClose={() => setShowNoti(false)}
                    />
                )}
            </form>
        </div>
    );
};

export default UpdateBannerModal;