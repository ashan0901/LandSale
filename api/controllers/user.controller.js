import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    //get users from database
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Faild to get users" });
  }
};

//*****************************************************
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    //get user from database
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Faild to get user" });
  }
};
/******************************** */
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = res.userId;
  const { password, avatar, ...inputs } = req.body;

  if (!id == tokenUserId) {
    return res.status(403).json({ message: "Not Allowed.." });
  }
  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updateduser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Faild to update user" });
  }
};

/**************************************** */
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = res.userId;
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "Deleted User" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Faild to delete user" });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.params.userId;
  try {
    const userPost = await prisma.user.findMany({
      where: { userId: tokenUserId },
    });
    res.status(200).json(userPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Faild to get profile posts" });
  }
};
