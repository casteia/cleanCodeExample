import Installment from "./Installment";
import InstallmentRepository from "./InstallmentRepository";

export default class InstallmentRepositoryInMemory implements InstallmentRepository{

    installments: Installment[] = [];

    getInstallment(enrollmentCode: string, month: number, year: number): Installment {
        return this.installments.find(x => x.enrollmentCode === enrollmentCode && x.month === month && x.year === year) as Installment;
    }

    addInstallment(installment: Installment): void{
        this.installments.push(installment);
    }

    getInstallmentsByEnrollmentCode(enrollmentCode: string): Installment[]{
        return this.installments.filter(x => x.enrollmentCode === enrollmentCode);
    }

    updateInstallment(installment: Installment): void{
        let currentInstallmentIndex = this.installments.findIndex(x => x.enrollmentCode === installment.enrollmentCode && x.month === installment.month && x.year === installment.year);
        if(currentInstallmentIndex === -1) throw new Error("Installment not found");
        this.installments[currentInstallmentIndex] = installment;
    }

}