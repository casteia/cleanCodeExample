import Student from "../models/Student/Student";
import * as ErrorMessages from "../aula-um/ErrorMessages.Util";
import Cpf from "../models/cpf/Cpf";
import Enrollment from "../models/enrollment/Enrollment";
import ClassRepositoryInMemory from "../models/class/ClassRepositoryInMemory";
import ModuleRepository from "../models/module/ModuleRepositoryInMemory";
import LevelRepository from "../models/level/LevelRepositoryInMemory";
import classRepository from "../models/class/ClassRepository";
import LevelRepositoryInMemory from "../models/level/LevelRepositoryInMemory";
import ModuleRepositoryInMemory from "../models/module/ModuleRepositoryInMemory";

export default class EnrollStudents{
    enrollments: Enrollment[] = [];
    classRepository: classRepository;
    moduleRepository: ModuleRepository;
    levelRepository: LevelRepository;

    constructor(){
        this.classRepository = new ClassRepositoryInMemory();
        this.moduleRepository = new ModuleRepositoryInMemory();
        this.levelRepository = new LevelRepositoryInMemory();
    }

    public execute(student: Student, level: string, module: string, enrollmentClass: string): Enrollment{
        this.validateStudent(student, level, module, enrollmentClass);
        //TODO: mover pra cima, moduar parametro pra enrollment apenas
        const enrollment = new Enrollment(
            student
            , this.levelRepository.findLevelByCode(level)
            , this.moduleRepository.findModuleByCode(module, level)
            , this.classRepository.findClassByCode(enrollmentClass));
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
        const module = this.moduleRepository.findModuleByCode(moduleCode, levelCode);
        if(student.getCurrentAge() < module.minumumAge) throw new Error(ErrorMessages.studentBelowMinimumAge);
    }

    private validateIfClassHasCapacity(enrollmentClassCode: string){
        const currentStudentsEnrolled = this.enrollments.filter(x => x.class.code === enrollmentClassCode).length;
        const enrollmenClass = this.classRepository.findClassByCode(enrollmentClassCode);
        if(currentStudentsEnrolled >= enrollmenClass.capacity) throw new Error(ErrorMessages.classOverCapacity);
    }
    
}