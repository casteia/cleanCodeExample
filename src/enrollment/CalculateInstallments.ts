import Enrollment from "../models/enrollment/Enrollment";
import Installment from "../models/Installments/Installment";

const monetaryCorrectionFactor = 100;

export default class CalculateInstallments{

    enrollment: Enrollment;
    installments: Installment[] = [];

    constructor(enrollment: Enrollment){
        this.enrollment = enrollment;
    }

    public execute(): Installment[]{
        for (let index = 0; index < this.enrollment.numberOfInstallments; index++) {
            this.installments.push(this.calculateMonthlyInstallment(index, index + 1));
        }
        return this.installments;
    }

    private calculateMonthlyInstallment(installmentIndex: number, month: number): Installment{
        let installmentValue = this.convertNumberToFixedTwo(this.enrollment.module.price / this.enrollment.numberOfInstallments);
        if(this.enrollment.numberOfInstallments === installmentIndex + 1) return this.calculateLastInstallment(month);
        return new Installment(installmentValue, month, 2021, this.enrollment.code);
    }

    private calculateLastInstallment(month: number): Installment{
        let totalAmountPaid = this.installments.reduce((total, installment) => {
            total += installment.amount;
            return total;
        }, 0);
        let remainingDebt = this.safelySubtractDoubles(this.enrollment.module.price, totalAmountPaid, monetaryCorrectionFactor);
        return new Installment(remainingDebt, month, 2021, this.enrollment.code);
    }

    private convertNumberToFixedTwo(number: number): number{
        return +(Math.floor(number * monetaryCorrectionFactor)/monetaryCorrectionFactor).toFixed(2);
    }

    private safelySubtractDoubles(firstNumber: number, secondNumber: number, correctionFactor: number){
        return ((firstNumber * correctionFactor) - (secondNumber * correctionFactor)) / correctionFactor;
    }

}