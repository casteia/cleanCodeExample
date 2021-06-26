
import EnrollmentDTO from "../entities/enrollment/EnrollmentDTO";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import { InstallmentStatus } from "../entities/Installments/Installment";
import InstallmentDTO from "../entities/Installments/InstallmentDTO";
import InstallmentRepository from "../repository/InstallmentRepository";
import GetEnrollment from "./GetEnrollment";

export default class PayInvoice{

    installmentRepository: InstallmentRepository;
    enrollmentRepository: EnrollmentRepository;
    getEnrollment: GetEnrollment;

    constructor(installmentRepository: InstallmentRepository, enrollmentRepository: EnrollmentRepository){
        this.installmentRepository = installmentRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.getEnrollment = new GetEnrollment(enrollmentRepository, installmentRepository);
    }

    public execute(installmentDTO: InstallmentDTO): number{
        let installment = this.installmentRepository.getInstallment(installmentDTO.code, installmentDTO.month, installmentDTO.year);
        let amountLeft = installment.payAmount(installmentDTO.amount, installmentDTO.date);
        if(amountLeft >= 0) installment.status = InstallmentStatus.Paid;
        return this.getEnrollment.getEnrollment({code: installmentDTO.code} as EnrollmentDTO).getBalance(installmentDTO.date);
    }
}