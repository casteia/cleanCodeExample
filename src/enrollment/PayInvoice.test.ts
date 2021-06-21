import Classroom from "../models/classroom/Class";
import Cpf from "../models/cpf/Cpf";
import Enrollment from "../models/enrollment/Enrollment";
import EnrollmentRepository from "../models/enrollment/EnrollmentRepository";
import EnrollmentRepositoryInMemory from "../models/enrollment/EnrollmentRepositoryInMemory";
import Installment from "../models/Installments/Installment";
import InstallmentDTO from "../models/Installments/InstallmentDTO";
import InstallmentRepository from "../models/Installments/InstallmentRepository";
import InstallmentRepositoryInMemory from "../models/Installments/InstallmentRepositoryInMemory";
import Level from "../models/level/Level";
import Module from "../models/module/Module";
import Name from "../models/name/Name";
import Student from "../models/Student/Student";
import PayInvoice from "./PayInvoice";

let installmentRepository: InstallmentRepository;
let enrollmentRepository: EnrollmentRepository;

describe("When paying invoice", () => {
    beforeEach(() => {
        installmentRepository = new InstallmentRepositoryInMemory();
        enrollmentRepository = new EnrollmentRepositoryInMemory();
        setupTestData();
    });

    test("Should pay enrollment invoice", () => {
        let installmentDto = new InstallmentDTO("2021EM3A0001", 1, 2021, 1000, '2021-01-01');
        const balanceLeftAfterPayment = new PayInvoice(installmentRepository, enrollmentRepository).execute(installmentDto);
        expect(balanceLeftAfterPayment).toBe(-2000);
    });

});

function setupTestData(){
    enrollmentRepository.addEnrollment(generateDummyEnrollment());
    installmentRepository.addInstallment(new Installment(1000, 1, 2021, "2021EM3A0001"));
    installmentRepository.addInstallment(new Installment(1000, 2, 2021, "2021EM3A0001"));
    installmentRepository.addInstallment(new Installment(1000, 3, 2021, "2021EM3A0001"));
}

function generateDummyEnrollment(): Enrollment{
    return new Enrollment(
        new Student(new Name("Test Student"), "83208151934", '2005-01-01')
        , new Level("EM", "")
        , new Module("EM", "3", "", 0, 0)
        , new Classroom("EM", "3", "A", 0, new Date(), new Date()), 12);
}