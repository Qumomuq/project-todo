import React, {useEffect, useState} from 'react';
import {TCard} from "@/types/card";
import CardItem from "@/components/CardItem";
import {useUpdateEffect} from "@/hooks/useUpdateEffect";
interface CardListProps {
    cards: TCard[]
    filter: {
        sort: string,
        mark: string[],
        priority: string[]
    }
}


const CardList: React.FC<CardListProps> = ({cards,filter}) => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [cardData, setCardData] = useState<TCard[]>(cards)
    const [fetching, setFetching] = useState<boolean>(false)
    const [permissionFetching, setPermissionFetching] = useState(true)
    const fetchData = async () => {
        let limit = 5
        console.log(filter)
        let res = await fetch(`http://localhost:5000/api/card?page=${currentPage}&limit=${limit}&sort=${filter.sort}&mark=${filter.mark}&priority=${filter.priority}`)
        const cardsF: TCard[] = await res.json()
        // console.log(cardsF.length < limit)
        // console.log(permissionFetching)
        // if(cardsF.length < limit) {
        //     console.log('fwefwafawfwafawf')
        //     setPermissionFetching(false)
        // }
        setCardData([...cardData, ...cardsF])
        setCurrentPage(prevState => prevState + 1)
        setFetching(false)
    }

    const scrollHandler = (e: any) => {
        if(permissionFetching) {
            if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < e.target.documentElement.scrollHeight /100 * 15) {
                setFetching(true)
            }
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
        setFetching(true)
    }, [filter]);
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    return (
        <div className={"container-main"}>
            <>
                {cardData.length === 0 ?
                    <span>Нет записей</span>
                    :
                    <div>
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