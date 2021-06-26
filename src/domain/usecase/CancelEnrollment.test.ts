import EnrollmentRepositoryInMemory from "../../implementation/memory/EnrollmentRepositoryInMemory";
import RepositoryMemoryFactory from "../../implementation/memory/RepositoryMemoryFactory";
import Classroom from "../entities/classroom/Classroom";
import Enrollment from "../entities/enrollment/Enrollment";
import EnrollmentDTO from "../entities/enrollment/EnrollmentDTO";
import { EnrollmentStatus } from "../entities/enrollment/EnrollmentStatus";
import Level from "../entities/level/Level";
import Module from "../entities/module/Module";
import Name from "../entities/name/Name";
import Student from "../entities/Student/Student";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import RepositoryAbstractFactory from "../repository/RepositoryAbstractFactory";
import CancelEnrollment from "./CancelEnrollment";

let enrollmentRepository: EnrollmentRepository;
let cancelEnrollment: CancelEnrollment;
let repository: RepositoryAbstractFactory

describe("",() => {
    beforeEach(() => {
        repository = new RepositoryMemoryFactory();
        enrollmentRepository = repository.getEnrollmentRepository();
        cancelEnrollment = new CancelEnrollment(enrollmentRepository);
        setupData();
    });

    test("Should cancel enrollment", () => {
        const cancelledEnrollment = cancelEnrollment.execute({ code: "2021EM3A0001" } as EnrollmentDTO);
        expect(cancelledEnrollment).toBe(EnrollmentStatus.Cancelled);
    })
});

function setupData(){
    enrollmentRepository.addEnrollment(generateDummyEnrollment());
}

function generateDummyEnrollment(): Enrollment{
    return new Enrollment(
        new Student(new Name("Test Student"), "83208151934", '2005-01-01')
        , new Level("EM", "")
        , new Module("EM", "3", "", 0, 0)
        , new Classroom("EM", "3", "A", 0, new Date(), new Date()), 12);
}