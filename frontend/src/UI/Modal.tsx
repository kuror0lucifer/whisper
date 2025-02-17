import { FC } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  className?: string;
  onClick?: () => void;
}

export const Modal: FC<ModalProps> = ({ className, onClick }) => {
  const portalRoot = document.getElementById('portal-root');

  if (!portalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className='fixed inset-0 bg-gray-400/50 flex justify-center items-center w-full h-screen'>
      <div
        className={`relative ${className} rounded-2xl bg-white`}
        onClick={onClick}
      ></div>
    </div>,
    portalRoot
  );
};
