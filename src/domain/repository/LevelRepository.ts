import Level from "../entities/level/Level";

export default interface LevelRepository{
    findLevelByCode(code: string): Level;
    addLevel(code: string, description: string): void;
}