import { API_URL } from '../constants/constants';
import type { BotEvent, F1Bet, F1BetScore } from '../types/types';

export function load({ params }) {
    return {
        bets: fetchBets(),
        events: fetchEvents(),
        scores: fetchBetScores(),
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

async function fetchBetScores(): Promise<F1BetScore[]> {
    const response = await fetch(`${API_URL}/f1bets/scores`);

    if (!response.ok) {
        throw new Error('Could not fetch data.');
    }

    return await response.json();
}