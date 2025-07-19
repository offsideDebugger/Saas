import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    if (!data || !data.clientName || !data.clientEmail || !data.amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    
    const invoice = {
      id: Date.now().toString(),
      invoiceNumber,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      description: data.description,
      amount: parseFloat(data.amount),
      paymentMode: data.paymentMode,
      theme: data.theme,
      date: new Date().toISOString().split('T')[0],
      dueDate: data.dueDate,
      status: 'draft'
    };

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("Error generating invoice:", error);
    return NextResponse.json({ error: "Error generating invoice" }, { status: 500 });
  }
}