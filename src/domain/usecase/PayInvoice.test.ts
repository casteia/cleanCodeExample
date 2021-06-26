
import Classroom from "../entities/classroom/Classroom";
import Enrollment from "../entities/enrollment/Enrollment";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import EnrollmentRepositoryInMemory from "../../implementation/memory/Enrollment/EnrollmentRepositoryInMemory";
import Installment from "../entities/Installments/Installment";
import InstallmentDTO from "../entities/Installments/InstallmentDTO";
import InstallmentRepository from "../repository/InstallmentRepository";
import InstallmentRepositoryInMemory from "../../implementation/memory/Installment/InstallmentRepositoryInMemory";
import Level from "../entities/level/Level";
import Module from "../entities/module/Module";
import Name from "../entities/name/Name";
import Student from "../entities/Student/Student";
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
        //TODO: initiate DTOs with field names for clarity
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