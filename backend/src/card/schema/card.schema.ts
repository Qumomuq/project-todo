import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

    @Prop()
    mark: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);