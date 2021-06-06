import Class from "./Class";
import classRepository from "./ClassRepository";

export default class ClassRepositoryInMemory implements classRepository{
    classes: Class[] = [];

    constructor(){
        this.initializeClasses();
    }

    private initializeClasses(){
        this.classes = [
            this.generateDummyClass("EM", "3", "A", 10, "2021-06-01", "2021-12-15")
            , this.generateDummyClass("EM", "3", "B", 5, "2021-05-01", "2021-05-30")
            , this.generateDummyClass("EM", "3", "C", 5, "2021-05-01", "2021-06-30")
        ];
    }

    private generateDummyClass(level: string, module: string, code: string, capacity: number, start_date: string, end_date: string): Class{
        return new Class(level, module, code, capacity, new Date(Date.parse(start_date)), new Date(Date.parse(end_date)));
    }    

    findClassByCode(classCode: string): Class {
        return this.classes.find(x => x.code === classCode) as Class;
    }
}