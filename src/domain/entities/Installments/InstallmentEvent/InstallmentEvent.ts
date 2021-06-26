export default class InstallmentEvent{
    amount: number;
    type: InstallmentEventType;

    constructor(amount: number, type: InstallmentEventType){
        this.amount = amount;
        this.type = type;
    }
}

export enum InstallmentEventType{
    Credit, Debt
}