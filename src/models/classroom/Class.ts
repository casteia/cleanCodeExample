export default class Classroom{
    level: string;
    module: string;
    code: string;
    capacity: number;
    start_date: Date;
    end_date: Date;

    constructor(level: string, module: string, code: string, capacity: number, start_date: Date, end_date: Date){
        this.level = level;
        this.module = module;
        this.code = code;
        this.capacity = capacity;
        this.start_date = start_date;
        this.end_date = end_date;
    }

    public getTimeDuration(): number{
        return this.end_date.getTime() - this.start_date.getTime();
    }
}