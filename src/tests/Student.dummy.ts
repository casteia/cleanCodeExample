import Cpf from "../models/cpf/Cpf";
import Name from "../models/name/Name";
import Student from "../models/Student/Student";

export default function generateDummyStudent(iterator: number): Student{
    const generatedCpf: string[] = [
        "827.538.690-06",
        "188.784.480-52",
        "447.056.160-65",
        "168.778.310-12",
        "890.889.900-69",
        "537.530.470-82",
        "754.259.990-97",
        "233.713.170-05",
        "903.187.020-02",
        "085.275.410-84",
        "066.729.250-07"
    ]

    return new Student(
        new Name("Dummy Student"),
        new Cpf(generatedCpf[iterator]),
        new Date(Date.parse('1980-01-01'))
    );
}
