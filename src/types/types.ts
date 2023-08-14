export interface Bet {
    race: string;
    nick: string;
    p1: string;
    p2: string;
    p3: string;
    fl: string;
}

export interface BotEvent {
    category: string;
    name: string;
    description: string;
    datetime: Date;
    channel: string;
    tags: string;
    notify: boolean;
}