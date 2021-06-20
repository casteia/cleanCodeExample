import Enrollment from "../models/enrollment/Enrollment";
import EnrollmentRepository from "../models/enrollment/EnrollmentRepository";
import { EnrollmentStatus } from "../models/enrollment/EnrollmentStatus";
import InstallmentRepository from "../models/Installments/InstallmentRepository";
import * as ErrorMessages from "../aula-um/ErrorMessages.Util";
import EnrollmentDTO from "../models/enrollment/EnrollmentDTO";

export default class CancelEnrollment{
    enrollmentRepository: EnrollmentRepository;
    //installmentRepository: InstallmentRepository;

    constructor(enrollmentRepository: EnrollmentRepository){
        this.enrollmentRepository = enrollmentRepository;
        //this.installmentRepository = installmentRepository;
    }

    execute(enrollmentDto: EnrollmentDTO): EnrollmentStatus{
        let enrollment = this.enrollmentRepository.getEnrollment(enrollmentDto.code);
        if(enrollment.status != EnrollmentStatus.Active) throw new Error(ErrorMessages.notAbleToCancelEnrollment);
        enrollment.status = EnrollmentStatus.Cancelled;
        this.enrollmentRepository.updateEnrollment(enrollment);
        return enrollment.status;
    }
}