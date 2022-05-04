import axios from "axios";

async function handler(req, res) {
  if (req.method === "GET") {
    const response = await axios.post(
      "https://veiculos.fipe.org.br/api/veiculos//ConsultarModelos",
      {
        codigoTabelaReferencia: 285,
        codigoTipoVeiculo: 1,
        codigoMarca: req.query.brand,
      }
    );

    const { data } = response;

    res.status(200).json(data);
  }
}
module.exports = handler;
