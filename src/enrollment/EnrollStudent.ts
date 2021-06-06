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
import Level from "../models/level/Level";
import Installment from "../models/Installments/Installment";
import CalculateInstallments from "../models/Installments/CalculateInstallments";

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

    public execute(student: Student, level: string, module: string, enrollmentClass: string, installments: number): Enrollment{
        const enrollment = new Enrollment(
            student
            , this.levelRepository.findLevelByCode(level)
            , this.moduleRepository.findModuleByCode(module, level)
            , this.classRepository.findClassByCode(enrollmentClass)
            , installments);
        this.validateStudent(enrollment);
        enrollment.installments = this.calculateInstallments(enrollment);
        this.enrollments.push(enrollment);
        return enrollment;
    }

    private validateStudent(enrollment: Enrollment){
        this.validateIfStudentAlreadyEnrolled(enrollment.student.cpf);
        this.validateIfStudentHasMinimumAge(enrollment);
        this.validateIfClassHasCapacity(enrollment);
        this.validadeIfClassIsAlreadyOver(enrollment);
        this.validateIfClassAlreadyStarted(enrollment);
    }

    private validateIfStudentAlreadyEnrolled(cpf: Cpf){
        if(this.enrollments.find(x => x.student.cpf.value === cpf.value)) throw new Error(ErrorMessages.studentAlreadyEnrolled);
    }

    private validateIfStudentHasMinimumAge(enrollment: Enrollment){
        const module = this.moduleRepository.findModuleByCode(enrollment.module.code, enrollment.level.code);
        if(enrollment.student.getCurrentAge() < module.minumumAge) throw new Error(ErrorMessages.studentBelowMinimumAge);
    }

    private validateIfClassHasCapacity(enrollment: Enrollment){
        const currentStudentsEnrolled = this.enrollments.filter(x => x.class.code === enrollment.class.code).length;
        const enrollmenClass = this.classRepository.findClassByCode(enrollment.class.code);
        if(currentStudentsEnrolled >= enrollmenClass.capacity) throw new Error(ErrorMessages.classOverCapacity);
    }

    private validadeIfClassIsAlreadyOver(enrollment: Enrollment){
        let isClassAlreadyOver = enrollment.class.end_date < new Date();
        if(isClassAlreadyOver) throw new Error(ErrorMessages.classAlreadyOver);
    }

    private validateIfClassAlreadyStarted(enrollment: Enrollment){
        let currentDate = new Date();
        let enrollmentTimeDifference = currentDate.getTime() - enrollment.class.start_date.getTime();
        let timeDifferenceInPercentage = (enrollmentTimeDifference / enrollment.class.getTimeDuration()) * 100;
        if(timeDifferenceInPercentage > 25) throw new Error(ErrorMessages.lateEnrollment);
    }

    private calculateInstallments(enrollment: Enrollment): Installment[]{
        return new CalculateInstallments(enrollment).execute();
    }
    
}