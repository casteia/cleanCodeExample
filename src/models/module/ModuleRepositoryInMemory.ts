import Module from "./Module";
import ModuleRepository from "./ModuleRepository";

export default class ModuleRepositoryInMemory implements ModuleRepository{
    modules: Module[] = [];


    constructor(){
        this.initializeModules();
    }

    private initializeModules(){
        this.modules = [
            {...this.generateDummyModule("EF1", "1", "1o Ano", 6, 15000)}
            , {...this.generateDummyModule("EF1", "2", "2o Ano", 7, 15000)}
            , {...this.generateDummyModule("EF1", "3", "3o Ano", 8, 15000)}
            , {...this.generateDummyModule("EF1", "4", "4o Ano", 9, 15000)}
            , {...this.generateDummyModule("EF1", "5", "5o Ano", 10, 15000)}
            , {...this.generateDummyModule("EF2", "6", "6o Ano", 11, 15000)}
            , {...this.generateDummyModule("EF2", "7", "7o Ano", 12, 15000)}
            , {...this.generateDummyModule("EF2", "8", "8o Ano", 13, 15000)}
            , {...this.generateDummyModule("EF2", "9", "9o Ano", 14, 15000)}
            , {...this.generateDummyModule("EM", "1", "1o Ano", 15, 15000)}
            , {...this.generateDummyModule("EM", "2", "2o Ano", 16, 15000)}
            , {...this.generateDummyModule("EM", "3", "3o Ano", 17, 15000)}
        ];
    }

    private generateDummyModule(level: string, code: string, description: string, minumumAge: number, price: number): Module{
        return {
            level: level,
            code: code,
            description: description,
            minumumAge: minumumAge,
            price: price
        };
    }

    findModuleByCode(moduleCode: string, levelCode: string): Module {
        return this.modules.find(x => x.code === moduleCode && x.level === levelCode) as Module;
    }
    
}