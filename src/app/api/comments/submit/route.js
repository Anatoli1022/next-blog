// ./src/app/api/comments/submit/route.js

import { supabase } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const { post_id, email, comment, nickname, uid } = body;

  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id,
      email,
      nickname,
      payload: comment,
    })
    .select("id");

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
  });
}