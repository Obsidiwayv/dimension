export type RobloxUserQuery = {
    previousPageCursor: string
    nextPageCursor: string,
    data: Array<UserSearchResponse>;
}

export type UserSearchResponse = {
    previousUsernames: string[];
    hasVerifiedBadge: boolean;
    id: number;
    name: string;
    displayName: string;
}

export type RobloxError = {
    code: number;
    message: string;
    userFacingMessage: string;
}

export type RobloxErrorObject = {
    errors: Array<RobloxError>;
}