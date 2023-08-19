interface BotEvent {
    category: string;
    name: string;
    description: string;
    datetime: Date;
    channel: string;
    tags: string;
    notify: boolean;
}

interface F1Bet {
    race: string;
    nick: string;
    p1: string;
    p2: string;
    p3: string;
    fl: string;
}

export type { BotEvent, F1Bet }