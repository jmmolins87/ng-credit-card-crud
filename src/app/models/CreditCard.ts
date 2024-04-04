

export class CreditCard {

    id?: string;
    titular: string;
    numCard: string;
    expirateDate: string;
    cvv: number;
    createDate?: Date;
    updateDate: Date;

    constructor( titular: string, numCard: string, expirateDate: string, cvv: number ) {

        this.titular = titular;
        this.numCard = numCard;
        this.expirateDate = expirateDate;
        this.cvv = cvv;
        this.createDate = new Date();
        this.updateDate = new Date();
    }
}