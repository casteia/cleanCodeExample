import Level from "./Level";

export default interface LevelRepository{
    findLevelByCode(code: string): Level;
}