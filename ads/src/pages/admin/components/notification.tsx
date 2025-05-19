import React from "react";

type NotificationType = "success" | "danger" | "warning";

interface NotificationProps {
  open: boolean;
  type: NotificationType;
  message: string;
  onClose: () => void;
}

const icons = {
  success: (
    <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
      </svg>
      <span className="sr-only">Check icon</span>
    </div>
  ),
  danger: (
    <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
      </svg>
      <span className="sr-only">Error icon</span>
    </div>
  ),
  warning: (
    <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
      </svg>
      <span className="sr-only">Warning icon</span>
    </div>
  ),
};

const Notification: React.FC<NotificationProps> = ({ open, type, message, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`flex items-center w-full max-w-xs p-4 mb-4 text-[#333333] bg-white rounded-lg shadow-lg notification-slide-in`}
        role="alert"
      >
        {icons[type]}
        <div className="ms-3 text-sm font-normal">{message}</div>
        <button
          type="button"
          className="ms-auto ml-4 -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
          aria-label="Close"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;