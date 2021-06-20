export default class Installment{
    amount: number;
    month: number;
    year: number;
    status: number;
    enrollmentCode: string;

    constructor(amount: number, month: number, year: number, enrollmentCode: string){
        this.amount = amount? amount : 0;
        this.month = month;
        this.year = year;
        this.status = InstallmentStatus.Open;
        this.enrollmentCode = enrollmentCode;
    }
}

export enum InstallmentStatus {
    Open = 1,
    Paid,
    Cancelled,
};