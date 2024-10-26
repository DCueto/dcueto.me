import { useState } from "react";
import './Modal.scss';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

const Modal = ({ children, onClose, open }: Props) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal;