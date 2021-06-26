import Installment from "../../domain/entities/Installments/Installment";
import InstallmentEventRepository from "../../domain/repository/InstallmentEventRepository";
import InstallmentRepository from "../../domain/repository/InstallmentRepository";

export default class InstallmentRepositoryInMemory implements InstallmentRepository{

    installmentEventRepository: InstallmentEventRepository;
    installments: Installment[] = [];

    constructor(installmentEventRepository: InstallmentEventRepository){
        this.installmentEventRepository = installmentEventRepository;
    }

    getInstallment(enrollmentCode: string, month: number, year: number): Installment {
        return this.installments.find(x => x.enrollmentCode === enrollmentCode && x.month === month && x.year === year) as Installment;
    }

    addInstallment(installment: Installment): void{
        this.installments.push(installment);
    }

    getInstallmentsByEnrollmentCode(enrollmentCode: string): Installment[]{
        let installmentList = this.installments.filter(x => x.enrollmentCode === enrollmentCode);
        installmentList.forEach(installment => {
            installment.events = this.installmentEventRepository.getEvents(enrollmentCode, installment.month, installment.year);
        });
        return installmentList;
    }

    updateInstallment(installment: Installment): void{
        let currentInstallmentIndex = this.installments.findIndex(x => x.enrollmentCode === installment.enrollmentCode && x.month === installment.month && x.year === installment.year);
        if(currentInstallmentIndex === -1) throw new Error("Installment not found");
        this.installments[currentInstallmentIndex] = installment;
    }

}