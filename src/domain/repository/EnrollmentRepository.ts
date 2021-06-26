import Classroom from "../entities/classroom/Classroom";
import Level from "../entities/level/Level";
import Module from "../entities/module/Module";
import Student from "../entities/Student/Student";
import Enrollment from "../entities/enrollment/Enrollment";

export default interface EnrollmentRepository{
    getEnrollment(code: string): Enrollment;
    addEnrollment(enrollment: Enrollment): void;
    updateEnrollment(enrollment: Enrollment): void;
}