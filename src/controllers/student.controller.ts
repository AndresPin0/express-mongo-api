import { Request, Response } from "express";
import { studentService } from "../services/student.service";

class StudentController{

    async findAll(req: Request, res: Response){
        try{
            const students = await studentService.getAll();
            res.json(students);
        }catch(error){
            console.log(error);
            throw error;

        }
    }

}

export const studentController = new StudentController();