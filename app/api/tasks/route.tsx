import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Task from "@/models/Task";

export async function GET(req: Request) {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const tasks = await Task.find({ assignedTo: userId }); // ✅ Fetch tasks for user
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return new NextResponse("Error fetching tasks", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    console.log("Incoming Task Data:", body); // ✅ Debug incoming request
    
    if (!body.title || !body.assignedTo || !body.status) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newTask = new Task({
      title: body.title,
      description: body.description || "",
      assignedTo: body.assignedTo, // ✅ Ensure assignedTo is included
      status: body.status || "Backlog",
    });

    await newTask.save();
    return NextResponse.json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    return new NextResponse("Error creating task", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDB();
    const { taskId, newStatus } = await req.json();

    if (!taskId || !newStatus) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ Update task status in MongoDB
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status: newStatus },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask); // Send back updated task
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}