import React from 'react';

const DynamicRadioButtons = ({ options,stateFilter, onSelect, name }) => {
    const handleOptionChange = (event) => {
        const value = event.target.value;
        onSelect(value);
    };

    return (
        <div>
            <span className={"label"}>{name}</span>
            {options.map((option) => (
                <div key={option.value}>
                    <input
                        className={'radiobutton-custom'}
                        type="radio"
                        id={option.value}
                        name={option.value}
                        value={option.value}
                        checked={stateFilter === option.value}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                </div>
            ))}
        </div>
    );
};

export default DynamicRadioButtons;