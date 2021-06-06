import Enrollment from "../enrollment/Enrollment";
import Installment from "./Installment";

const monetaryCorrectionFactor = 100;

export default class CalculateInstallments{

    enrollment: Enrollment;
    installments: Installment[] = [];

    constructor(enrollment: Enrollment){
        this.enrollment = enrollment;
    }

    public execute(): Installment[]{
        for (let index = 0; index < this.enrollment.numberOfInstallments; index++) {
            this.installments.push(this.calculateMonthlyInstallment(index));
        }
        return this.installments;
    }

    private calculateMonthlyInstallment(installmentIndex: number): Installment{
        let installmentValue = this.convertNumberToFixedTwo(this.enrollment.module.price / this.enrollment.numberOfInstallments);
        if(this.enrollment.numberOfInstallments === installmentIndex + 1) return this.calculateLastInstallment();
        return new Installment(installmentValue);
    }

    private calculateLastInstallment(): Installment{
        let totalAmountPaid = this.installments.reduce((total, value) => new Installment(total.value + value.value));
        let remainingDebt = this.safelySubtractDoubles(this.enrollment.module.price, totalAmountPaid.value, monetaryCorrectionFactor);
        return new Installment(remainingDebt);
    }

    private convertNumberToFixedTwo(number: number): number{
        return +(Math.floor(number * monetaryCorrectionFactor)/monetaryCorrectionFactor).toFixed(2);
    }

    private safelySubtractDoubles(firstNumber: number, secondNumber: number, correctionFactor: number){
        return ((firstNumber * correctionFactor) - (secondNumber * correctionFactor)) / correctionFactor;
    }

}