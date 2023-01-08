/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Feature } from './Feature';
import type { FuelType } from './FuelType';

export type CarOfferReq = {
    make: string;
    model: string;
    year: string;
    price_per_day: number;
    horsepower: string;
    fuel_type: FuelType;
    features: Array<Feature>;
    seats_amount: string;
    city: string;
    point?: {
lat: string;
lon: string;
};
};
