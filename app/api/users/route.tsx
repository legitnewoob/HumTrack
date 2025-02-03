import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/User";
import { connectToDB } from "@/lib/mongoose";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 403 });
  }

  await connectToDB();
  const users = await User.find({});
  return new Response(JSON.stringify(users), { status: 200 });
}