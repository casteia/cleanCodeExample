import Enrollment from "../entities/enrollment/Enrollment";
import EnrollmentDTO from "../entities/enrollment/EnrollmentDTO";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import InstallmentRepository from "../repository/InstallmentRepository";


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
        let installments = this.installmentRepository.getInstallmentsByEnrollmentCode(enrollmentCode);

        return installments;
    }
}