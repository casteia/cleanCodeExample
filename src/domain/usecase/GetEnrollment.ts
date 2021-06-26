import Enrollment from "../entities/enrollment/Enrollment";
import EnrollmentDTO from "../entities/enrollment/EnrollmentDTO";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import InstallmentRepository from "../repository/InstallmentRepository";
import RepositoryAbstractFactory from "../repository/RepositoryAbstractFactory";


export default class GetEnrollment{

    enrollmentRepository: EnrollmentRepository;
    installmentRepository: InstallmentRepository;
    repository: RepositoryAbstractFactory;

    constructor(repository: RepositoryAbstractFactory){
        this.repository = repository;
        this.enrollmentRepository = this.repository.getEnrollmentRepository();
        this.installmentRepository = this.repository.getInstallmentRepository();
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