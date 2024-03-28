import {Module} from '@nestjs/common';
import {CardController} from './card.controller';
import {CardService} from './card.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Card, CardSchema} from "./schema/card.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Card.name, schema: CardSchema}])],
    controllers: [CardController],
    providers: [CardService],
})
export class CardModule {}
