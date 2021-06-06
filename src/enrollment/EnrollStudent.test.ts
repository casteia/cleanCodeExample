import Name from "../models/name/Name";
import Student from "../models/Student/Student"
import EnrollStudents from "./EnrollStudent";
import * as ErrorMessages from "../aula-um/ErrorMessages.Util";
import Cpf from "../models/cpf/Cpf";
import Enrollment from "../models/enrollment/Enrollment";
import generateDummyStudent from "../tests/Student.dummy"
import Installment from "../models/Installments/Installment";

describe("When enrolling student", () => {
    beforeEach(() => {
        Enrollment.totalCount = 0;
    })
    
    test("Should not enroll duplicated student", function(){
        const student = new Student(new Name("Ana Paula"), new Cpf("83208151934"), new Date(Date.parse('1990-01-01')));
        let enrollStudent = new EnrollStudents();
        enrollStudent.execute(student, "EM", "1", "A", 12);
        expect(() => enrollStudent.execute(student, "EM", "1", "A", 12)).toThrow(new Error(ErrorMessages.studentAlreadyEnrolled));
    });
    
    test("Should generate enrollment code", function(){
        const student = new Student(new Name("Ana Paula"), new Cpf("83208151934"), new Date(Date.parse('1990-01-01')));
        let enrollStudent = new EnrollStudents();
        const enrollment = enrollStudent.execute(student, "EM", "1", "A", 12);
        expect(enrollment.code).toBe("2021EM1A0001");
    });

    test("Should enroll below minimum age", function(){
        const student = new Student(new Name("Maria Carolina Fonseca"), new Cpf("755.525.774-26"), new Date('2012-03-12'));
        let enrollStudent = new EnrollStudents();
        expect(() => enrollStudent.execute(student, "EM", "1", "A", 12)).toThrow(new Error(ErrorMessages.studentBelowMinimumAge));
    });

    test("Should not enroll student over class capacity", function(){
        let enrollStudent = new EnrollStudents();
        for (let index = 0; index < 10; index++) {
            const enrollment = enrollStudent.execute(generateDummyStudent(index), "EM", "1", "A", 12);
        }
        const student = new Student(new Name("Maria Carolina Fonseca"), new Cpf("755.525.774-26"), new Date('2002-03-12'));
        expect(() => enrollStudent.execute(student, "EM", "1", "A", 12)).toThrow(new Error(ErrorMessages.classOverCapacity));
    });

    test("Should not enroll after que end of the class", function() {
        let enrollStudent = new EnrollStudents();
        let student = new Student(new Name("Maria Carolina Fonseca"), new Cpf("755.525.774-26"), new Date("2002-03-12"));
        expect(() => enrollStudent.execute(student, "EM", "1", "B", 12)).toThrow(new Error(ErrorMessages.classAlreadyOver));
    });

    test("Should not enroll after 25% of the start of the class", function() {
        let enrollStudent = new EnrollStudents();
        let student = new Student(new Name("Maria Carolina Fonseca"), new Cpf("755.525.774-26"), new Date("2002-03-12"));
        expect(() => enrollStudent.execute(student, "EM", "1", "C", 12)).toThrow(new Error(ErrorMessages.lateEnrollment));
    });

    test.only("Should generate the invoices based on the number of installments, rounding each amount and applying the rest in the last invoice", function() {
        let enrollStudent = new EnrollStudents();
        let student = new Student(new Name("Maria Carolina Fonseca"), new Cpf("755.525.774-26"), new Date("2002-03-12"));
        const expectedInstallmentValues = [1416.66, 1416.66, 1416.66, 1416.66, 1416.66, 1416.66, 1416.66, 1416.66, 1416.66, 1416.66, 1416.66, 1416.74]
        let enrollment = enrollStudent.execute(student, "EM", "1", "A", 12);
        expectedInstallmentValues.forEach((calculatedInstallment, index) => {
            expect(enrollment.installments[index].value).toBe(expectedInstallmentValues[index]);
        });
    });

});
