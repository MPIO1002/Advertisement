import React, { useState } from "react";
import Notification from "./notification";

interface AddBannerModalProps {
    open: boolean;
    onClose: () => void;
    onAdded: () => void;
}

const AddBannerModal: React.FC<AddBannerModalProps> = ({ open, onClose, onAdded }) => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        link: "",
        image: undefined as File | undefined,
        logo: undefined as File | undefined,
        video: undefined as File | undefined,
        horizon_img: undefined as File | undefined,
    });
    const [loading, setLoading] = useState(false);
    const [showNoti, setShowNoti] = useState(false);
    const [notiType, setNotiType] = useState<"success" | "danger">("success");

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
        if (form.image) formData.append("image", form.image);
        if (form.logo) formData.append("logo", form.logo);
        if (form.video) formData.append("video", form.video);
        if (form.horizon_img) formData.append("horizon_img", form.horizon_img);

        try {
            const res = await fetch("http://103.92.25.7:4000/banners", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) throw new Error();
            setNotiType("success");
            setShowNoti(true);
            onAdded();
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
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black opacity-30"
                onClick={onClose}
            />
            <form
                className="relative bg-white rounded-lg shadow-lg p-6 w-3/4 "
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <h2 className="text-lg font-semibold mb-4">Thêm Banner mới</h2>
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
                    </div>
                    <div>
                        <div className="mb-3">
                            <label className="block mb-1 font-medium">Ảnh dọc</label>
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
                            <input
                                type="file"
                                name="logo"
                                accept="image/*"
                                className="w-full border border-gray-200 p-2"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-1 font-medium">Video</label>
                            <input
                                type="file"
                                name="video"
                                accept="video/*"
                                className="w-full border border-gray-200 p-2"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-1 font-medium">Ảnh ngang</label>
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
                <button
                    type="submit"
                    className="mt-4 w-full px-4 py-2 rounded bg-[#333333] text-white hover:bg-[#222222]"
                    disabled={loading}
                >
                    {loading ? "Đang tải dữ liệu, quá trình có thể kéo dài vài phút..." : "Thêm"}
                </button>
            </form>
            {showNoti && (
                <Notification
                    open={showNoti}
                    type={notiType}
                    message={notiType === "success" ? "Thêm banner thành công!" : "Thêm banner thất bại!"}
                    onClose={() => setShowNoti(false)}
                />
            )}
        </div>
    );
};

export default AddBannerModal;