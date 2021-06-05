import Student from "../models/Student/Student";
import * as ErrorMessages from "../aula-um/ErrorMessages.Util";
import Cpf from "../models/cpf/Cpf";
import Enrollment from "../models/enrollment/Enrollment";
import InMemoryDatabaseDummy from "../tests/InMemoryDatabase.dummy";
import Level from "../models/level/Level";
import Module from "../models/module/Module";
import Class from "../models/class/Class";

export default class EnrollStudents{
    enrollments: Enrollment[] = [];
    inMemoryDatabase: InMemoryDatabaseDummy;

    constructor(){
        this.inMemoryDatabase = new InMemoryDatabaseDummy();
    }

    public execute(student: Student, level: string, module: string, enrollmentClass: string): Enrollment{
        this.validateStudent(student, level, module, enrollmentClass);
        //TODO: mover pra cima, moduar parametro pra enrollment apenas
        const enrollment = new Enrollment(
            student
            , this.findLevelByCode(level)
            , this.findModuleByCode(module, level)
            , this.findClassByCode(enrollmentClass));
        this.enrollments.push(enrollment);
        return enrollment;
    }

    private validateStudent(student: Student, level: string, module: string, enrollmentClass: string){
        this.validateIfStudentAlreadyEnrolled(student.cpf);
        this.validateIfStudentHasMinimumAge(student, level, module);
        this.validateIfClassHasCapacity(enrollmentClass);
    }

    private validateIfStudentAlreadyEnrolled(cpf: Cpf){
        if(this.enrollments.find(x => x.student.cpf.value === cpf.value)) throw new Error(ErrorMessages.studentAlreadyEnrolled);
    }

    private validateIfStudentHasMinimumAge(student: Student, levelCode: string, moduleCode: string){
        const module = this.findModuleByCode(moduleCode, levelCode);
        if(student.getCurrentAge() < module.minumumAge) throw new Error(ErrorMessages.studentBelowMinimumAge);
    }

    private validateIfClassHasCapacity(enrollmentClassCode: string){
        const currentStudentsEnrolled = this.enrollments.filter(x => x.class.code === enrollmentClassCode).length;
        const enrollmenClass = this.findClassByCode(enrollmentClassCode);
        if(currentStudentsEnrolled >= enrollmenClass.capacity) throw new Error(ErrorMessages.classOverCapacity);
    }

    
    private findModuleByCode(moduleCode: string, levelCode: string): Module{
        return this.inMemoryDatabase.modules.find(x => x.code === moduleCode && x.level?.code === levelCode) as Module;
    }
    
    private findClassByCode(classCode: string): Class{
        const data = this.inMemoryDatabase.classes.find(x => x.code === classCode) as Class
        return data;
    }
    
    private findLevelByCode(code: string): Level{
        return this.inMemoryDatabase.levels.find(x => x.code === code) as Level;
    }
}