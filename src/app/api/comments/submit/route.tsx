import { supabase } from "@/lib/supabase/server";
import { NextApiResponse, NextApiRequest } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const body = req.body ? JSON.parse(req.body) : {};

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
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}