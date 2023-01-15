/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ReservationDecision = {
    decision: ReservationDecision.decision;
};

export namespace ReservationDecision {

    export enum decision {
        ACCEPT = 'accept',
        DENY = 'deny',
    }


}
