import React from 'react';
import {TCard} from "@/types/card";
import Link from "next/link";

interface CardItemProps {
    card: TCard;
}
const CardItem:React.FC<CardItemProps> = ({card}) => {
    return (
        <div>
            <Link href={'/card/' + card._id}>{card.name}</Link>
        </div>
    );
};

export default CardItem;