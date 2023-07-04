import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

interface Body {
  product: String;
  quantity: Number;
  price: Number;
}
export async function GET(request: Request) {
  // const url = "mongodb://127.0.0.1:27017/Demo";
  const url =
    "mongodb+srv://nodejs6969:TgMVboOvEu9a6h4u@stock-manage.pxums3k.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url);
  try {
    const db = client.db("stock");
    const tbl = db.collection("inventory");
    const data = await tbl.find({}).toArray();
    console.log(data);
    return NextResponse.json({ data });
  } finally {
    await client.close();
  }
}
export async function POST(request: Request) {
  // const url = "mongodb://127.0.0.1:27017/Demo";
  const url =
    "mongodb+srv://nodejs6969:TgMVboOvEu9a6h4u@stock-manage.pxums3k.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url);
  try {
    let body: Body = await request.json();
    const database = client.db("stock");
    const table = database.collection("inventory");
    const response = await table.insertOne(body);
    return NextResponse.json(response);
  } finally {
    await client.close();
  }
}
