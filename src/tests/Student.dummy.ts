import Cpf from "../domain/entities/cpf/Cpf";
import Name from "../domain/entities/name/Name";
import Student from "../domain/entities/Student/Student";

export default function generateDummyStudent(iterator: number): {studentName: string, studentCpf: string, studentBirthDate: string} {
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

    return {
        studentName: 'Dummy Student',
        studentCpf: generatedCpf[iterator],
        studentBirthDate: '1980-01-01'
    };
}
