import { FaCheckCircle } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { IoInformationCircle } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";

export const AlertComponent = ({
  alertType,
  title,
  message,
}: {
  alertType?: string;
  title: string;
  message: string;
}) => {
  let textColor = "text-green-400";
  let borderColor = "border-green-200";
  let bgColor = "bg-green-50";

  let icon = (
    <FaCheckCircle
      size={20}
      className={textColor}
    />
  );

  switch (alertType) {
    case "error":
      textColor = "text-red-400";
      borderColor = "border-red-200";
      bgColor = "bg-red-50";
      icon = (
        <IoCloseCircle
          size={20}
          className={textColor}
        />
      );
      break;
    case "warning":
      textColor = "text-yellow-400";
      borderColor = "border-yellow-200";
      bgColor = "bg-yellow-50";
      icon = (
        <IoWarningOutline
          size={20}
          className={textColor}
        />
      );
      break;
    case "info":
      textColor = "text-blue-400";
      borderColor = "border-blue-200";
      bgColor = "bg-blue-50";
      icon = (
        <IoInformationCircle
          size={20}
          className={textColor}
        />
      );
      break;
  }

  return (
    <div
      className={`${bgColor} border ${borderColor} text-sm ${textColor} rounded-lg p-4`}
      role='alert'
      aria-labelledby='hs-with-description-label'>
      <div className='flex'>
        {icon}
        <div className='ms-4'>
          <h3
            id='hs-with-description-label'
            className='text-sm font-semibold'>
            {title}
          </h3>
          <div className={`mt-1 text-sm ${textColor}`}>{message}</div>
        </div>
      </div>
    </div>
  );
};
