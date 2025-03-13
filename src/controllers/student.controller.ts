import e, { Request, Response } from "express";
import { StudentDocumment, StudentInput } from "../models";
import { securityService, studentService } from "../services";

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
            const userExist: StudentDocumment | null = await studentService.findByEmail(req.body.email);
            if(userExist){
                res.status(400).json(`the user ${req.body.email} already exists`);
            }else{
                req.body.password = await securityService.encryptPassword(req.body.password);
                const user :StudentDocumment = await studentService.create(req.body);
                res.status(201).json(user);
            }
        }catch(error){
            res.status(400).json(`the user hasnt been created ${error}`)};
        }
    

        async update(req: Request, res: Response) {
            try {
                const  email:string  = req.params.email;
                const student: StudentDocumment | null = await studentService.update(email, req.body as StudentInput);
                if (student===null) {
                    res.status(404).json({ message: "The user hasn't been updated" });
                }
                res.json(student);
            } catch (error) {
                console.log( error);
                res.status(400).json({ message: "The user hasn't been updated", error });
            }
        }
        // async delete(req: Request, res: Response) {
        //     try {
        //         const email: string = req.params.email;
        //         const student = await studentService.delete(email);
                
        //         if (!student) {
        //          res.status(404).json({ message: `User with email ${email} not found` });
        //         }
        
        //         res.json({ message: `User with email ${email} deleted successfully` });
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).json({ message: "Error deleting user", error });
        //     }
        // }
        async login(req: Request, res: Response) {
            try{
                const { email, password } = req.body;
                const student: StudentDocumment | null = await studentService.findByEmail(email);
                if (!student) {
                    res.status(400).json({ message: `Student ${req.body.email} not found` });
                    return;
                }
                const isPasswordCorrect: boolean = await securityService.comparePasswords(password, student.password);
                if (!isPasswordCorrect) {
                    res.status(400).json(`user or password incorrect`);
                }else{
                    const token = await securityService.generateToken(student.id, student.email);
                    res.json({message: `login success, welcome ${student.name}`,
                        token: token});
                }
            }catch(error){
                res.status(500).json('login incorrect')
            }

        }
        

}

export const studentController = new StudentController();