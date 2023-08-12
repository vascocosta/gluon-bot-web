export interface BotEvent {
    category: string;
    name: string;
    description: string;
    datetime: Date;
    channel: string;
    tags: string;
    notify: boolean;
}