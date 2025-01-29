import { useState } from 'react';
import './Modal.css';

const Modal = ({children, show, onClose, title}) => {

    if (!show) return null;

    return (
        <section className="modal">
            <div className="modalWrapper">
                <div className="modalHeader">
                    <h2>{title}</h2> <button onClick={onClose}>X</button>
                </div>
                {children}
            </div>
        </section>
    )
}

export default Modal;