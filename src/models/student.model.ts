import mongoose from 'mongoose';

export interface StudentInput{
    name:string;
    age:number;
    isActive:boolean;
    avg:number;
    email:string;
    password?:string;
}



export interface StudentDocumment extends StudentInput, mongoose.Document, StudentInput{}

// Una interfaz sirve para definir la estructura de un objeto, en este caso, de un objeto de tipo StudentInput.

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    isActive: {type: Boolean, required: true},
    avg: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

export const StudentModel = mongoose.model<StudentDocumment>('Student', studentSchema);


//Los generics sirven para definir el tipo de dato que se va a utilizar en una clase, función o interfaz. 
//En este caso, se está definiendo el tipo de dato que se va a utilizar en el modelo de mongoose.

