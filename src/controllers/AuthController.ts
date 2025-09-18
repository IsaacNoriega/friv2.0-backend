import { Request , Response } from "express";
import bcrypt from "bcryptjs"; // Es para manejar el hashing de contraseñas
import jwt from "jsonwebtoken"; // Es para manejar tokens JWT
import { User } from "../models/User";

class AuthController {

    // Registro de usuario
    async register ( req : Request , res : Response ) {

        const { username , email , password } = req.body;
        try{        

        const existingUser = await User.findOne({ email }); // Verifica si el usuario ya existe
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password , 10); // Hashea la contraseña

        const user = new User({ 
            username , 
            email , 
            password: hashedPassword
        });
        await user.save(); // Guarda el nuevo usuario en la base de datos

        res.status(201).json({ message: "User registered successfully" });
        }catch(error){
        res.status(500).json({ message: "Server error" });
        }
    }

    // Login de usuario
    async login (req : Request , res : Response) {

        const { email , password } = req.body;

        try{
            const user = await User.findOne({ email }); // Busca el usuario por email
            if(!user){
                return res.status(400).json({ message: "User not found" });
            }

            const isMatch = await bcrypt.compare(password , user.password); // Compara la contraseña

            if(!isMatch){
                return res.status(400).json({ message: "Incorrect Password" });
            }

            const token = jwt.sign(
                { userId: user._id  , email: user.email },
                process.env.JWT_SECRET || "default" , 
                { expiresIn: "1h" }
            );

            res.status(200).json({ token  , message : "Login successful" });

        }catch(error){
            res.status(500).json({ message: "Login Error" });
        }

    }

}

export default new AuthController();