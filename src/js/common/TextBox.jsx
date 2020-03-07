import React from 'react';
import PropTypes from 'prop-types';

const TextBox = ({name, label, register, error, messages = {}}) => {
    return (
        <div className="text-field">
            <label>{label}</label>
            <input name={name} ref={register} />
            {error && error.type === "required" && (
                <p className="error">{messages.required}</p>
            )}
            {error && error.type === "pattern" && (
                <p className="error">{messages.pattern}</p>
            )}
        </div>
    );
}

TextBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    error: PropTypes.object,
    messages: PropTypes.object
};

TextBox.defaultPropTypes = {
    name: '',
    label: '',
    register: () => {},
    error: {},
    messages: {}
};

export default TextBox;