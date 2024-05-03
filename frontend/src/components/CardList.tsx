import React, {useEffect, useState} from 'react';
import {TCard} from "@/types/types";
import CardItem from "@/components/CardItem";
import {useUpdateEffect} from "@/hooks/useUpdateEffect";
import {limit, url} from "@/store/localstore"
import { useInView } from 'react-intersection-observer';

interface CardListProps {
    cards: TCard[],
    filter: {
        sort: string,
        mark: string[],
        priority: string[]
    }
}

const CardList: React.FC<CardListProps> = ({cards ,filter}) => {
    const [currentPage, setCurrentPage] = useState<number>(2)
    const [cardData, setCardData] = useState<TCard[]>(cards)
    const [fetching, setFetching] = useState<boolean>(false)
    const [permissionFetching, setPermissionFetching] = useState<boolean>(true)
    const { ref, inView } = useInView();

    const fetchData = async () => {
        let res = await fetch(`${url}/card?page=${currentPage}&limit=${limit}&sort=${filter.sort}&mark=${filter.mark}&priority=${filter.priority}`)
        const cardsNew: TCard[] = await res.json()
        if(cardsNew.length < limit) {
            setPermissionFetching(false)
        }
        setCardData([...cardData, ...cardsNew])
        setCurrentPage(prevState => prevState + 1)
        setFetching(false)
    }

    useEffect( () => {
        if(fetching) {
            fetchData()
        }
    },[fetching])

    useUpdateEffect( () => {
        if(inView && permissionFetching) {
            setFetching(true)
        }
    }, [inView])

    useUpdateEffect(() => {
        setCurrentPage(1)
        setCardData([])
        setPermissionFetching(true)
        setFetching(true)
    }, [filter])

    return (
        <div className={"container-main"}>
            <>
                {cardData.length === 0 ?
                    <span>Нет записей</span>
                    :
                    <div className={"container-main"}>
                        {cardData.map((card: any) => (
                            <CardItem key={card._id} card={card}/>
                        ))}
                        {permissionFetching ?
                        <div className={"container-loader"}>
                            <div className={"loader"}ref={ref}></div>
                        </div> : null
                        }
                        
                    </div>
                }
            </>
        </div>
    );
};



export default CardList;