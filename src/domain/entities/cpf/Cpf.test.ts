import Cpf from "./Cpf";
import * as ErrorMessages from "../../error-messages/ErrorMessages.Util";

test("Should not create invalid cpf", function(){
    expect(() => new Cpf("123,456,789-99")).toThrow(new Error(ErrorMessages.invalidStudentCpf));
});