import React, {useEffect, useState} from 'react';
import DynamicRadioButtons from '../components/DynamicRadioButtons'
import {priority, mark, sort} from "@/store/localstore";
import DynamicCheckBox from "@/components/DynamicCheckBox";
import {useUpdateEffect } from "@/hooks/useUpdateEffect"
import {setCookie} from "@/hooks/setCookie";
const LeftBar = ({stateFilter, filter}) => {

    const [selectedSort, setSelectedSort] = useState(stateFilter.sort);
    const [selectedMark, setSelectedMark] = useState(stateFilter.mark);
    const [selectedPriority, setSelectedPriority] = useState(stateFilter.priority);

    useUpdateEffect(() => {
        filter({
            sort: selectedSort,
            mark: selectedMark,
            priority: selectedPriority
        })
        setCookie('sort', selectedSort)
        setCookie('mark', selectedMark.join(';'))
        setCookie('priority', selectedPriority.join(';'))
    }, [selectedSort, selectedMark, selectedPriority]);

    return (
        <>
            <div className={"container-main-bar"}>
                <div className={"container-bar"}>
                    <DynamicRadioButtons options={sort} stateFilter={selectedSort} onSelect={setSelectedSort} name={'Сортировка'}/>
                </div>
                <div className={"container-bar"}>
                    <DynamicCheckBox options={mark} stateFilter={selectedMark} onSelect={setSelectedMark} name={'Отметки'}></DynamicCheckBox>
                    <DynamicCheckBox options={priority} stateFilter={selectedPriority} onSelect={setSelectedPriority} name={'Приоритет'}></DynamicCheckBox>
                </div>
            </div>
        </>
    );
};

export default LeftBar;