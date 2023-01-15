/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Insurance } from './Insurance';

export type MakeReservation = {
    from: string;
    to: string;
    insurance: Insurance;
    offer_id: string;
};
