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
    installmentEvents: InstallmentEvent[] = [];

    constructor(amount: number, month: number, year: number, enrollmentCode: string){
        this.amount = amount? amount : 0;
        this.installmentEvents.push(new InstallmentEvent(amount, InstallmentEventType.Debt));
        this.month = month;
        this.year = year;
        this.status = InstallmentStatus.Open;
        this.enrollmentCode = enrollmentCode;
        this.calculateDueDate();
    }

    private calculateDueDate(){
        this.dueDate = new Date(`${this.month}/${this.defaultDueDateDay}/${this.year}`);
    }

    public payAmount(amount: number, paymentDate: string): number{
        let installmentEvent = new InstallmentEvent(amount, InstallmentEventType.Credit);
        this.installmentEvents.push(installmentEvent);
        return this.getInstallmentBalance(paymentDate);
    }

    public getInstallmentBalance(baseDate: string): number{
        let penaltyAndInterests = this.getPenaltyAndInterests(baseDate);
        if(penaltyAndInterests > 0) this.installmentEvents.push(new InstallmentEvent(penaltyAndInterests, InstallmentEventType.Debt));
        let balance = this.installmentEvents.reduce((total, installment) =>{
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