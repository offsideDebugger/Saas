import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
interface InvoiceData {
    userId: string;
    clientName: string;
    clientEmail: string;
    description?: string;
    category?: string;
    date: Date;
    amount: number;
  }
export async function createInvoice(data: InvoiceData) {
    const session = await getServerSession(authOptions);
    const userIdonServer = session?.user.id;
  const { clientName, clientEmail, description, category, amount } = data;
  

  const invoice = await prisma.invoice.create({
    data: {
      userId: userIdonServer || "",
      clientName,
      clientEmail,
      description,
      category,
      amount,
      invoiceNumber: `INV-${Date.now()}`
    }
  });

  return invoice;
}
