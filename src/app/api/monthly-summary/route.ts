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

    const userId = session.user.id;
    
    const dailySummary = await prisma.$queryRaw<Array<{date: string, totalincome: number}>>`
    SELECT 
        TO_CHAR("date", 'YYYY-MM-DD') AS date,
        SUM("amount") AS totalincome
    FROM "Income"
    WHERE "userId" = ${userId}
    GROUP BY "date"
    ORDER BY "date" ASC
    `;

    // Also get monthly totals
    const monthlySummary = await prisma.$queryRaw<Array<{month: string, totalincome: number}>>`
    SELECT 
        TO_CHAR(DATE_TRUNC('month', "date"), 'YYYY-MM') AS month,
        SUM("amount") AS totalincome
    FROM "Income"
    WHERE "userId" = ${userId}
    GROUP BY DATE_TRUNC('month', "date")
    ORDER BY DATE_TRUNC('month', "date") ASC
    `;

    return NextResponse.json({ 
      dailyData: dailySummary,
      monthlyData: monthlySummary 
    });
  } catch (error) {
    console.error("GET /api/monthly-summary error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

}