import { API_URL } from '../constants/constants';
import { statusText } from '$lib/utils';
import type { APIData, BotEvent, F1Bet, F1BetScore } from '../types/types';

export function load(): APIData {
    return {
        bets: fetchData<F1Bet>('f1bets'),
        events: fetchData<BotEvent>('events'),
        scores: fetchData<F1BetScore>('f1bets/scores'),
    };
}

async function fetchData<T>(endpoint: string): Promise<T[]> {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`);

        if (!response.ok) {
            console.log(`Data could not be fetched. (${response.status} ${statusText(response.status)}`);

            return Promise.resolve([]);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Data could not be parsed. (${error.message})`);
        } else {
            console.log(`Data could not be parsed. (Unknown error)`);
        }

        return Promise.resolve([]);
    }
}