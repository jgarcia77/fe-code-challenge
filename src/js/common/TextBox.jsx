import React from 'react';
import PropTypes from 'prop-types';

const TextBox = ({name, label, register, error}) => {
    return (
        <div className="text-field">
            <label>{label}</label>
            <input name={name} ref={register} />
            {error && error.type === "required" && (
                <p className="error">{error.message}</p>
            )}
            {error && error.type === "pattern" && (
                <p className="error">{error.message}</p>
            )}
        </div>
    );
}

TextBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    error: PropTypes.object,
};

TextBox.defaultPropTypes = {
    name: '',
    label: '',
    register: () => {},
    error: {}
};

export default TextBox;