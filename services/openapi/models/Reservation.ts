/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * car reservation
 */
export type Reservation = {
    /**
     * from date
     */
    from: string;
    /**
     * to date
     */
    to: string;
    renter_id: string;
    total_price: number;
    model: string;
    make: string;
};
