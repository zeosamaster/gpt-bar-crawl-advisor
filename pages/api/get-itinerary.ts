// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  itinerary: string;
};

const GPT_KEY = process.env.GPT_API_KEY;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${GPT_KEY}`,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { city = "Lisbon", country } = JSON.parse(req.body);

  const countryPart = country ? ` in ${country}` : "";
  let basePrompt = `Give me the names of 10 popular nightlife bars where a group of friends may enjoy drinks in ${city}${countryPart}. Do not number each item, just write one name per line.`;
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: basePrompt,
        temperature: 0,
        max_tokens: 100,
      }),
    });
    const itinerary = await response.json();

    res.status(200).json({
      itinerary: itinerary.choices[0].text
        .split("\n")
        .filter((bar: string) => !!bar),
    });
  } catch (err) {
    console.log("error: ", err);
  }
}
