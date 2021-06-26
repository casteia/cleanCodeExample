import * as ErrorMessages from "../../error-messages/ErrorMessages.Util";

const firstValidationDigitIndex = 10;
const secondValidationDigitIndex = 11;

export default class Cpf{
    value: string = "";

    constructor(cpf: string){
        const isCpfInvalid = !this.validate(cpf);
        if(isCpfInvalid) throw new Error(ErrorMessages.invalidStudentCpf);
        this.value = cpf;
    }

    //Original function: http://www.gerardocumentos.com.br/?pg=funcao-javascript-para-validar-cpf

    validate (cpf: string): boolean{
        cpf = cpf.replace(/[\.\-\,]/g, "");
        if (this.hasInvalidLenght(cpf)) return false;
        if (this.hasAllEqualNumbers(cpf)) return false;
        if(this.isVerificationDigitInvalid(cpf, firstValidationDigitIndex)) return false;
        if(this.isVerificationDigitInvalid(cpf, secondValidationDigitIndex)) return false;
        return true;
    }

    private hasInvalidLenght(cpf: string): boolean{
        return cpf.length < 11;
    }

    private hasAllEqualNumbers(cpf: string): boolean{
        let repeatedDigits = true;
        for (let i = 0; i < cpf.length - 1; i++){
            if (cpf.charAt(i) != cpf.charAt(i + 1)){
                repeatedDigits = false;
                break;
            }
        }
        return repeatedDigits;
    }

    private isVerificationDigitInvalid(cpf: string, verificationDigitPosition: number){
        let sum = 0;
        for (let i = 0; i < verificationDigitPosition - 1; i++){
            sum += parseInt( cpf.charAt(i) ) * (verificationDigitPosition - i);
        }
        let calculatedVerificationDigit = sum % 11 < 2 ? 0 : 11 - sum % 11;
        return calculatedVerificationDigit != parseInt(cpf.charAt(verificationDigitPosition - 1));
    }
}