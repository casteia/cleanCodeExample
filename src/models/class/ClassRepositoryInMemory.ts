import Class from "./Class";
import classRepository from "./ClassRepository";

export default class ClassRepositoryInMemory implements classRepository{
    classes: Class[] = [];

    constructor(){
        this.initializeClasses();
    }

    private initializeClasses(){
        this.classes = [
            this.generateDummyClass("EM", "3", "A", 10)
        ];
    }

    private generateDummyClass(level: string, module: string, code: string, capacity: number): Class{
        return {
            module: module,
            level: level,
            code: code,
            capacity: capacity,
        }
    }    

    findClassByCode(classCode: string): Class {
        return this.classes.find(x => x.code === classCode) as Class;
    }
}