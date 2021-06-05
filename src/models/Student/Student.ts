import Cpf from "../cpf/Cpf";
import Name from "../name/Name";


export default class Student{
    name: Name;
    cpf: Cpf;
    birthDate: Date;
    
    constructor(name: Name, cpf: Cpf, birthDate: Date){
        this.name = name;
        this.cpf = cpf;
        this.birthDate = birthDate
    }

    public getCurrentAge(): number{
        return new Date(new Date().getTime() - this.birthDate.getTime()).getUTCFullYear() - 1970;
    }
}