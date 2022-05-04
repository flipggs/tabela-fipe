import { google } from "googleapis";
import NextCors from "nextjs-cors";

async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const customSearch = google.customsearch("v1");
  if (req.method === "GET") {
    const { q } = req.query;
    const response = await customSearch.cse.list({
      auth: process.env.API_KEY,
      cx: process.env.CSE,
      q: `carro ${q}`,
      searchType: "image",
      num: 10,
      hl: "pt-BR",
      imgType: "photo",
      imgColorType: "trans",
      safe: "active",
    });

    if (response.data.items) {
      const imageUrl = response.data.items[0].link;
      res.status(200).json({ imageUrl });
    } else {
      console.log({ query: q });
      res.status(200).json({
        imageUrl:
          "https://cdn.autopapo.com.br/box/uploads/2020/10/08145625/carro_recusado_rejeitado_silhueta_montagem_carimbo-shutterstock_605341853-732x488.jpg",
      });
    }
  }
}

module.exports = handler;
