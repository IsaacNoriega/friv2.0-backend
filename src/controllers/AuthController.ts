import { Request , Response } from "express";
import bcrypt from "bcryptjs"; // Es para manejar el hashing de contraseñas
import jwt from "jsonwebtoken"; // Es para manejar tokens JWT
import { User } from "../models/User";

class AuthController {
    // Get all users
    async getUsers(req: Request, res: Response) {
        try {
            const users = await User.find().select('-password'); // Excluye el campo password
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving users" });
        }
    }

    // Get user by ID
    async getUserById(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving user" });
        }
    }

    // Update user
    async updateUser(req: Request, res: Response) {
        try {
            const { username, email, password, hasPaid } = req.body;
            const updates: any = {};
            
            if (username) updates.username = username;
            if (email) updates.email = email;
            if (password) updates.password = await bcrypt.hash(password, 10);
            if (hasPaid !== undefined) updates.hasPaid = hasPaid;

            const user = await User.findByIdAndUpdate(
                req.params.id,
                updates,
                { new: true }
            ).select('-password');

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Error updating user" });
        }
    }

    // Delete user
    async deleteUser(req: Request, res: Response) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting user" });
        }
    }

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
            const user = await User.findOne({ email })
                .select('username email hasPaid password'); // Selecciona los campos que queremos devolver
            
            if(!user){
                return res.status(400).json({ message: "User not found" });
            }

            const isMatch = await bcrypt.compare(password , user.password);

            if(!isMatch){
                return res.status(400).json({ message: "Incorrect Password" });
            }

            // Preparamos el objeto de usuario sin la contraseña
            const userData = {
                id: user._id,
                username: user.username,
                email: user.email,
                hasPaid: user.hasPaid
            };

            const token = jwt.sign(
                { userId: user._id  , email: user.email },
                process.env.JWT_SECRET || "default" , 
                { expiresIn: "1h" }
            );

            // Enviamos tanto el token como los datos del usuario
            res.status(200).json({ 
                token, 
                user: userData,
                message: "Login successful" 
            });

        }catch(error){
            res.status(500).json({ message: "Login Error" });
        }

    }

}

export default new AuthController();