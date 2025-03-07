import { StudentDocumment, StudentModel } from "../models/student.model";

class StudentService{

    async getAll():Promise<StudentDocumment[]>{
        try {
            const students: StudentDocumment[] = await StudentModel.find();
            return students;
        }catch(error){
            throw error;
        }
    }
}
export const studentService = new StudentService();