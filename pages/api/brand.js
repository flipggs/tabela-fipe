import axios from "axios";

async function handler(req, res) {
  if (req.method === "GET") {
    const response = await axios.post(
      "https://veiculos.fipe.org.br/api/veiculos//ConsultarMarcas/",
      {
        codigoTabelaReferencia: 285,
        codigoTipoVeiculo: 1,
      }
    );

    const { data } = response;

    res.status(200).json(data);
  }
}
module.exports = handler;
