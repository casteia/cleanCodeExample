import Level from "./Level";
import LevelRepository from "./LevelRepository";

export default class LevelRepositoryInMemory implements LevelRepository{
    levels: Level[] = [];
    
    constructor(){}

    addLevel(code: string, description: string): void{
        this.levels.push(new Level(code, description));
    }

    findLevelByCode(code: string): Level {
        return this.levels.find(x => x.code === code) as Level;
    }
}