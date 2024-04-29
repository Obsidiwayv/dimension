import type { AxiosResponse } from "axios";

export default class RequestBase<T> {
    constructor(public url: string, secure: boolean = true) {
        this.url = `${secure ? "https" : "http"}://${url}`;
    }

    public handle(response: AxiosResponse<T>): T {
        return {} as object as T;
    }
}