import ClassroomRepository from "../../domain/repository/ClassroomRepository";
import EnrollmentRepository from "../../domain/repository/EnrollmentRepository";
import InstallmentEventRepository from "../../domain/repository/InstallmentEventRepository";
import InstallmentRepository from "../../domain/repository/InstallmentRepository";
import LevelRepository from "../../domain/repository/LevelRepository";
import ModuleRepository from "../../domain/repository/ModuleRepository";
import RepositoryAbstractFactory from "../../domain/repository/RepositoryAbstractFactory";
import ClassroomRepositoryInMemory from "./ClassroomRepositoryInMemory";
import EnrollmentRepositoryInMemory from "./EnrollmentRepositoryInMemory";
import InstallmentEventRepositoryInMemory from "./InstallmentEventRepositoryInMemory";
import InstallmentRepositoryInMemory from "./InstallmentRepositoryInMemory";
import LevelRepositoryInMemory from "./LevelRepositoryInMemory";
import ModuleRepositoryInMemory from "./ModuleRepositoryInMemory";

export default class RepositoryMemoryFactory implements RepositoryAbstractFactory{

    classroomRepository: ClassroomRepository;
    enrollmentRepository: EnrollmentRepository;
    levelRepository: LevelRepository;
    moduleRepository: ModuleRepository;
    installmentRepository: InstallmentRepository;
    installmentEventRepository: InstallmentEventRepository;

    getClassroomRepository(): ClassroomRepository {
        if(!this.classroomRepository){
            this.classroomRepository = new ClassroomRepositoryInMemory();
        }
        return this.classroomRepository;
    }
    getEnrollmentRepository(): EnrollmentRepository {
        if(!this.enrollmentRepository){
            this.enrollmentRepository = new EnrollmentRepositoryInMemory();
        }
        return this.enrollmentRepository;
    }
    getLevelRepository(): LevelRepository {
        if(!this.levelRepository){
            this.levelRepository = new LevelRepositoryInMemory();
        }
        return this.levelRepository;
    }
    getModuleRepository(): ModuleRepository {
        if(!this.moduleRepository){
            this.moduleRepository = new ModuleRepositoryInMemory();
        }
        return this.moduleRepository;
    }

    getInstallmentRepository(): InstallmentRepository{
        if(!this.installmentRepository){
            this.installmentRepository = new InstallmentRepositoryInMemory(this.getInstallmentEventRepository());
        }
        return this.installmentRepository;
    }

    getInstallmentEventRepository(): InstallmentEventRepository{
        if(!this.installmentEventRepository){
            this.installmentEventRepository = new InstallmentEventRepositoryInMemory();
        }
        return this.installmentEventRepository;
    }

}