import {Injectable, Query} from '@nestjs/common';
import {Card} from "./schema/card.schema";
import {Model, ObjectId} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CreateCardDto} from "./dto/create-card.dto";

@Injectable()
export class CardService {
    constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}

    async getHello(): Promise<string> {
        return 'Hello World!';
    }
    async create(dto: CreateCardDto): Promise<Card> {
        return this.cardModel.create({...dto});
    }
    async getAll(): Promise<Card[]> {
        // const cards = await this.cardModel.find()
        // return this.cardModel.find().sort({date: -1});
        return this.cardModel.find().sort({date: -1});

    }
    async getOne(id: ObjectId): Promise<Card> {
        return this.cardModel.findById(id);
    }
    async delete(id: ObjectId): Promise<ObjectId> {
        // return this.cardModel.
        return this.cardModel.findByIdAndDelete(id)
    }

    async update(id: ObjectId, dto: CreateCardDto): Promise<Card> {
        return this.cardModel.findByIdAndUpdate(id, dto, {new: true})
    }
}
