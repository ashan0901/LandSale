import prisma from "../lib/prisma.js";

//get allthe posts accoding to  seacrch bar results

export const getPosts = async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrise) || 0,
          lte: parseInt(query.maxPrice) || 1000000000,
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "faild to get post" });
  }
};
/****************** */
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "faild to get post.." });
  }
};

/*********************************************** */
export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  console.log(body);
  console.log(tokenUserId);
  try {
    const newpost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newpost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Faild to Create Post" });
  }
};

/******************************************************** */
export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Fail to update post" });
  }
};
/**************************************************** */
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Autherized" });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "post deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Fail to delete post" });
  }
};
