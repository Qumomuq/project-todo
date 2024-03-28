import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as process from "process";


const  start = async () => {
  try {

    const PORT = process.env.PORT || 5000
    const app = await  NestFactory.create(AppModule,{cors: true})
    app.setGlobalPrefix('api');
    await app.listen(PORT, () => {
      console.log(`start server: ${PORT}`)});
  } catch (e) {
    console.error(e)
  }
}
start()