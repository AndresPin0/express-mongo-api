import { StudentDocumment, StudentInput, StudentModel } from "../models/student.model";
import { securityService } from "./security.service";

class StudentService{

    async create(data: StudentDocumment){
        try {
            const student = await StudentModel.create(data);
            return student;
        }catch(error){
            throw error;
        }
    }

    async findByEmail(email: string){
        try{
            const student = await StudentModel.findOne({email});
            return student;
        }catch(error){
            throw error;
        }
    }

    async getAll():Promise<StudentDocumment[]>{
        try {
            const students: StudentDocumment[] = await StudentModel.find();
            return students;
        }catch(error){
            throw error;
        }
    }

    async update(email: string, data: StudentInput){
        try {
            const student: StudentDocumment | null = await StudentModel.findOneAndUpdate
            ({email: email}, data, {returnOriginal: false});
            if(student){
                student.password = "********";
            }
            return student;
          
        } catch (error) {
          throw error;
        }
      }
}

export const studentService = new StudentService();