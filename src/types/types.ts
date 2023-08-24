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

interface F1BetScore {
    nick: string;
    points: number;
}

interface Quote {
    date: Date;
    text: string;
    channel: string;
}

interface APIData {
    bets: Promise<F1Bet[]>;
    events: Promise<BotEvent[]>;
    scores: Promise<F1BetScore[]>;
}

export type { APIData, BotEvent, F1Bet, F1BetScore, Quote }