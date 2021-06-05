import * as ErrorMessages from "../../aula-um/ErrorMessages.Util";
import Name from "./Name";

test("Should not create invalid name", function () {
    expect(() => new Name("Ana")).toThrow(new Error(ErrorMessages.invalidStudentName));
});