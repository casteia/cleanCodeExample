import * as ErrorMessages from "../../error-messages/ErrorMessages.Util";
import Name from "./Name";

test("Should not create invalid name", function () {
    expect(() => new Name("Ana")).toThrow(new Error(ErrorMessages.invalidStudentName));
});

test("Should create valid name", function () {
    let name: Name = new Name("Ana Paula");
    expect(name.value).toBe("Ana Paula");
});