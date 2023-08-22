import { API_URL } from '../constants/constants';
import type { BotEvent, F1Bet } from '../types/types';

export function load({ params }) {
    return {
        events: fetchEvents(),
        bets: fetchBets(),
    };
}

async function fetchEvents(): Promise<BotEvent[]> {
    const response = await fetch(`${API_URL}/events`);

    if (!response.ok) {
        throw new Error('Could not fetch data.');
    }

    return await response.json();
}

async function fetchBets(): Promise<F1Bet[]> {
    const response = await fetch(`${API_URL}/f1bets`);

    if (!response.ok) {
        throw new Error('Could not fetch data.');
    }

    return await response.json();
}