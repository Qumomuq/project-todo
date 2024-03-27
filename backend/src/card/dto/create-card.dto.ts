export class CreateCardDto {
    readonly name: string;
    readonly description: string;
    readonly date: Date;
    readonly priority: string;
    readonly mark: string[]
}

export class MarkDto {
     research: boolean;
     design: boolean;
     development: boolean;
}