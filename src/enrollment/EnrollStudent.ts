import Student from "../models/Student/Student";
import * as ErrorMessages from "../aula-um/ErrorMessages.Util";
import Cpf from "../models/cpf/Cpf";
import Enrollment from "../models/enrollment/Enrollment";
import ClassroomRepository from "../models/classroom/ClassroomRepository";
import Installment from "../models/Installments/Installment";
import CalculateInstallments from "./CalculateInstallments";
import ModuleRepository from "../models/module/ModuleRepository";
import LevelRepository from "../models/level/LevelRepository";
import EnrollmentDTO from "../models/enrollment/EnrollmentDTO";
import Name from "../models/name/Name";

export default class EnrollStudents{
    enrollments: Enrollment[] = [];
    classRepository: ClassroomRepository;
    moduleRepository: ModuleRepository;
    levelRepository: LevelRepository;

    //Use a Facade? AbstractFactory?
    constructor(classRepository: ClassroomRepository, moduleRepository: ModuleRepository, levelRepository: LevelRepository){
        this.classRepository = classRepository;
        this.moduleRepository = moduleRepository;
        this.levelRepository = levelRepository;
    }

    //public execute(student: Student, level: string, module: string, enrollmentClass: string, installments: number): Enrollment{
    //
    public execute(enrollmentDTO: EnrollmentDTO): Enrollment{
        const enrollment = new Enrollment(
            new Student(new Name(enrollmentDTO.studentName), enrollmentDTO.studentCpf, enrollmentDTO.studentBirthDate)
            , this.levelRepository.findLevelByCode(enrollmentDTO.level)
            , this.moduleRepository.findModuleByCode(enrollmentDTO.module, enrollmentDTO.level)
            , this.classRepository.findClassByCode(enrollmentDTO.classroom)
            , enrollmentDTO.installments);
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

    //TODO: build a VO for date range?
    private validateIfClassAlreadyStarted(enrollment: Enrollment){
        //TODO: change date to be a parameter
        let currentDate = new Date();
        let enrollmentTimeDifference = currentDate.getTime() - enrollment.class.start_date.getTime();
        let timeDifferenceInPercentage = (enrollmentTimeDifference / enrollment.class.getTimeDuration()) * 100;
        if(timeDifferenceInPercentage > 25) throw new Error(ErrorMessages.lateEnrollment);
    }

    private calculateInstallments(enrollment: Enrollment): Installment[]{
        return new CalculateInstallments(enrollment).execute();
    }
    
}