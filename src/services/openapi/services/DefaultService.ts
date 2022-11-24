/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccessToken } from '../models/AccessToken';
import type { UserCredentials } from '../models/UserCredentials';
import type { UserInfo } from '../models/UserInfo';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Register User
     * Register new account with email & password
     * @param requestBody Email & plaintext password
     * @returns any Successfully sent verifcation link to user
     * @throws ApiError
     */
    public static registerUser(
requestBody?: UserCredentials,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Error response schema`,
            },
        });
    }

    /**
     * Get User Info
     * Get basic info about registered user
     * @returns UserInfo 
     * @throws ApiError
     */
    public static getUser(): CancelablePromise<UserInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user',
            errors: {
                401: `Error response schema`,
            },
        });
    }

    /**
     * Verify user's email
     * Verify user's email
     * @param secret secret sent in email
     * @returns void 
     * @throws ApiError
     */
    public static verifyEmail(
secret?: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/register/verify',
            query: {
                'secret': secret,
            },
            errors: {
                401: `Failed to verify`,
            },
        });
    }

    /**
     * User login
     * Login by user's credentials
     * @param requestBody 
     * @returns AccessToken Successful authentication, responds with accessToken
     * @throws ApiError
     */
    public static login(
requestBody?: UserCredentials,
): CancelablePromise<AccessToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Error response schema`,
            },
        });
    }

}
