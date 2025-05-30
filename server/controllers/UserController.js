import bcrypt from "bcryptjs";
import { User } from "../models/UserModal.js";
import { deleteMedia, uploadMedia } from "../utils/cloudinary.js";
import { generateToken } from "../utils/generateToken.js";
export const register = async (req,res) => {
    try {
        console.log("Request Body:", req.body);
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User Already Exist with this email"
            })
        }
        const hashed = await bcrypt.hash(password,10);
        await User.create({
            name,
            email,
            password:hashed
        });
        return res.status(200).json({
            success:true,
            message:"User Registered Successfully"
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Failed to Register"
        })
    }
}

export const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No User Exist with this email"
            })
        }
        const equi = await bcrypt.compare(password,user.password);
        if(!equi){
            return res.status(400).json({
                success:false,
                message:"Enter Valid Password"
            })
        }
        generateToken(res,user,`Welcome back ${user.name}`)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to Register"
        })
    }
}


export const logout = async (req,res) => {
    try {
        return res.status(200).cookie("token",null,{
            maxAge:0
        }).json({
            message:"Logged Out Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to Logout"
        })
    }
}


export const getUserProfile = async (req,res) =>{
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password").populate("enrolledCourses");
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }
        return res.status(200).json({
                success:true,
                user
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to Load User"
        })
    }
}


export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const profile = req.file;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        // If previous profile image exists, delete it
        if (user.photoUrl) {
            const publicId = user.photoUrl.split("/").pop().split(".")[0];
            await deleteMedia(publicId);
        }

        // Upload new profile image
        const cloudResponse = await uploadMedia(profile.path);
        const photoUrl = cloudResponse.secure_url; // FIXED

        // Update user info
        const updateData = { name, photoUrl };
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            data: updatedUser
        });
    } catch (error) {
        console.log("Error in updateProfile:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to Update Profile"
        });
    }
};
