import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

//create user
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //hash the password
    const hasedPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hasedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({ message: "User created sussesfull.." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration Failed" });
  }
};

//crate login
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //cheak user is in here
    const user = await prisma.user.findUnique({
      where: { username },
    });

    //if user not found
    if (!user) return res.status(401).json({ message: "User not Found" });
    //cheak password iscorrect
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //if password is not valid
    if (!isPasswordValid) return res.status(401).json("Not Valid Password");
    //genarate cookeei

    const age = 1000 * 60 * 60 * 24 * 7;
    //crete jwt token
    const token = jwt.sign(
      {
        id: user.id,
      },
      "w5bM3xexgzYx",
      { expiresIn: age }
    );
    //separate password from req body
    //we use varible(userPassword) to assing password because we use term password in above
    const { password: userPassword, ...userInfo } = user;
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "faild to  login" });
  }
};

//logout function
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout sucssefuly" });
};
