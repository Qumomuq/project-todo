import React from 'react';
import {TCard} from "@/types/card";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

interface CardItemProps {
    card: TCard;
}
const CardItem:React.FC<CardItemProps> = ({card}) => {
    return (
        <>
            <Link className={"container-item"} href={'/card/' + card._id}>
                <span title={card.name} className={"name-item"}>{card.name}</span>
                <span>Создано: {card.date}</span>
                <span>Приоритет: {card.priority}</span>
                {card.mark.length === 0 ?
                    <span>Отметок нет</span>
                    :
                    <span>Отметки: {card.mark}</span>
                }
            </Link>
        </>
    );
};

export default CardItem;