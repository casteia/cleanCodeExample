import ClassroomRepository from "./ClassroomRepository";
import EnrollmentRepository from "./EnrollmentRepository";
import InstallmentEventRepository from "./InstallmentEventRepository";
import InstallmentRepository from "./InstallmentRepository";
import LevelRepository from "./LevelRepository";
import ModuleRepository from "./ModuleRepository";

export default interface RepositoryAbstractFactory{
    getClassroomRepository(): ClassroomRepository;
    getEnrollmentRepository(): EnrollmentRepository;
    getLevelRepository(): LevelRepository;
    getModuleRepository(): ModuleRepository;
    getInstallmentRepository(): InstallmentRepository;
    getInstallmentEventRepository(): InstallmentEventRepository;
}