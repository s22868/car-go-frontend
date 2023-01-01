/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccessToken } from '../models/AccessToken';
import type { CarOfferReq } from '../models/CarOfferReq';
import type { CarOfferRes } from '../models/CarOfferRes';
import type { UserCredentials } from '../models/UserCredentials';
import type { UserInfo } from '../models/UserInfo';
import type { UserProfile } from '../models/UserProfile';
import type { VerificationToken } from '../models/VerificationToken';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Register User
     * Register new account with email & password
     * @param requestBody Email & plaintext password
     * @returns VerificationToken Successfully sent verification link to user, responds with token
     * @throws ApiError
     */
    public static registerUser(
requestBody?: UserCredentials,
): CancelablePromise<VerificationToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Get User Info
     * Get basic info about registered user
     * @param authorization Bearer eY..
     * @returns UserInfo 
     * @throws ApiError
     */
    public static getUser(
authorization: string,
): CancelablePromise<UserInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Verify user's email
     * Verify user's email
     * @param code verification code from email
     * @param authorization Bearer eY..
     * @returns void 
     * @throws ApiError
     */
    public static verifyEmail(
code: string,
authorization: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/register/verify',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'code': code,
            },
            errors: {
                401: `Failed to verify`,
                403: `Forbidden`,
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
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Update user profile
     * @param authorization Bearer token
     * @param requestBody 
     * @returns any Successfully updated profile
     * @throws ApiError
     */
    public static postUserProfile(
authorization: string,
requestBody?: UserProfile,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/profile',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Add car offer
     * Add car offer
     * @param authorization Bearer token
     * @param requestBody 
     * @returns any Created
     * @throws ApiError
     */
    public static postOffersAdd(
authorization: string,
requestBody?: CarOfferReq,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/offers',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

    /**
     * List available cars
     * List available cars with their info - this is a public endpoint
     * @param from from datetime utc
     * @param to to datetime utc
     * @param city city name
     * @param features comma separated 'list' of features
     * @returns CarOfferRes OK
     * @throws ApiError
     */
    public static getOffers(
from?: string,
to?: string,
city?: string,
features?: string,
): CancelablePromise<Array<CarOfferRes>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/offers',
            query: {
                'from': from,
                'to': to,
                'city': city,
                'features': features,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

}
