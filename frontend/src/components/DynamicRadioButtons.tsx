import React from 'react';

const DynamicRadioButtons = ({ options,stateFilter, onSelect, name }) => {
    const handleOptionChange = (event) => {
        const value = event.target.value;
        onSelect(value);
    };

    return (
        <div className={'container-radio'}>
            <span className={"label"}>{name}</span>
            <div className={'container-radio'}>
            {options.map((option) => (
                <div className={'group-item'} key={option.value}>
                    <input
                        className={'radiobutton-custom'}
                        type="radio"
                        id={option.value}
                        name={option.value}
                        value={option.value}
                        checked={stateFilter === option.value}
                        onChange={handleOptionChange}
                    />
                    <label className={'radio-name'} htmlFor={option.value}>{option.label}</label>
                </div>
            ))}
            </div>
        </div>
    );
};

export default DynamicRadioButtons;