import React from 'react';
import {TCard} from "@/types/types";
import Link from "next/link";
import {fixDate} from "@/hooks/fixDate";

interface CardItemProps {
    card: TCard;
}
const CardItem:React.FC<CardItemProps> = ({card}) => {
    // const [textDate, setTextDate] = useState('')
    const declOfHours = (hour: number) => {
        let titles = ['час', 'часа', 'часов']
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(hour % 100 > 4 && hour % 100 < 20) ? 2 : cases[(hour % 10 < 5) ? hour % 10 : 5]];
    }
    const declOfMinutes = (minutes: number) => {
        let titles = ['минуту', 'минуты', 'минут']
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(minutes % 100 > 4 && minutes % 100 < 20) ? 2 : cases[(minutes % 10 < 5) ? minutes % 10 : 5]]
    }
    // const formattedDate = () => {
    //     const creationDate = Date.parse(card.date)
    //     const currentDate= Date.now();
    //     const diffInMinutes = Math.floor((currentDate - creationDate) / (1000 * 60));
    //     if(diffInMinutes < 1) {
    //         setTextDate(`сейчас`)
    //     } else if(diffInMinutes < 60) {
    //         setTextDate(`${diffInMinutes} ${declOfMinutes(diffInMinutes)} назад`)
    //     } else if (diffInMinutes < 720) {
    //         let diffInHours = Math.floor(diffInMinutes / 24)
    //         setTextDate(`${diffInHours} ${declOfHours(diffInHours)} назад`)
    //     }else {
    //         setTextDate(`${card.date}`)
    //     }
    // }
    // useEffect(() => {
    //     const interval = setInterval(formattedDate, 1000);
    //     return () => clearInterval(interval);
    // }, [])
    const formattedDate = ():string => {
        const creationDate:number = Date.parse(card.date)
        const currentDate:number= Date.now();
        const diffInMinutes:number = Math.floor((currentDate - creationDate) / (1000 * 60));
        if(diffInMinutes < 1) {
            return `сейчас`
        } else if(diffInMinutes < 60) {
            return `${diffInMinutes} ${declOfMinutes(diffInMinutes)} назад`
        } else if (diffInMinutes < 720) {
            let diffInHours = Math.floor(diffInMinutes / 24)
            return `${diffInHours} ${declOfHours(diffInHours)} назад`
        }else {
            return `${fixDate(card.date)}`
        }
    }
    // useEffect(() => {
    //     const interval = setInterval(formattedDate, 1000);
    //     return () => clearInterval(interval);
    // }, [])


    return (
        <>
            <Link className={"container-item"} href={'/card/' + card._id}>
                <span title={card.name} className={"name-item"}>{card.name}</span>
                <span id={`date${card._id}`}>Создано: {formattedDate()}</span>
                <span>Приоритет: {card.priority}</span>
                {card.mark && card.mark.length === 0 ?
                    <span>Отметок нет</span>
                    :
                    <span className={'small-text'}>Отметки:
                        {card.mark.map((mark: string) => (
                            <span key={mark}>{mark}</span>
                        ))}
                    </span>
                }
            </Link>
        </>
    );
};

export default CardItem;