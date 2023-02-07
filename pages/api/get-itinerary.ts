// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  pointsOfInterestPrompt: any;
  itinerary: any;
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
        max_tokens: 550,
      }),
    });
    const itinerary = await response.json();
    const pointsOfInterestPrompt =
      "Extract the bar names out of this text, with no additional words, separated by commas: " +
      itinerary.choices[0].text;

    res.status(200).json({
      message: "success",
      pointsOfInterestPrompt,
      itinerary: itinerary.choices[0].text,
    });
  } catch (err) {
    console.log("error: ", err);
  }
}
