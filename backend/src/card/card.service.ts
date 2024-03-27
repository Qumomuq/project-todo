import {Injectable, Query} from '@nestjs/common';
import {Card} from "./schema/card.schema";
import {Model, ObjectId, SortOrder, SortValues} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CreateCardDto} from "./dto/create-card.dto";

@Injectable()
export class CardService {
    constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}

    search(a, b) {
        let result = [];
        let length = a.length
        let i = 0
        for(i; i < length; i++) {
            if (b.indexOf(a[i]) == -1) {
                result.push(a[i]);
            }
        }
        return result;
    }

    async getHello(): Promise<string> {
        return 'Hello World!';
    }
    async create(dto: CreateCardDto): Promise<Card> {
        return this.cardModel.create(dto);
    }
    async getAll(page?: number, limit?: number, sort: SortOrder = 1, mark?: string, priority?: string): Promise<Card[]> {
        const filters:any = {}
        const markF = ['research', 'design', 'development' ];
        if (mark) {
            const markArray  = mark.split(',')
            filters.mark = {$nin: this.search(markF, markArray)}
        } else {
            filters.mark = {$nin: markF}
        }
        if (priority) {
            const priorityArray  = priority.split(',')

            filters.priority = {$in: priorityArray}
        } else {
            filters.priority = priority
        }
        const card = this.cardModel.find(filters).sort({date: Number(sort) as SortOrder}).skip((page - 1) * limit).limit(limit);
        return card
    }

    async getOne(id: ObjectId): Promise<Card> {
        return this.cardModel.findById(id);
    }
    async delete(id: ObjectId): Promise<ObjectId> {
        return this.cardModel.findByIdAndDelete(id)
    }

    async update(id: ObjectId, dto: CreateCardDto): Promise<Card> {
        return this.cardModel.findByIdAndUpdate(id, dto, {new: true})
    }
}
