import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// Explicitly export the HTTP methods we support
export const GET = async (request: Request) => {
  try {
    await connectToDB();
    
    // Get userId from searchParams
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const tasks = await mongoose.connection
      .collection("tasks")
      .find({ userId })
      .toArray();

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Error fetching tasks" }, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    await connectToDB();
    const body = await request.json();
    const { userId, title, description, status } = body;

    if (!userId || !title || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newTask = {
      userId,
      title,
      description: description || "",
      status,
      createdAt: new Date(),
    };

    const result = await mongoose.connection
      .collection("tasks")
      .insertOne(newTask);

    return NextResponse.json({ ...newTask, _id: result.insertedId });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  try {
    await connectToDB();
    const { tasks } = await request.json();

    if (!tasks || !Array.isArray(tasks)) {
      return NextResponse.json({ error: "Invalid tasks data" }, { status: 400 });
    }

    const bulkOps = tasks.map(task => ({
      updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(task._id) },
        update: { $set: { status: task.status } }
      }
    }));

    const result = await mongoose.connection
      .collection("tasks")
      .bulkWrite(bulkOps);

    return NextResponse.json({ 
      message: "Tasks updated successfully",
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    console.error("Error updating tasks:", error);
    return NextResponse.json({ error: "Error updating tasks" }, { status: 500 });
  }
};