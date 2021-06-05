import Module from "./Module";

export default interface ModuleRepository{
    findModuleByCode(moduleCode: string, levelCode: string): Module;
}