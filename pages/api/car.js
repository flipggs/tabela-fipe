import axios from "axios";

async function handler(req, res) {
  if (req.method === "GET") {
    const { brand, model, yearModel } = req.query;
    const [year, fuellType] = yearModel.split("-");
    const response = await axios.post(
      "https://veiculos.fipe.org.br/api/veiculos//ConsultarValorComTodosParametros",
      {
        codigoTipoVeiculo: 1,
        codigoTabelaReferencia: 285,
        codigoMarca: brand,
        codigoModelo: model,
        codigoTipoCombustivel: parseInt(fuellType, 10),
        anoModelo: parseInt(year, 10),
        tipoVeiculo: "carro",
        tipoConsulta: "tradicional",
      }
    );

    const { data } = response;

    res.status(200).json(data);
  }
}
module.exports = handler;
