import { AsyncLocalStorage } from "async_hooks";

import { UserJwtPayload } from "../types/auth-request";

type RequestStore = {
    currentUser?: UserJwtPayload;
};

const asyncLocalStorage = new AsyncLocalStorage<RequestStore>();

export class RequestContext {

    static run(
        callback: () => void
    ) {
        asyncLocalStorage.run({}, callback);
    }

    static setCurrentUser(
        user: UserJwtPayload
    ) {
        const store = asyncLocalStorage.getStore();

        if (store) {
            store.currentUser = user;
        }
    }

    static getCurrentUser() {
        return asyncLocalStorage.getStore()?.currentUser;
    }

}