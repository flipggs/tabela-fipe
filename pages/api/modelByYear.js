import axios from "axios";

async function handler(req, res) {
  if (req.method === "GET") {
    const { brand, yearModel } = req.query;
    const [year, fuellType] = yearModel.split("-");
    const response = await axios.post(
      "https://veiculos.fipe.org.br/api/veiculos//ConsultarModelosAtravesDoAno",
      {
        codigoTabelaReferencia: 285,
        codigoTipoVeiculo: 1,
        codigoMarca: brand,
        ano: yearModel,
        codigoTipoCombustivel: parseInt(fuellType, 10),
        anoModelo: parseInt(year, 10),
      }
    );

    const { data } = response;

    res.status(200).json(data);
  }
}
module.exports = handler;
