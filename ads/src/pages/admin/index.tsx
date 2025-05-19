import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSquarePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "./components/confirm.modal";
import AddBannerModal from "./components/add-banner.modal";
import Notification from "./components/notification";
import UpdateBannerModal from "./components/update-banner.modal";

interface Banner {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
  logo: string;
  video?: string;
  horizon_img?: string;
}
const PAGE_SIZE = 3;
const AdminBannerPage: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAddBanner, setShowAddBanner] = useState(false);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [showNoti, setShowNoti] = useState(false);
  const [notiType, setNotiType] = useState<"success" | "danger">("success");

  useEffect(() => {
    fetch("http://localhost:3000/banners")
      .then((res) => res.json())
      .then((data) => {
        setBanners(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredBanners = banners.filter(
    (banner) =>
      banner.name.toLowerCase().includes(search.toLowerCase()) ||
      banner.description.toLowerCase().includes(search.toLowerCase()) ||
      banner.link.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredBanners.length / PAGE_SIZE);
  const paginatedBanners = filteredBanners.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Checkbox logic
  useEffect(() => {
    if (
      paginatedBanners.length > 0 &&
      paginatedBanners.every((b) => selectedIds.includes(b.id))
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [paginatedBanners, selectedIds]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds(selectedIds.filter(id => !paginatedBanners.some(b => b.id === id)));
    } else {
      setSelectedIds([
        ...selectedIds,
        ...paginatedBanners
          .filter(b => !selectedIds.includes(b.id))
          .map(b => b.id),
      ]);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Xóa banner
  const handleDelete = async () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      for (const id of selectedIds) {
        const res = await fetch(`http://localhost:3000/banners/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
      }
      setBanners((prev) => prev.filter((b) => !selectedIds.includes(b.id)));
      setSelectedIds([]);
      setNotiType("success");
      setShowNoti(true);
    } catch {
      setNotiType("danger");
      setShowNoti(true);
    } finally {
      setShowConfirm(false);
      setTimeout(() => setShowNoti(false), 2000);
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleEditBanner = (banner: Banner) => {
    setSelectedBanner(banner);
    setShowUpdateBanner(true);
  };

  return (
    <>
      <nav className="bg-[#222222e7] text-white w-full">
        <div className="flex items-center p-4">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-16 h-auto mr-2"
            style={{ objectFit: "contain" }}
          />
        </div>
      </nav>
      <div className="relative overflow-x-auto sm:rounded-lg p-8 bg-white text-gray-800">
        <div className="pb-4 bg-white flex items-center gap-2">

          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block pl-10 pr-2 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tìm kiếm banner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center ml-auto">
            <button
              className={`flex items-center gap-1 px-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 cursor-pointer`}
              onClick={handleDelete}
              disabled={selectedIds.length === 0}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <ConfirmModal
              open={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              message="Bạn có chắc chắn muốn xóa các banner đã chọn?"
            />
            <button
              className="ml-2 flex items-center gap-1 px-2 py-2 bg-[#333333] text-white rounded-lg hover:bg-[#222222] transition cursor-pointer"
              onClick={() => setShowAddBanner(true)}
            >
              <FontAwesomeIcon icon={faSquarePlus} />
            </button>
          </div>
        </div>
        {loading ? (
          <div>Đang tải...</div>
        ) : (
          <>
            <table className="w-full text-sm text-center text-gray-700 border border-gray-200">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="p-4 text-center">
                    <div className="flex items-center justify-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th className="px-6 py-3 w-1/10 text-center">Tên</th>
                  <th className="px-6 py-3 w-2/10 text-center">Mô tả</th>
                  <th className="px-6 py-3 w-1/10 text-center">Link</th>
                  <th className="px-6 py-3 text-center">Ảnh dọc</th>
                  <th className="px-6 py-3 text-center">Logo</th>
                  <th className="px-6 py-3 text-center">Ảnh ngang</th>
                  <th className="px-6 py-3 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBanners.map((banner) => (
                  <tr
                    key={banner.id}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50 text-center"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center justify-center">
                        <input
                          id={`checkbox-table-search-${banner.id}`}
                          type="checkbox"
                          checked={selectedIds.includes(banner.id)}
                          onChange={() => handleSelectRow(banner.id)}
                          className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${banner.id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {banner.name}
                    </td>
                    <td className="px-6 py-4">{banner.description}</td>
                    <td className="px-6 py-4">
                      <a
                        href={banner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {banner.link}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      {banner.image && (
                        <img
                          src={banner.image}
                          alt="banner"
                          className="w-20 h-auto object-cover rounded mx-auto"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {banner.logo && (
                        <img
                          src={banner.logo}
                          alt="logo"
                          className="w-12 h-12 object-cover rounded mx-auto"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {banner.horizon_img && (
                        <img
                          src={banner.horizon_img}
                          alt="horizon"
                          className="w-40 h-auto object-cover rounded mx-auto"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-blue-600 hover:text-blue-800 cursor-pointer bg-blue-50 hover:bg-blue-100 rounded-lg w-10 h-10"
                        onClick={() => handleEditBanner(banner)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav className="flex justify-start mt-6" aria-label="Page navigation example">
              <ul className="flex items-center -space-x-px h-8 text-sm">
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center cursor-pointer px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="w-2.5 h-2.5" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <li key={page}>
                    <button
                      onClick={() => handlePageChange(page)}
                      aria-current={currentPage === page ? "page" : undefined}
                      className={`flex items-center justify-center px-3 h-8 leading-tight border cursor-pointer ${currentPage === page
                        ? "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                        : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center cursor-pointer px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="w-2.5 h-2.5" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
            <Notification
              open={showNoti}
              type={notiType}
              message={
                notiType === "success"
                  ? "Xóa banner thành công!"
                  : "Xóa banner thất bại!"
              }
              onClose={() => setShowNoti(false)}
            />
            <AddBannerModal
              open={showAddBanner}
              onClose={() => setShowAddBanner(false)}
              onAdded={() => {
                // Sau khi thêm mới, reload lại danh sách banner
                fetch("http://localhost:3000/banners")
                  .then((res) => res.json())
                  .then((data) => setBanners(data));
              }}
            />
            <UpdateBannerModal
              open={showUpdateBanner}
              onClose={() => setShowUpdateBanner(false)}
              onUpdated={() => {
                // Sau khi cập nhật, reload lại danh sách banner
                fetch("http://localhost:3000/banners")
                  .then((res) => res.json())
                  .then((data) => setBanners(data));
              }}
              banner={selectedBanner}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AdminBannerPage;