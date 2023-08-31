export function load({ params }) {
    const date = params.date;
    const text = params.text;
    const channel = params.channel;

    return {
        date,
        text,
        channel
    };
}
