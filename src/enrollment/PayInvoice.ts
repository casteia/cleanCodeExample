import EnrollmentDTO from "../models/enrollment/EnrollmentDTO";
import EnrollmentRepository from "../models/enrollment/EnrollmentRepository";
import Installment, { InstallmentStatus } from "../models/Installments/Installment";
import InstallmentDTO from "../models/Installments/InstallmentDTO";
import InstallmentRepository from "../models/Installments/InstallmentRepository";
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
        let amountLeft = installmentDTO.amount - installment.amount;
        if(amountLeft >= 0) installment.status = InstallmentStatus.Paid;
        return this.getEnrollment.getEnrollment({code: installmentDTO.code} as EnrollmentDTO).getBalance();
    }
}