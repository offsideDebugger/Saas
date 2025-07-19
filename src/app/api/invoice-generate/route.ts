import { createInvoice } from "@/lib/invoiceService"; // Assuming you have a service to handle invoice creation
export async function POST(req: Request) {
  const data= await req.json();
    if (!data || !data.userId || !data.clientName || !data.clientEmail || !data.amount) {
        return new Response("Missing required fields", { status: 400 });
    }
  try {
    const invoice = await createInvoice(data);
    return new Response(JSON.stringify(invoice), { status: 201 });
  } catch (error) {
    console.error("Error generating invoice:", error);
    return new Response("Error generating invoice", { status: 500 });
  }
}