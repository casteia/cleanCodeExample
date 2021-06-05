import Level from "./Level";
import LevelRepository from "./LevelRepository";

export default class LevelRepositoryInMemory implements LevelRepository{
    levels: Level[] = [];
    
    constructor(){
        this.initializeLevels();
    }

    private initializeLevels(){
        this.levels = [
            new Level("EF1", "Ensino Fundamental I"),
            new Level("EF2", "Ensino Fundamental II"),
            new Level("EM", "Ensino Médio"),
        ];
    }

    findLevelByCode(code: string): Level {
        return this.levels.find(x => x.code === code) as Level;
    }
}