import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/authOptions";
export default async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const monthlySummary=await prisma.$queryRaw`
    SELECT 
        TO_CHAR(DATE_TRUNC('month', createdAt), 'YYYY-MM') AS month,
        SUM("amount") AS totalIncome
    FROM "Income"
    WHERE "userId" = ${userId}
    GROUP BY DATE_TRUNC('month', createdAt)
    ORDER BY month ASC
    `;

    return NextResponse.json(monthlySummary);
  } catch (error) {
    console.error("GET /api/monthly-summary error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

}