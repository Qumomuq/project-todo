import React from 'react';
import {useRouter} from "next/router";
import CardForm from "@/components/CardForm";
import HeadComponent from "@/components/HeadComponent";

const Index = ({state}: any) => {
    const router = useRouter()
    return (
        <>
        <HeadComponent title={'Создание задачи'} description={'Форма для создания новой задачи'}/>
        <div className={"container-root"}>
            <div className={"container-main"}>
                <button className={"button button-small"} onClick={() => router.push('/')}>Назад</button>
                <CardForm card={state} action={undefined} data={undefined} option={undefined}/>
            </div>
        </div>
        </>
    );
};

export default Index;