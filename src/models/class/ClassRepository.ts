import Class from "./Class";

export default interface classRepository{
    findClassByCode(classCode: string): Class;
}