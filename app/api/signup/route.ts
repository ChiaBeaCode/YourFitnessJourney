import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/utils/mongo/clientPromise";
//TODO: redirect after successful signup

export async function POST(request: Request) {
  const data = await request.json();
  console.log("======== signup: request data", data);

  const { email, username, password } = data;
  if (!email || !username || !password)
    return NextResponse.json({
      message: "Username, Password, and/or Email is missing",
      status: 400,
    });
  console.log("======== signup: client connecting....");

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userExists) {
      console.log("signup: User exists block", userExists, typeof userExists);
      return NextResponse.json({
        message: "User already exists",
        status: 400,
      });
    } 

    console.log("======== signup password", password);
    const hashedpassword = await bcrypt.hash(password, 10);
    console.log("======== signup hashedpassword", hashedpassword);

    const user = await prisma.user.create({
      data: {
        email: email,
        name: username,
        password: hashedpassword,
      },
    });
    console.log("Entry Added!", user);
    return NextResponse.json(user);

  } catch (error) {
    return NextResponse.json({
      status: 400,
      body: JSON.stringify({ message: "User could not be created" }),
    });
  } finally {
    await prisma.$disconnect();
    console.log("Closing (signup route) connection");
  }
}
