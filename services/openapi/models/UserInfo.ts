/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Protected info about user
 */
export type UserInfo = {
    id: string;
    email: string;
    is_verified: boolean;
    first_name?: string;
    last_name?: string;
    driving_licence?: string;
    phone?: string;
    balance: number;
    dob?: string;
};
