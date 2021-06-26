import Module from "../../../domain/entities/module/Module";
import ModuleRepository from "../../../domain/repository/ModuleRepository";

export default class ModuleRepositoryInMemory implements ModuleRepository{
    modules: Module[] = [];

    constructor(){}

    addModule(level: string, code: string, description: string, minumumAge: number, price: number): void{
        this.modules.push(new Module(level, code, description, minumumAge, price));
    }

    findModuleByCode(moduleCode: string, levelCode: string): Module {
        return this.modules.find(x => x.code === moduleCode && x.level === levelCode) as Module;
    }
    
}