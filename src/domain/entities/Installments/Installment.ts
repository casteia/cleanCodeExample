import InstallmentEvent, { InstallmentEventType } from "./InstallmentEvent/InstallmentEvent";

export default class Installment{

    readonly millisecondsPerDay = 1000 * 60 * 60 * 24;
    readonly defaultDueDateDay: number = 5;

    amount: number;
    month: number;
    year: number;
    status: number;
    enrollmentCode: string;
    dueDate: Date;
    events: InstallmentEvent[] = [];

    constructor(amount: number, month: number, year: number, enrollmentCode: string){
        this.amount = amount? amount : 0;
        this.events.push(new InstallmentEvent(amount, InstallmentEventType.Debt, enrollmentCode, month, year));
        this.month = month;
        this.year = year;
        this.status = InstallmentStatus.Open;
        this.enrollmentCode = enrollmentCode;
        this.calculateDueDate();
    }

    private calculateDueDate(){
        this.dueDate = new Date(`${this.month}/${this.defaultDueDateDay}/${this.year}`);
    }

    public payAmount(amount: number, paymentDate: string): InstallmentEvent{
        let installmentEvent = new InstallmentEvent(amount, InstallmentEventType.Credit, this.enrollmentCode, this.month, this.year);
        this.events.push(installmentEvent);
        let amountLeft = this.getInstallmentBalance(paymentDate);
        if(amountLeft >= 0) this.status = InstallmentStatus.Paid;
        return installmentEvent;
    }

    public getInstallmentBalance(baseDate: string): number{
        let penaltyAndInterests = this.getPenaltyAndInterests(baseDate);
        if(penaltyAndInterests > 0) this.events.push(new InstallmentEvent(penaltyAndInterests, InstallmentEventType.Debt, this.enrollmentCode, this.month, this.year));
        let balance = this.events.reduce((total, installment) =>{
            if(installment.type === InstallmentEventType.Credit) return total += installment.amount;
            return total -= installment.amount;
        }, 0);
        return balance;
    }

    private getPenaltyAndInterests(baseDate: string): number{
        let getDate = new Date(Date.parse(baseDate));
        let dateDifference = this.calculateDateDiffInDays(getDate, this.dueDate);
        if(dateDifference >= 1) return this.calculatePenaltyAndInterests(dateDifference);
        return 0;
    }

    private calculateDateDiffInDays(firstDate: Date, secondDate: Date) {
        firstDate.setUTCHours(0,0,0,0);
        secondDate.setUTCHours(0,0,0,0);
        return Math.floor((firstDate.getTime() - secondDate.getTime()) / this.millisecondsPerDay);
      }

    private calculatePenaltyAndInterests(differenceInDays: number): number{
        let interestValue = (this.amount / 100) * differenceInDays;
        let total = (this.amount / 10) + interestValue;
        return total;
    }
}

export enum InstallmentStatus {
    Open = 1,
    Paid,
    Cancelled,
    Overdue
};