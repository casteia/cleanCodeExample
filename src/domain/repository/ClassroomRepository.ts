import Classroom from "../entities/classroom/Classroom";

export default interface ClassroomRepository{
    classes: Classroom[];
    findClassByCode(classCode: string): Classroom;
    addClass(level: string, module: string, code: string, capacity: number, start_date: string, end_date: string): void;
}