import * as ErrorMessages from "../../aula-um/ErrorMessages.Util";

export default class Name{
    value: string = "";
    nameValidationRegex: RegExp = /^([A-Za-z]+ )+([A-Za-z])+$/;

    constructor(value: string){
        this.validateName(value);
        this.value = value;
    }

    private validateName(name: string){
        const isNameInvalid = !this.nameValidationRegex.test(name);
        if(isNameInvalid) throw new Error(ErrorMessages.invalidStudentName);
    }
}