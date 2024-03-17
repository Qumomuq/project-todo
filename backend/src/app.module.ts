import { Module } from '@nestjs/common';
import { CardModule } from "./card/card.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
      MongooseModule.forRoot('mongodb+srv://Chirka:hJ0paZbWYs1uSeSB@cluster0.jcur5eq.mongodb.net/todo_list?w=majority'),
      CardModule
  ]



})
export class AppModule {}
