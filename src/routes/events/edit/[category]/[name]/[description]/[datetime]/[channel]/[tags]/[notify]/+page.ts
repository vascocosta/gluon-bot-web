export function load({ params }) {
    const category = params.category;
    const name = params.name;
    const description = params.description;
    const datetime = params.datetime;
    const channel = params.channel;
    const tags = params.tags;
    const notify = params.notify;

    return {
        category,
        name,
        description,
        datetime,
        channel,
        tags,
        notify
    };
}