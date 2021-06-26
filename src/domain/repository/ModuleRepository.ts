import Module from "../entities/module/Module";

export default interface ModuleRepository{
    findModuleByCode(moduleCode: string, levelCode: string): Module;
    addModule(level: string, code: string, description: string, minumumAge: number, price: number): void;
}