import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

import * as S from "./styles";

const OptionsSearch = () => {
  const [optionsBrands, setOptionsBrands] = useState([]);
  const [brandSelected, setBrandSelected] = useState(null);

  const [optionsModels, setOptionsModels] = useState([]);
  const [disableModel, setDisableModel] = useState(true);
  const [modelSelected, setModelSelected] = useState(null);

  const [optionsYears, setOptionsYears] = useState([]);
  const [yearSelected, setYearSelected] = useState(null);
  const [disableYear, setDisableYear] = useState(true);

  const [car, setCar] = useState();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    axios.get("/api/brand").then((response) => {
      const options = response.data.map((item) => ({
        label: item.Label,
        value: item.Value,
      }));
      setOptionsBrands(options);
    });
  }, []);

  const onChangeBrand = (itemSelected) => {
    setBrandSelected(itemSelected);

    axios.get(`/api/model?brand=${itemSelected.value}`).then((response) => {
      const optionsModelSelect = response.data.Modelos.map((item) => ({
        label: item.Label,
        value: item.Value,
      }));
      setOptionsModels(optionsModelSelect);
      setDisableModel(false);
      setModelSelected(null);

      const optionsYearSelect = response.data.Anos.map((item) => ({
        label: item.Label,
        value: item.Value,
      }));
      setOptionsYears(optionsYearSelect);
      setDisableYear(false);
      setYearSelected(null);
    });
  };

  const onChangeModel = (itemSelected) => {
    setModelSelected(itemSelected);

    if (!yearSelected || !!car) {
      axios
        .get(
          `/api/yearByModel?brand=${brandSelected.value}&model=${itemSelected.value}`
        )
        .then((response) => {
          const optionsYearSelect = response.data.map((item) => ({
            label: item.Label,
            value: item.Value,
          }));
          setOptionsYears(optionsYearSelect);
          setDisableYear(false);
        });
    }
  };

  const onChangeYear = (itemSelected) => {
    setYearSelected(itemSelected);
    if (!modelSelected || !!car) {
      axios
        .get(
          `/api/modelByYear?brand=${brandSelected.value}&yearModel=${itemSelected.value}`
        )
        .then((response) => {
          const optionsModelSelect = response.data.map((item) => ({
            label: item.Label,
            value: item.Value,
          }));
          setOptionsModels(optionsModelSelect);
          setDisableModel(false);
        });
    }
  };

  const getImage = (termSearch) => {
    axios.get(`/api/image?q=${termSearch}`).then((response) => {
      setImageUrl(response.data.imageUrl);
    });
  };

  const onClickSearch = () => {
    axios
      .get(
        `/api/car?brand=${brandSelected.value}&model=${modelSelected.value}&yearModel=${yearSelected.value}`
      )
      .then((response) => {
        if (response.data.codigo !== "0") {
          setCar(response.data);
          const { Marca, Modelo, AnoModelo } = response.data;
          const termSearch = `${Marca} ${Modelo} ${AnoModelo}`;
          getImage(termSearch);
        } else {
          setCar(undefined);
          setImageUrl("");
        }
      });
  };

  return (
    <div>
      <Select
        options={optionsBrands}
        value={brandSelected}
        onChange={onChangeBrand}
        placeholder="Selecione uma marca"
      />
      <Select
        options={optionsModels}
        value={modelSelected}
        onChange={onChangeModel}
        placeholder="Selecione um modelo"
        isDisabled={disableModel}
      />
      <Select
        options={optionsYears}
        value={yearSelected}
        onChange={onChangeYear}
        placeholder="Selecione um ano"
        isDisabled={disableYear}
      />

      <button onClick={() => onClickSearch()}>Pesquisar</button>

      {car && (
        <S.Table className="table">
          <S.Tr className="tr">
            <S.Td bold>Código Fipe:</S.Td>
            <S.Td>{car.CodigoFipe}</S.Td>
          </S.Tr>
          <S.Tr>
            <S.Td bold>Marca:</S.Td>
            <S.Td>{car.Marca}</S.Td>
          </S.Tr>
          <S.Tr>
            <S.Td bold>Modelo:</S.Td>
            <S.Td>{car.Modelo}</S.Td>
          </S.Tr>
          <S.Tr>
            <S.Td bold>Ano Modelo:</S.Td>
            <S.Td>{car.AnoModelo}</S.Td>
          </S.Tr>
          <S.Tr>
            <S.Td bold>Preço Médio:</S.Td>
            <S.Td>{car.Valor}</S.Td>
          </S.Tr>

          {imageUrl && (
            <img
              style={{
                width: "400px",
              }}
              src={imageUrl}
              alt={car.Modelo}
            />
          )}
        </S.Table>
      )}
    </div>
  );
};

export default OptionsSearch;
