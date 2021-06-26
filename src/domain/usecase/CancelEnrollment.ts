import EnrollmentDTO from "../entities/enrollment/EnrollmentDTO";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import { EnrollmentStatus } from "../entities/enrollment/EnrollmentStatus";
import * as ErrorMessages from "../error-messages/ErrorMessages.Util"

export default class CancelEnrollment{
    enrollmentRepository: EnrollmentRepository;

    constructor(enrollmentRepository: EnrollmentRepository){
        this.enrollmentRepository = enrollmentRepository;
    }

    execute(enrollmentDto: EnrollmentDTO): EnrollmentStatus{
        let enrollment = this.enrollmentRepository.getEnrollment(enrollmentDto.code);
        if(enrollment.status != EnrollmentStatus.Active) throw new Error(ErrorMessages.notAbleToCancelEnrollment);
        enrollment.status = EnrollmentStatus.Cancelled;
        this.enrollmentRepository.updateEnrollment(enrollment);
        return enrollment.status;
    }
}