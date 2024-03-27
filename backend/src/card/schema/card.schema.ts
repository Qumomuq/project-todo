import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MarkDto} from "../dto/create-card.dto";
import {Mark} from "./mark.schema";

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    date: Date;

    @Prop()
    priority: string;

    @Prop({type: Array})
    mark: string[];
}

export const CardSchema = SchemaFactory.createForClass(Card);