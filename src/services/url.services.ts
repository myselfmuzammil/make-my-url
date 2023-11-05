import { Types } from "mongoose";

export function urlShortService(id: Types.ObjectId) {
    if(!id) return id;

    const { PROTOCOL, HOST_NAME, PORT } = process.env;
    return `${PROTOCOL}://${HOST_NAME}:${PORT}/${id}`;
}