import Class from "../class/Class";
import Level from "../level/Level";
import Module from "../module/Module";
import Student from "../Student/Student";

export default class Enrollment{
    static totalCount = 0;
    id: string;
    student: Student;
    level: Level;
    module: Module;
    class: Class;
    code: string;

    constructor(student: Student, level: Level, module: Module, enrollmentClass: Class){
        this.assignUniqueEnrollmentId();
        this.student = student;
        this.level = level;
        this.module = module;
        this.class = enrollmentClass;
        this.code = this.generateEnrollmentCode(level, module, enrollmentClass, this.id);
    }
    
    private assignUniqueEnrollmentId(){
        Enrollment.totalCount++;
        this.id = `${Enrollment.totalCount}`.padStart(4, '0');
    }

    private generateEnrollmentCode(level: Level, module: Module, enrollmentClass: Class, id: string): string{
        const currentYear = new Date().getFullYear();
        const code = `${currentYear}${level.code}${module.code}${enrollmentClass.code}${id}`;
        return code;
    }
}