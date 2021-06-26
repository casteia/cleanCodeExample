
import EnrollmentDTO from "../entities/enrollment/EnrollmentDTO";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import { InstallmentStatus } from "../entities/Installments/Installment";
import InstallmentDTO from "../entities/Installments/InstallmentDTO";
import InstallmentRepository from "../repository/InstallmentRepository";
import GetEnrollment from "./GetEnrollment";
import RepositoryAbstractFactory from "../repository/RepositoryAbstractFactory";
import InstallmentEventRepository from "../repository/InstallmentEventRepository";

export default class PayInvoice{

    installmentRepository: InstallmentRepository;
    installmentEventRepository: InstallmentEventRepository;
    enrollmentRepository: EnrollmentRepository;
    getEnrollment: GetEnrollment;
    repository: RepositoryAbstractFactory;

    constructor(repository: RepositoryAbstractFactory){
        this.repository = repository;
        this.installmentRepository = this.repository.getInstallmentRepository();
        this.enrollmentRepository = this.repository.getEnrollmentRepository();
        this.installmentEventRepository = this.repository.getInstallmentEventRepository();
        this.getEnrollment = new GetEnrollment(this.repository);
    }

    public execute(installmentDTO: InstallmentDTO): number{
        let installment = this.installmentRepository.getInstallment(installmentDTO.code, installmentDTO.month, installmentDTO.year);
        let paymentEvent = installment.payAmount(installmentDTO.amount, installmentDTO.date);
        this.installmentRepository.updateInstallment(installment);
        this.installmentEventRepository.addEvent(paymentEvent);
        return this.getEnrollment.getEnrollment({code: installmentDTO.code} as EnrollmentDTO).getBalance(installmentDTO.date);
    }
}