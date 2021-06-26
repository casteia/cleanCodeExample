import InstallmentEvent from "../../domain/entities/Installments/InstallmentEvent/InstallmentEvent";
import InstallmentEventRepository from "../../domain/repository/InstallmentEventRepository";

export default class InstallmentEventRepositoryInMemory implements InstallmentEventRepository{

    private events: InstallmentEvent[];

    constructor(){
        this.events = [];
    }

    getEvents(enrollmentCode: string, month: number, year: number): InstallmentEvent[] {
        let events = this.events.filter(x => x.enrollmentCode === enrollmentCode && x.month === month && x.year == year);
        return events;
    }

    addEvent(installmentEvent: InstallmentEvent): void {
        this.events.push(installmentEvent);
    }

}