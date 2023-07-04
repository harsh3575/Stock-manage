import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  // const url = "mongodb://127.0.0.1:27017/demo";
  const url =
    "mongodb+srv://nodejs6969:TgMVboOvEu9a6h4u@stock-manage.pxums3k.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url);
  try {
    const db = client.db("stock");
    const table = db.collection("inventory");
    let data = await table.find({ product: { $regex: query } }).toArray();
    return NextResponse.json(data);
  } finally {
    await client.close();
  }
}
