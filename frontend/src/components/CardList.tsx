import React, {useEffect, useState} from 'react';
import {TCard} from "@/types/types";
import CardItem from "@/components/CardItem";
import {useUpdateEffect} from "@/hooks/useUpdateEffect";
import {limit, url} from "@/store/localstore"

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

    const scrollHandler = (e: any) => {
        if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < e.target.documentElement.scrollHeight / 100 * 15) && permissionFetching) {
            setFetching(true)
        }
    }

    useEffect( () => {
        if(fetching) {
            fetchData()
        }
    },[fetching])

    useUpdateEffect(() => {
        setCurrentPage(1)
        setCardData([])
        setPermissionFetching(true)
        setFetching(true)
    }, [filter])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [permissionFetching])

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
                    </div>

                }
            </>

        </div>
    );
};



export default CardList;