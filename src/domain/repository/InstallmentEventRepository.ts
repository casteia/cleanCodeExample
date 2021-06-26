import InstallmentEvent from "../entities/Installments/InstallmentEvent/InstallmentEvent";

export default interface InstallmentEventRepository{
    getEvents(enrollmentCode: string, month: number, year: number): InstallmentEvent[]
    addEvent(installmentEvent: InstallmentEvent): void;
}