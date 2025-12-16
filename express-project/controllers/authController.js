const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// SECRET_KEY="big_bang_theory"

const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body||{};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password:hashedPassword,
      name,
      role:"user"  
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try{
        const{email,password}=req.body||{};
        if (!email || !password) {
          return res.status(400).json({ error: "Email and password are required" });
        }
        const user=await User.findOne({email});
        if(!user){
          return res.status(400).json({error:"User not found"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
          return res.status(400).json({error:"Invalid password"});

        }
        const token=jwt.sign(
          {id:user._id,email:user.email,role: user.role},
          process.env.SECRET_KEY,
          {expiresIn:process.env.JWT_EXPIRE_IN }
        );
        res.json({message: "Login successful",token,role: user.role});

      }
      catch(err){
        res.status(400).json({error:err.message});
      }

}

module.exports = { registerUser ,loginUser};
