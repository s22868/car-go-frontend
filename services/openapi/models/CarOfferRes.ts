/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Feature } from './Feature';
import type { ImageUrl } from './ImageUrl';
import type { Point } from './Point';

export type CarOfferRes = {
    id: string;
    owner_id: string;
    make: string;
    model: string;
    year: string;
    price_per_day: number;
    horsepower: string;
    fuel_type: string;
    features: Array<Feature>;
    images: Array<ImageUrl>;
    seats_amount: string;
    point?: Point;
    city: string;
};
