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

export interface TFilter {
    sort: string,
    mark: string[],
    priority: string[]
}

export interface TLimit {
    label: string,
    value: string
}