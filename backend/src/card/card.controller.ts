import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {CardService} from './card.service';
import {CreateCardDto} from "./dto/create-card.dto";
import {Card} from "./schema/card.schema";
import {ObjectId, SortOrder, SortValues} from "mongoose";

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post()
    create(@Body() dto: CreateCardDto): Promise<Card> {
        return this.cardService.create(dto)
    }

    @Get()
    getAll(@Query ('page') page: number,
           @Query ( 'limit') limit: number,
           @Query ( 'sort') sort: SortOrder,
           @Query ( 'mark') mark: string,
           @Query ( 'priority') priority: string)  {
        return this.cardService.getAll(page, limit, sort, mark, priority);
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.cardService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.cardService.delete(id);
    }

    @Put(':id')
    update(@Body() dto: CreateCardDto, @Param('id') id: ObjectId) {
        return this.cardService.update(id, dto);
    }
    // @Get()
    // getCard(): string {
    //     return this.appService.getHello();
    // }
}
