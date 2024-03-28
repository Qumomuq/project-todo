import React from 'react';
import {TCard} from "@/types/card";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

interface CardItemProps {
    card: TCard;
}
const CardItem:React.FC<CardItemProps> = ({card}) => {
    const declOfHours = (number) => {
        let titles = ['час', 'часа', 'часов']
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }
    const declOfMinuts = (number) => {
        let titles = ['минуту', 'минуты', 'минут']
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
    }
    const formattedDate = () => {
        const creationDate = Date.parse(card.date)
        const currentDate= Date.now();
        const diffInMinutes = Math.floor((currentDate - creationDate) / (1000 * 60));
        if(diffInMinutes < 1) {
            return `сейчас`
        } else if(diffInMinutes < 60) {
            return `${diffInMinutes} ${declOfMinuts(diffInMinutes)} назад`
        } else if (diffInMinutes < 720) {
            let diffInHours = Math.floor(diffInMinutes / 24)
            return `${diffInHours} ${declOfHours(diffInHours)} назад`
        }else {
            return `${card.date}`
        }
    }
    return (
        <>
            <Link className={"container-item"} href={'/card/' + card._id}>
                <span title={card.name} className={"name-item"}>{card.name}</span>
                <span>Создано: {formattedDate()}</span>
                <span>Приоритет: {card.priority}</span>
                {card.mark && card.mark.length === 0 ?
                    <span>Отметок нет</span>
                    :
                    <span>Отметки: {card.mark}</span>
                }
            </Link>
        </>
    );
};

export default CardItem;