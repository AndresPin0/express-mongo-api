import { Request, Response } from "express";
import { studentService } from "../services/student.service";
import { StudentModel, StudentDocumment, StudentInput } from "../models/student.model";
import { securityService } from "../services";

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

    async create(req: Request, res: Response){
        try{
            const userExists : StudentDocumment | null = await studentService.findByEmail(req.body.email);
            
            if(userExists){
                res.status(400).json({message: `The student ${req.body.email} already exists`});
            }

            req.body.password = await securityService.encryptPassword(req.body.password);

            const user: StudentDocumment = await studentService.create(req.body);
            res.status(201).json(user);

            
        }catch(error){
            res.status(500).json({message: "Internal server error: The student hasn't been created"});
        }
    }

    async update(req: Request, res: Response){
        try {
            const email: string = req.params.email;
            const student: StudentDocumment | null = await studentService.update(email, req.body as StudentInput);
            if(student === null){
                res.status(404).json({message: `The student ${req.body.email} doesn't exist`});
            }
            res.json(student);
        } catch (error){
            res.status(500).json({message: `Internal server error: The student ${req.body.email} hasn't been updated`});
        }

    }
    

}

export const studentController = new StudentController();