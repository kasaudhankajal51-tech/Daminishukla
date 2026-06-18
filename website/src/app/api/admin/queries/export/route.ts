import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getDb } from "@/lib/mongodb";
import ExcelJS from "exceljs";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  try {
    const db = await getDb();
    const query: any = {};
    
    if (from || to) {
      query.created_at = {};
      if (from) query.created_at.$gte = new Date(from);
      if (to) query.created_at.$lte = new Date(to);
    }

    const enquiries = await db.collection("enquiries")
      .find(query)
      .sort({ created_at: -1 })
      .toArray();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Enquiries");

    worksheet.columns = [
      { header: "ID", key: "id", width: 30 },
      { header: "Date & Time", key: "created_at", width: 20 },
      { header: "Name", key: "full_name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Enquiry Type", key: "enquiry_type", width: 25 },
      { header: "Message", key: "message", width: 50 },
    ];

    enquiries.forEach((enq) => {
      worksheet.addRow({
        id: enq._id.toString(),
        created_at: enq.created_at ? enq.created_at.toLocaleString() : "-",
        full_name: enq.full_name,
        email: enq.email,
        phone: enq.phone || "-",
        enquiry_type: enq.enquiry_type,
        message: enq.message,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="enquiries-${new Date().toISOString().split('T')[0]}.xlsx"`,
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ error: "Failed to export enquiries" }, { status: 500 });
  }
}
