import Classroom from "../models/classroom/Class";
import Cpf from "../models/cpf/Cpf";
import Enrollment from "../models/enrollment/Enrollment";
import EnrollmentDTO from "../models/enrollment/EnrollmentDTO";
import EnrollmentRepository from "../models/enrollment/EnrollmentRepository";
import EnrollmentRepositoryInMemory from "../models/enrollment/EnrollmentRepositoryInMemory";
import { EnrollmentStatus } from "../models/enrollment/EnrollmentStatus";
import Level from "../models/level/Level";
import Module from "../models/module/Module";
import Name from "../models/name/Name";
import Student from "../models/Student/Student";
import CancelEnrollment from "./CancelEnrollment";

let enrollmentRepository: EnrollmentRepository;
let cancelEnrollment: CancelEnrollment;

describe("",() => {
    beforeEach(() => {
        enrollmentRepository = new EnrollmentRepositoryInMemory();
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