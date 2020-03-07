import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

const el = document.createElement('div');
el.className = 'modal-root__dynamic-element'

const ModalPortal = ({children}) => {
    React.useEffect(() => {
        const modalRoot = document.getElementById('modal-root');
        modalRoot.appendChild(el);

        return () => {
            modalRoot.removeChild(el);
        };
    }, []);

    return (
        ReactDOM.createPortal(children, el)
    );
}

const Modal = ({isOpen, onClose, children}) => {
    const modalClasses = classnames('modal', {'modal--open': isOpen});
    const overlayClasses = classnames('overlay', {'overlay--visible': isOpen});

    return (
        <ModalPortal>
            <div className={overlayClasses} />
            <div className={modalClasses}>
                <div className="close" onClick={onClose}>x</div>
                <div className="content">
                    {children}
                </div>
            </div>
        </ModalPortal>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

Modal.defaultProps = {
    isOpen: false,
    onClick: () => {}
}

export default Modal;