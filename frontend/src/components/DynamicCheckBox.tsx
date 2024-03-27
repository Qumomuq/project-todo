import React from 'react';

const DynamicCheckBox = ({ options, stateFilter, onSelect, name }) => {
    const editMark= (target) => {
        if (target.checked) {
            onSelect([...stateFilter, target.value])
        } else onSelect([...stateFilter].filter((value) => value !== target.value))

    }
    return (
        <div>
            <span className={"label"}>{name}</span>
            {options.map((option) => (
                <div className="checkbox-wrapper" key={option}>
                    <input
                        className="input-checkbox"
                        type="checkbox"
                        id={option}
                        name={option}
                        defaultValue={option}
                        defaultChecked={stateFilter.includes(option)} onChange={(e) => {
                        editMark(e.target)
                    }}
                    />
                    <svg>
                        <use xlinkHref="#checkmark"/>
                    </svg>
                    <label htmlFor={option}>
                        {option}
                    </label>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
                        <symbol id="checkmark" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeMiterlimit="10" fill="none"
                                  d="M22.9 3.7l-15.2 16.6-6.6-7.1">
                            </path>
                        </symbol>
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default DynamicCheckBox;