import React from 'react';

const TextBox = ({name, label, register, error, messages = {}}) => {
    return (
        <div className="text-field">
            <label>{label}</label>
            <input name={name} ref={register} />
            {error && error.type === "required" && (
                <p>{messages.required}</p>
            )}
            {error && error.type === "pattern" && (
                <p>{messages.pattern}</p>
            )}
        </div>
    );
}

export default TextBox;