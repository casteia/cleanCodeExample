export default class Module{
    level: string;
    code: string;
    description: string;
    minumumAge: number;
    price: number;

    constructor(level: string, code: string, description: string, minumumAge: number, price: number){
        this.level = level;
        this.code = code;
        this.description = description;
        this.minumumAge = minumumAge;
        this.price = price;
    }
}