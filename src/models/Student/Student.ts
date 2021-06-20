import Cpf from "../cpf/Cpf";
import Name from "../name/Name";


export default class Student{
    name: Name;
    cpf: Cpf;
    birthDate: Date;
    
    constructor(name: Name, cpf: string, birthDate: string){
        this.name = name;
        this.cpf = new Cpf(cpf);
        this.birthDate = new Date(Date.parse(birthDate));
    }

    public getCurrentAge(): number{
        return new Date(new Date().getTime() - this.birthDate.getTime()).getUTCFullYear() - 1970;
    }
}