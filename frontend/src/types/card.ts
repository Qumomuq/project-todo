export interface TCard {
    _id: string,
    name: string,
    description: string,
    date: string,
    priority: string,
    mark: string[]
}
export interface TMark {
    research: boolean,
    design: boolean,
    development: boolean
}