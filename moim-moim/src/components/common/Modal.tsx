import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

const Modal = ({ title, children, isModal, setIsModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log("isModalCode(isModalCode), isOpen", isModal, isOpen);
  useEffect(() => {
    setIsOpen(isModal);
  }, [isModal]);

  const onClickClose = () => {
    setIsOpen(false);
    setIsModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-0 left-0 top-0 z-50 h-full w-full bg-black bg-opacity-20 ring-0">
      <div className="absolute left-1/2 top-1/2 w-[90%] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white">
        <div className="flex items-center justify-between p-4 pb-0 pr-2">
          {title && <p className="font-bold">{title}</p>}
          <button onClick={onClickClose}>
            <IoIosClose size={28} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
