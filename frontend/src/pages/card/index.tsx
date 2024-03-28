import React, {useState} from 'react';
import {LinkProps} from "next/link";
import {useRouter} from "next/router";
import CardForm from "@/components/CardForm";

const Index = ({state}: any) => {
    const router = useRouter()
    return (
        <div className={"container-root"}>
            <div className={"container-main"}>
                <button className={"button button-small"} onClick={() => router.push('/')}>Назад</button>
                <CardForm card={state} action={undefined} data={undefined} option={undefined}/>
            </div>
        </div>
    );
};

export default Index;