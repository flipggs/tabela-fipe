import axios from "axios";

async function handler(req, res) {
  if (req.method === "GET") {
    const { brand, model } = req.query;
    const response = await axios.post(
      "https://veiculos.fipe.org.br/api/veiculos//ConsultarAnoModelo",
      {
        codigoTipoVeiculo: 1,
        codigoTabelaReferencia: 285,
        codigoMarca: brand,
        codigoModelo: model,
      }
    );

    const { data } = response;

    res.status(200).json(data);
  }
}
module.exports = handler;
