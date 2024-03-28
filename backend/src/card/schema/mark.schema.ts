import {Prop, Schema} from '@nestjs/mongoose';

// export type MarkDocument = HydratedDocument<Mark>;

@Schema()
export class Mark{
    @Prop()
    research: boolean

    @Prop()
    design: boolean

    @Prop()
    development: boolean
}

// export const MarkSchema = SchemaFactory.createForClass(Mark);