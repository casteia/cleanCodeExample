import Classroom from "../classroom/Classroom";
import Installment, { InstallmentStatus } from "../Installments/Installment";
import Level from "../level/Level";
import Module from "../module/Module";
import Student from "../Student/Student";
import { EnrollmentStatus } from "./EnrollmentStatus";

export default class Enrollment{
    static totalCount = 0;
    id: string;
    student: Student;
    level: Level;
    module: Module;
    class: Classroom;
    code: string;
    numberOfInstallments: number;
    installments: Installment[];
    status: EnrollmentStatus;

    constructor(student: Student, level: Level, module: Module, enrollmentClass: Classroom, numberOfInstallments: number){
        this.assignUniqueEnrollmentId();
        this.student = student;
        this.level = level;
        this.module = module;
        this.class = enrollmentClass;
        this.code = this.generateEnrollmentCode(level, module, enrollmentClass, this.id);
        this.numberOfInstallments = numberOfInstallments;
        this.status = EnrollmentStatus.Active;
    }
    
    private assignUniqueEnrollmentId(){
        Enrollment.totalCount++;
        this.id = `${Enrollment.totalCount}`.padStart(4, '0');
    }

    //TODO: change date so it comes as parameter, to facilidade tests. Maybe use a VO?
    private generateEnrollmentCode(level: Level, module: Module, enrollmentClass: Classroom, id: string): string{
        const currentYear = new Date().getFullYear();
        const code = `${currentYear}${level.code}${module.code}${enrollmentClass.code}${id}`;
        return code;
    }

    getBalance(baseDate: string): number{
        return this.installments.reduce((total, invoice) => {
            total += invoice.getInstallmentBalance(baseDate);
            return total;
        }, 0);
    }
}