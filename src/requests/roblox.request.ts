import RequestBase from "@quartz/handlers/request.base"
import robloxEndpoints from "./roblox.endpoints"
import type { AxiosResponse } from "axios";
import type { RobloxError, RobloxErrorObject } from "./roblox.types";

export class RobloxRequest<T> extends RequestBase<T> {
    constructor(endpoint: string) {
        super(`${robloxEndpoints.USERS}${endpoint}`);
    }

    public isError(e: any): e is RobloxErrorObject {
        return !!e.errors;
    }

    public getMessageError(rError: RobloxError[]) {
        return rError[0];
    }

    public handle(response: AxiosResponse<any, any>) {
        if (this.isError(response.data)) {
            return this.getMessageError(response.data.errors).message;
        }

        return response.data.data;
    }
}