export default class InstallmentEvent{
    enrollmentCode: string;
    month: number;
    year: number;
    amount: number;
    type: InstallmentEventType;

    constructor(amount: number, type: InstallmentEventType, enrollmentCode: string, month: number, year: number){
        this.amount = amount;
        this.type = type;
        this.enrollmentCode = enrollmentCode;
        this.month = month;
        this.year = year;
    }
}

export enum InstallmentEventType{
    Credit, Debt
}