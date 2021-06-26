import ClassroomRepository from "../repository/ClassroomRepository";
import ClassroomRepositoryInMemory from "../../implementation/memory/Classroom/ClassroomRepositoryInMemory";
import Enrollment from "../entities/enrollment/Enrollment";
import EnrollmentDTO from "../entities/enrollment/EnrollmentDTO";
import LevelRepository from "../repository/LevelRepository";
import LevelRepositoryInMemory from "../../implementation/memory/Level/LevelRepositoryInMemory";
import ModuleRepository from "../repository/ModuleRepository";
import ModuleRepositoryInMemory from "../../implementation/memory/Module/ModuleRepositoryInMemory";
import generateDummyStudent from "../../tests/Student.dummy";
import * as ErrorMessages from "../error-messages/ErrorMessages.Util";
import EnrollStudents from "./EnrollStudent";


let classRepository: ClassroomRepository;
let moduleRepository: ModuleRepository;
let levelRepository: LevelRepository;

let enrollStudent: EnrollStudents;

describe("When enrolling student", () => {
    beforeEach(() => {
        Enrollment.totalCount = 0;
        classRepository = new ClassroomRepositoryInMemory();
        moduleRepository = new ModuleRepositoryInMemory();
        levelRepository = new LevelRepositoryInMemory();
        enrollStudent = new EnrollStudents(classRepository, moduleRepository, levelRepository);
        setupData();
    })
    
    test("Should not enroll duplicated student", function(){
        const enrollmentDto = generateEnrollmentDTO("Ana Paula", "83208151934", "1990-01-01", "EM", "1", "A", 12);
        enrollStudent.execute(enrollmentDto);
        expect(() => enrollStudent.execute(enrollmentDto)).toThrow(new Error(ErrorMessages.studentAlreadyEnrolled));
    });
    
    test("Should generate enrollment code", function(){
        const enrollmentDto = generateEnrollmentDTO("Ana Paula", "83208151934", "1990-01-01", "EM", "1", "A", 12);
        const enrollment = enrollStudent.execute(enrollmentDto);
        expect(enrollment.code).toBe("2021EM1A0001");
    });

    test("Should enroll below minimum age", function(){
        const enrollmentDto = generateEnrollmentDTO("Maria Carolina Fonseca", "755.525.774-26", "2012-03-12", "EM", "1", "A", 12);
        expect(() => enrollStudent.execute(enrollmentDto)).toThrow(new Error(ErrorMessages.studentBelowMinimumAge));
    });

    test("Should not enroll student over class capacity", function(){
        for (let index = 0; index < 10; index++) {
            const student = generateDummyStudent(index);
            const enrollmentDto = generateEnrollmentDTO(student.studentName, student.studentCpf, student.studentBirthDate, "EM", "1", "A", 12);
            const enrollment = enrollStudent.execute(enrollmentDto);
        }
        const enrollmentDto = generateEnrollmentDTO("Maria Carolina Fonseca", "755.525.774-26", "2002-03-12", "EM", "1", "A", 12);
        expect(() => enrollStudent.execute(enrollmentDto)).toThrow(new Error(ErrorMessages.classOverCapacity));
    });

    test("Should not enroll after que end of the class", function() {
        const enrollmentDto = generateEnrollmentDTO("Maria Carolina Fonseca", "755.525.774-26", "2002-03-12", "EM", "1", "B", 12);
        expect(() => enrollStudent.execute(enrollmentDto)).toThrow(new Error(ErrorMessages.classAlreadyOver));
    });

    test("Should not enroll after 25% of the start of the class", function() {
        const enrollmentDto = generateEnrollmentDTO("Maria Carolina Fonseca", "755.525.774-26", "2002-03-12", "EM", "1", "C", 12);
        expect(() => enrollStudent.execute(enrollmentDto)).toThrow(new Error(ErrorMessages.lateEnrollment));
    });

    test("Should generate the invoices based on the number of installments, rounding each amount and applying the rest in the last invoice", function() {
        const enrollmentDto = generateEnrollmentDTO("Maria Carolina Fonseca", "755.525.774-26", "2002-03-12", "EM", "1", "A", 12);
        const expectedInstallmentValues = [1416.66, 1416.66, 1416.66, 1416.66, 1416.66, 1416.66, 1416.66, 1416.66, 1416.66, 1416.66, 1416.66, 1416.74]
        let enrollment = enrollStudent.execute(enrollmentDto);
        expectedInstallmentValues.forEach((calculatedInstallment, index) => {
            expect(enrollment.installments[index].amount).toBe(expectedInstallmentValues[index]);
        });
    });

    test("Should get enrollment by code with invoice balance", function() {
        const enrollmentDto = generateEnrollmentDTO("Maria Carolina Fonseca", "755.525.774-26", "2002-03-12", "EM", "1", "C", 12);
        expect(() => enrollStudent.execute(enrollmentDto)).toThrow(new Error(ErrorMessages.lateEnrollment));
    });

    test("Should calculate due date and return status open or overdue for each invoice", () =>{
        const enrollmentDto = generateEnrollmentDTO("Maria Carolina Fonseca", "755.525.774-26", "2002-03-12", "EM", "1", "A", 12);
        let enrollment = enrollStudent.execute(enrollmentDto);
        for (let index = 0; index < enrollment.installments.length; index++) {
            const element = enrollment.installments[index];
            expect(element.dueDate.getMonth()).toBe(index);
        }
    });

});

function generateEnrollmentDTO(studentName: string, studentCpf: string, studentBirthDate: string, level: string, module: string, classroom: string, installments: number){
    return {
        studentName: studentName,
        studentCpf: studentCpf,
        studentBirthDate: studentBirthDate,
        level: level,
        module: module,
        classroom: classroom,
        installments: installments
    } as EnrollmentDTO;
}

function setupData(){
    setupClassroomData();
    setupModuleData();
    setupLevelData();
}

function setupClassroomData(){
    classRepository.addClass("EM", "3", "A", 10, "2021-06-01", "2021-12-15");
    classRepository.addClass("EM", "3", "B", 5, "2021-05-01", "2021-05-30");
    classRepository.addClass("EM", "3", "C", 5, "2021-05-01", "2021-06-30");
}

function setupModuleData(){
    moduleRepository.addModule("EF1", "1", "1o Ano", 6, 15000);
    moduleRepository.addModule("EF1", "2", "2o Ano", 7, 15000);
    moduleRepository.addModule("EF1", "3", "3o Ano", 8, 15000);
    moduleRepository.addModule("EF1", "4", "4o Ano", 9, 15000);
    moduleRepository.addModule("EF1", "5", "5o Ano", 10, 15000);
    moduleRepository.addModule("EF2", "6", "6o Ano", 11, 14000);
    moduleRepository.addModule("EF2", "7", "7o Ano", 12, 14000);
    moduleRepository.addModule("EF2", "8", "8o Ano", 13, 14000);
    moduleRepository.addModule("EF2", "9", "9o Ano", 14, 14000);
    moduleRepository.addModule("EM", "1", "1o Ano", 15, 17000);
    moduleRepository.addModule("EM", "2", "2o Ano", 16, 17000);
    moduleRepository.addModule("EM", "3", "3o Ano", 17, 17000);
}

function setupLevelData(){
    levelRepository.addLevel("EF1", "Ensino Fundamental I");
    levelRepository.addLevel("EF2", "Ensino Fundamental II");
    levelRepository.addLevel("EM", "Ensino Médio");
}