import React from 'react'
import ReactDOM from 'react-dom'

const modalRoot = document.getElementById('modal-root')

function Modal({isOpen, setModalOpen, children}) {
  const el = document.createElement('div')

  React.useEffect(() => {

    modalRoot.appendChild(el)
    return () => modalRoot.removeChild(el)

  }, [el])

  return (isOpen && ReactDOM.createPortal( 
    <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          padding: "100px",
          backgroundColor: "rgba(0,0,0,0.6)"
        }}
      >
        <div
          style={{
            width: "50%",
            background: "white",
            padding: "50px",
            textAlign: "center"
          }}
        >
          {children}
        </div>
      </div>
    , el))
}

export default Modal