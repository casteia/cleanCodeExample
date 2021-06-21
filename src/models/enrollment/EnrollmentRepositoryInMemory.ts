import Classroom from "../classroom/Class";
import Level from "../level/Level";
import Module from "../module/Module";
import Student from "../Student/Student";
import Enrollment from "./Enrollment";
import EnrollmentRepository from "./EnrollmentRepository";

export default class EnrollmentRepositoryInMemory implements EnrollmentRepository{
    enrollments: Enrollment[] = [];

    constructor(){}

    getEnrollment(code: string): Enrollment {
        let data = this.enrollments.find(x => x.code === code) as Enrollment;
        return data;
    }

    addEnrollment(enrollment: Enrollment): void{
        this.enrollments.push(enrollment);
    }

    updateEnrollment(enrollment: Enrollment): void{
        let currentEnrollmentIndex = this.enrollments.findIndex(x => x.code === enrollment.code);
        if(currentEnrollmentIndex === -1) throw new Error("Enrollment not found");
        this.enrollments[currentEnrollmentIndex] = enrollment;
    }

}