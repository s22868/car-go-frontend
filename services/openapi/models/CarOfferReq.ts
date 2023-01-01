/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Feature } from './Feature';

export type CarOfferReq = {
    make: string;
    model: string;
    year: string;
    price_per_day: number;
    horsepower: string;
    fuel_type: string;
    features: Array<Feature>;
    seats_amount: string;
    city: string;
    point?: {
lat: string;
lon: string;
};
};
