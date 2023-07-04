import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  //   const url = "mongodb://127.0.0.1:27017/Demo";
  const url =
    "mongodb+srv://nodejs6969:TgMVboOvEu9a6h4u@stock-manage.pxums3k.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url);
  try {
    let body = await request.json();
    const database = client.db("stock");
    const table = database.collection("inventory");
    let { product, action, Mainquantity } = body;
    let no = action == "plus" ? 1 : -1;
    const total = Number(Mainquantity) + no;
    const response = await table.updateOne(
      { product },
      { $set: { quantity: total } },
      { upsert: true }
    );
    return NextResponse.json(response);
  } finally {
    await client.close();
  }
}
