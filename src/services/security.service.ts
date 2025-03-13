import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

class SecurityService{


    async encryptPassword(password: string){
        return await bcrypt.hash(password, 10);
    }

    async generateToken(_id: mongoose.Types.ObjectId, email: string, role: String){
        return await jwt.sign({_id, email, role}, 'secretKey', {expiresIn: '1h'});
    }

    //Para qué sirve el async? Sirve para que la función se ejecute de manera asíncrona, es decir, que no se detenga el flujo de ejecución del programa.
    //Para qué sirve el await? Sirve para esperar a que una promesa se resuelva. En este caso, se espera a que se resuelva la promesa que retorna la función bcrypt.hash.

    async comparePasswords(password: string, currentPassword: string){
        return await bcrypt.compare(password, currentPassword);
    }
}

export const securityService = new SecurityService();

