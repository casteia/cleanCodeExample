import Installment from "../entities/Installments/Installment";

export default interface InstallmentRepository{
    getInstallment(enrollmentCode: string, month: number, year: number): Installment;
    addInstallment(installment: Installment): void;
    getInstallmentsByEnrollmentCode(enrollmentCode: string): Installment[];
    updateInstallment(installment: Installment): void;
}