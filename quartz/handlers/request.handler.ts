import axios, { type AxiosRequestConfig } from "axios";
import type RequestBase from "./request.base";

export default class RequestHandler {
    public async make<T>(ClassHandler: RequestBase<T>, options: AxiosRequestConfig)  {
        return ClassHandler.handle(await axios<T>({
            url: ClassHandler.url, 
            validateStatus() {
                // Make sure errors are not thrown
                return true;
            },
            ...options 
        }));
    }
}