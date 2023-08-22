import { API_URL } from '../constants/constants';
import { statusText } from '$lib/utils';
import type { BotEvent } from '../types/types';

export function load({ params }) {
    return {
        events: fetchEvents()
    };
}

async function fetchEvents(): Promise<BotEvent[]> {
    const response = await fetch(`${API_URL}/events`);

    if (!response.ok) {
        throw new Error('Could not fetch data.');
    }

    return await response.json();
}