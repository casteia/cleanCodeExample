import Classroom from "../models/classroom/Class";
import Enrollment from "../models/enrollment/Enrollment";
import EnrollmentDTO from "../models/enrollment/EnrollmentDTO";
import EnrollmentRepository from "../models/enrollment/EnrollmentRepository";
import EnrollmentRepositoryInMemory from "../models/enrollment/EnrollmentRepositoryInMemory";
import Installment from "../models/Installments/Installment";
import InstallmentRepository from "../models/Installments/InstallmentRepository";
import InstallmentRepositoryInMemory from "../models/Installments/InstallmentRepositoryInMemory";
import Level from "../models/level/Level";
import Module from "../models/module/Module";
import Name from "../models/name/Name";
import Student from "../models/Student/Student";
import GetEnrollment from "./GetEnrollment";

let enrollmentRepository: EnrollmentRepository;
let installmentRepository: InstallmentRepository;
let student: Student;
let level: Level;
let enrollmentModule: Module;
let classroom: Classroom;

describe("When getting Enrollment", () => {

    beforeEach(() => {
        enrollmentRepository = new EnrollmentRepositoryInMemory();
        installmentRepository = new InstallmentRepositoryInMemory();
        Enrollment.totalCount = 0;
        setupTestData();
    })

    test("Should get enrollment by code with invoice balance", () => {
        let enrollment = new Enrollment(student, level, enrollmentModule, classroom, 12);
        generateDummyInstallments();
        enrollmentRepository.addEnrollment(enrollment);
        const calculatedBalance = new GetEnrollment(enrollmentRepository, installmentRepository).getEnrollment({code: "2021EM3A0001"} as EnrollmentDTO).getBalance('2021-01-01');
        expect(calculatedBalance).toBe(-3000);
    });

    test("Should get enrollment by code with invoice balance", () => {
        let enrollment = new Enrollment(student, level, enrollmentModule, classroom, 12);
        generateDummyInstallments();
        enrollmentRepository.addEnrollment(enrollment);
        const calculatedBalance = new GetEnrollment(enrollmentRepository, installmentRepository).getEnrollment({code: "2021EM3A0001"} as EnrollmentDTO).getBalance('2021-01-06');
        expect(calculatedBalance).toBe(-3110);
    });

});

function setupTestData(){
    student = new Student(new Name("Ana Paula"), "83208151934", '1990-01-01');
    level = new Level("EM", "Ensino Médio");
    enrollmentModule = new Module("EM", "3", "3o Ano", 17, 17000);
    classroom = new Classroom("EM", "3", "A", 10, new Date(Date.parse("2021-06-01")), new Date(Date.parse("2021-12-15")));
}

function generateDummyInstallments(): void{
    installmentRepository.addInstallment(new Installment(1000, 1, 2021, "2021EM3A0001"));
    installmentRepository.addInstallment(new Installment(1000, 2, 2021, "2021EM3A0001"));
    installmentRepository.addInstallment(new Installment(1000, 3, 2021, "2021EM3A0001"));
}