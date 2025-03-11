import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

class SecurityService{


    async encryptPassword(password: string){
        return await bcrypt.hash(password, 10);
    }

    generateToken(_id: mongoose.Types.ObjectId, email: string){
        return jwt.sign({_id, email}, 'secretKey', {expiresIn: '1h'});
    }

}

export const securityService = new SecurityService();

