import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const incomes = await prisma.income.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(incomes);
  } catch (error) {
    console.error("GET /api/income error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!body.amount || !body.client || !body.paymentMode) {
      return NextResponse.json(
        { error: "Missing required fields: amount, client, paymentMode" },
        { status: 400 }
      );
    }

    const income = await prisma.income.create({
      data: {
        amount: parseFloat(body.amount),
        userId: session.user.id,
        client: body.client,
        paymentMode: body.paymentMode,
      },
    });

    return NextResponse.json(income);
  } catch (error) {
    console.error("POST /api/income error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "Missing required field: id" },
        { status: 400 }
      );
    }

    const existingIncome = await prisma.income.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!existingIncome) {
      return NextResponse.json(
        { error: "Income not found or unauthorized" },
        { status: 404 }
      );
    }

    const income = await prisma.income.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(income);
  } catch (error) {
    console.error("DELETE /api/income error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}