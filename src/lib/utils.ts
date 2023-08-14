function statusText(status: number): string {
    switch (status) {
        case 400:
            return "Bad Request";
            break;
        case 401:
            return "Unauthorized";
            break;
        case 402:
            return "Payment Required";
            break;
        case 403:
            return "Forbidden";
            break;
        case 404:
            return "Not Found";
            break;
        case 405:
            return "Method Not Allowed";
            break;
        case 406:
            return "Not Acceptable";
            break;
        case 407:
            return "Proxy Authentication Required";
            break;
        case 408:
            return "Request Timeout";
            break;
        case 409:
            return "Conflict";
            break;
        case 410:
            return "Gone";
            break;
        case 411:
            return "Length Required";
            break;
        case 412:
            return "Precondition Failed";
            break;
        case 413:
            return "Payload Too Large";
            break;
        case 414:
            return "URI Too Long";
            break;
        case 415:
            return "Unsupported Media Type";
            break;
        case 416:
            return "Range Not Satisfiable";
            break;
        case 417:
            return "Expectation Failed";
            break;
        case 418:
            return "I'm a teapot";
            break;
        case 421:
            return "Misdirected Request";
            break;
        case 422:
            return "Unprocessable Content";
            break;
        case 423:
            return "Locked";
            break;
        case 424:
            return "Failed Dependency";
            break;
        case 425:
            return "Too Early";
            break;
        case 426:
            return "Upgrade Required";
            break;
        case 428:
            return "Precondition Required";
            break;
        case 429:
            return "Too Many Requests";
            break;
        case 431:
            return "Request Header Fields Too Large";
            break;
        case 451:
            return "Unavailable For Legal Reasons";
            break;
        default:
            return "Unknown error"
    }
}

export { statusText }