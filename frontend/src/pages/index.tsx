import {Inter} from "next/font/google";
import CardList from "@/components/CardList";
import {TCard, TFilter} from "@/types/types";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import React, {useState} from "react";
import {useRouter} from "next/router";
import LeftBar from "@/components/LeftBar";
import {limit, mark, priority, url} from "@/store/localstore";
import HeadComponent from "@/components/HeadComponent";

const inter = Inter({subsets: ["latin"]});

export default function Home({cards, filterCookie}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const router = useRouter()
    const [filter, setFilter] = useState(filterCookie)

    return (
        <>
            <HeadComponent title={'TODO-APP'} description={'Задачи'}/>
            <div className={"container-root"}>
                <button id={'button-phone'} className={"button button-large button-blue"} onClick={() => router.push('/card')}>Добавить задачу</button>
                <LeftBar stateFilter={filter} filter={setFilter}/>
                <div className={"container-main"}>
                    <button id={'button-desktop'} className={"button button-large button-blue"} onClick={() => router.push('/card')}>Добавить задачу</button>
                    <CardList cards={cards} filter={filter}/>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps = (async (context) => {
    const filterCookie: TFilter = {
        sort: context.req.cookies['sort'] || '-1',
        mark: context.req.cookies['mark']?.split(';') || mark,
        priority: context.req.cookies['priority']?.split(';') || priority,
    }
    const res = await fetch(`${url}/card?page=${context.query?.page}&limit=${limit}&sort=${filterCookie.sort}&mark=${filterCookie.mark}&priority=${filterCookie.priority}`)
    if(res.status >= 400) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    const cards = await res.json()
    return {props: {cards, filterCookie}}
}) satisfies GetServerSideProps<{ cards: TCard[], filterCookie: any }>


