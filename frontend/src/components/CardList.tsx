import React from 'react';
import {getServerSideProps} from "next/dist/build/templates/pages";
import {TCard} from "@/types/card";
import CardItem from "@/components/CardItem";
interface CardListProps {
    cards: TCard[]
}


const CardList: React.FC<CardListProps> = ({cards}) => {

    return (
        <div>
            {cards.map((card: any) => (
                <CardItem key={card._id} card={card}/>
            ))}
        </div>
    );
};



export default CardList;