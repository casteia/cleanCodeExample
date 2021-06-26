import Classroom from "../../../domain/entities/classroom/Classroom";
import ClassroomRepository from "../../../domain/repository/ClassroomRepository";

export default class ClassroomRepositoryInMemory implements ClassroomRepository{
    public classes: Classroom[] = [];

    constructor(){}

    public addClass(level: string, module: string, code: string, capacity: number, start_date: string, end_date: string): void {
        let classroom = new Classroom(level, module, code, capacity, new Date(Date.parse(start_date)), new Date(Date.parse(end_date)));
        this.classes.push(classroom);
    }

    findClassByCode(classCode: string): Classroom {
        return this.classes.find(x => x.code === classCode) as Classroom;
    }
}