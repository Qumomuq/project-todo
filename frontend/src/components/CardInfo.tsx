import React from 'react';
import {TCard} from "@/types/types";
import {fixDate} from "@/hooks/fixDate";

interface CardItemProps {
    card: TCard ;
}
const CardInfo: React.FC<CardItemProps> = ({card}) => {

    return (
        <>
                    <div className={"container"}>
                        <div className={"group"}>
                            <span className={"label"}>Название задачи</span>
                            <span title={card.name} className={"text"}>{card.name}</span>
                        </div>
                        <div className={"group"}>
                            <span className={"label"}>Дата создания</span>
                            <span className={"text"}>{fixDate(card.date)}</span>
                        </div>
                        <div className={"group"}>
                            <span className={"label"}>Приоритет</span>
                            <span className={"text"}>{card.priority}</span>

                        </div>
                        <div className={"group"}>
                            {card.mark && card.mark?.length !== 0 ?
                                <>
                                    <span className={"label"}>Отметки</span>
                                    <div className={"group-checkbox"}>

                                        <div className={"text"}>
                                            {card.mark.map((option: any) => (
                                            <span key={option}>{option}</span>
                                            ))}
                                        </div>
                                    </div>
                                </> :
                                <>
                                    <span className={"label"}>Отметок нет</span>
                                </>
                            }

                        </div>
                        <div className={"group"}>
                            <span className={"label"}>Описание</span>
                            <span className={"text"}>{card.description}</span>
                        </div>
                    </div>
        </>
    );
};

export default CardInfo;