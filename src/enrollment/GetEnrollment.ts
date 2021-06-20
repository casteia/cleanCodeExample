import Enrollment from "../models/enrollment/Enrollment";
import EnrollmentDTO from "../models/enrollment/EnrollmentDTO";
import EnrollmentRepository from "../models/enrollment/EnrollmentRepository";
import InstallmentRepository from "../models/Installments/InstallmentRepository";

export default class GetEnrollment{

    enrollmentRepository: EnrollmentRepository;
    installmentRepository: InstallmentRepository;

    constructor(enrollmentRepository: EnrollmentRepository, installmentRepository: InstallmentRepository){
        this.enrollmentRepository = enrollmentRepository;
        this.installmentRepository = installmentRepository;
    }

    public getEnrollment(enrollmentDto: EnrollmentDTO): Enrollment{
        let enrollment = this.enrollmentRepository.getEnrollment(enrollmentDto.code);
        enrollment.installments = this.getEnrollmentInstallments(enrollment.code);
        return enrollment;
    }

    private getEnrollmentInstallments(enrollmentCode: string){
        return this.installmentRepository.getInstallmentsByEnrollmentCode(enrollmentCode);
    }
}