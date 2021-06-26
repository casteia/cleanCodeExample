export default class InstallmentDTO{
    code: string;
    month: number;
    year: number;
    amount: number;
    date: string;

    constructor(code: string, month: number, year: number, amount: number, date: string){
        this.code = code;
        this.month = month;
        this.year = year;
        this.amount = amount;
        this.date = date;
    }
}