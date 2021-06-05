import Class from "../models/class/Class";
import Level from "../models/level/Level";
import Module from "../models/module/Module";

export default class InMemoryDatabaseDummy{
    levels: Level[] = [];
    modules: Module[] = [];
    classes: Class[] = [];

    constructor(){
        this.initializeLevels();
        this.initializeModules();
        this.initializeClasses();
    }

    private initializeLevels(){
        this.levels = [
            new Level("EF1", "Ensino Fundamental I"),
            new Level("EF2", "Ensino Fundamental II"),
            new Level("EM", "Ensino Médio"),
        ];
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
            level: this.levels.find(x => x.code === level),
            code: code,
            description: description,
            minumumAge: minumumAge,
            price: price
        };
    }

    private initializeClasses(){
        this.classes = [
            this.generateDummyClass("EM", "3", "A", 10)
        ];
    }

    private generateDummyClass(level: string, module: string, code: string, capacity: number): Class{
        return {
            module: this.modules.find(x => x.code === module && x.level?.code === level),
            level: this.levels.find(x => x.code === level),
            code: code,
            capacity: capacity,
        }
    }
}
