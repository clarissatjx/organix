import React, { useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Modal({ children, showModal, setShowModal }) {
  const modalRef = useRef();
  useEffect(() => {
    AOS.init();
  }, []);

  function closeModal(e) {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  }

  return (
    showModal && (
      <div className="Modal" ref={modalRef} onClick={closeModal} data-aos="fade-up">
        <div className="container">{children}</div>
      </div>
    )
  );
}

export default Modal;
