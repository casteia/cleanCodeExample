import RepositoryMemoryFactory from "../../implementation/memory/RepositoryMemoryFactory";
import Classroom from "../entities/classroom/Classroom";
import Enrollment from "../entities/enrollment/Enrollment";
import Installment, { InstallmentStatus } from "../entities/Installments/Installment";
import InstallmentDTO from "../entities/Installments/InstallmentDTO";
import InstallmentEvent, { InstallmentEventType } from "../entities/Installments/InstallmentEvent/InstallmentEvent";
import Level from "../entities/level/Level";
import Module from "../entities/module/Module";
import Name from "../entities/name/Name";
import Student from "../entities/Student/Student";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import InstallmentEventRepository from "../repository/InstallmentEventRepository";
import InstallmentRepository from "../repository/InstallmentRepository";
import RepositoryAbstractFactory from "../repository/RepositoryAbstractFactory";
import PayInvoice from "./PayInvoice";

let installmentRepository: InstallmentRepository;
let installmentEventRepository: InstallmentEventRepository;
let enrollmentRepository: EnrollmentRepository;
let repository: RepositoryAbstractFactory;

describe("When paying invoice", () => {
    beforeEach(() => {
        repository = new RepositoryMemoryFactory();
        installmentRepository = repository.getInstallmentRepository();
        enrollmentRepository = repository.getEnrollmentRepository();
        installmentEventRepository = repository.getInstallmentEventRepository();
        setupTestData();
    });

    test("Should pay enrollment invoice", () => {
        //TODO: initiate DTOs with field names for clarity
        let installmentDto = new InstallmentDTO("2021EM3A0001", 1, 2021, 1000, '2021-01-01');
        const balanceLeftAfterPayment = new PayInvoice(repository).execute(installmentDto);
        expect(balanceLeftAfterPayment).toBe(-2000);
    });

});

function setupTestData(){
    enrollmentRepository.addEnrollment(generateDummyEnrollment());
    generateInstalmmentDummyData();
    generateInstallmentEventDummyData();
}

function generateDummyEnrollment(): Enrollment{
    return new Enrollment(
        new Student(new Name("Test Student"), "83208151934", '2005-01-01')
        , new Level("EM", "")
        , new Module("EM", "3", "", 0, 0)
        , new Classroom("EM", "3", "A", 0, new Date(), new Date()), 12);
}

function generateInstalmmentDummyData(){
    installmentRepository.addInstallment(new Installment(1000, 1, 2021, "2021EM3A0001"));
    installmentRepository.addInstallment(new Installment(1000, 2, 2021, "2021EM3A0001"));
    installmentRepository.addInstallment(new Installment(1000, 3, 2021, "2021EM3A0001"));
}

function generateInstallmentEventDummyData(){
    installmentEventRepository.addEvent(new InstallmentEvent(1000, InstallmentEventType.Debt, "2021EM3A0001", 1, 2021));
    installmentEventRepository.addEvent(new InstallmentEvent(1000, InstallmentEventType.Debt, "2021EM3A0001", 2, 2021));
    installmentEventRepository.addEvent(new InstallmentEvent(1000, InstallmentEventType.Debt, "2021EM3A0001", 3, 2021));
}