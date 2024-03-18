import {TCard} from "@/types/card";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {logAppDirError} from "next/dist/server/dev/log-app-dir-error";

const CardPage = ({card}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            {card.name}
        </div>
    );
};

export default CardPage;

export const getServerSideProps = (async ({params}) => {
    let res = await fetch(`http://localhost:5000/api/card/` + params?.id)
    // console.log(res.status)
    if (res.status !== 200) {
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
