import bcrypt from "bcryptjs";
import User from "./models/User.js";

const registerUser = async (info, ) => {
    const emailExist = await User.findOne({ email: info.email });
  
    if (emailExist) return console.log("Email already exists")
  
    const hashedPassword = await bcrypt.hash(info.password, 10);
  
    const user = {
      name: info.name,
      email: info.email,
      password: hashedPassword,
    };
  
    try {
      await User.create(user);
      console.log("User created")
    } catch (err) {
     console.error("Error creating user:", err)
    }
  };
  

const info = {
    name: "Samuel Fernandez", 
    email: "samuel_ferfort@hotmail.com",
    password: "1234567"
}


registerUser(info)