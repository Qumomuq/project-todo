import {TCard} from "@/types/types";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {useRouter} from "next/router";
import CardForm from "@/components/CardForm";
import CardInfo from "@/components/CardInfo";
import React, {useState} from "react";
import HeadComponent from "@/components/HeadComponent";
import {deleteRequest} from "@/hooks/fetcher";

const CardPage = ({card}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const [edit, setEdit] = useState(false)
    const [cardData, setCardData] = useState(card)
    const redirect = () => {
        if(edit) {
            setEdit(false)
        } else router.push('/')
    }

    return (
        <>
            <HeadComponent title={card.name} description={card.description}/>
            <div className={"container-root"}>
                <div className={"container-main"}>
                    <div className={"container-button"}>
                        <div className={"container-button"}>
                            <button className={"button button-small"} onClick={ redirect}>Назад</button>
                            {edit ? null :<button className={"button button-large button-blue"} onClick={() =>setEdit(!edit)}>Редактировать</button>}
                        </div>
                        {edit ? null : <button className={"button button-small button-red"} onClick={() => {deleteRequest(card._id).then(r => redirect())}}>Удалить</button>}
                    </div>
                    {edit ?
                        <CardForm card={cardData} option="PUT" action={setEdit} data={setCardData}/>
                        :
                        <CardInfo card={cardData}/>
                    }
                </div>
            </div>
        </>
    );
};

export default CardPage;

export const getServerSideProps = (async ({params}) => {
    let res = await fetch(`http://localhost:5000/api/card/` + params?.id)
    if(res.status >= 500) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    const card: TCard = await res.json()
    return { props: { card } }
}) satisfies GetServerSideProps<{ card: TCard }>
