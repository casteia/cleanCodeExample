import Classroom from "../classroom/Class";
import Level from "../level/Level";
import Module from "../module/Module";
import Student from "../Student/Student";
import Enrollment from "./Enrollment";

export default interface EnrollmentRepository{
    getEnrollment(code: string): Enrollment;
    addEnrollment(enrollment: Enrollment): void;
    updateEnrollment(enrollment: Enrollment): void;
}