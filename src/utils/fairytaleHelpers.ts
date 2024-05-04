import moment from "moment/moment";
import { IApp } from "../types/app";
import { ISelectOption } from "../components/fairytale-table/SelectFilter";
import { CHARTS_PALETTE } from "../constants";

export const formatDateTimeToFromNow = (value: string) => {
  return moment(value).fromNow();
};

export const isDateTime = (value: string): boolean => {
  const valueDate = new Date(value);
  // @ts-ignore
  return valueDate instanceof Date && !isNaN(valueDate);
};

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formNameFormatter = (formName: string, separator: string) => {
  let formattedName = "";
  let formNameArr = formName.split(separator);
  formattedName = formNameArr.reverse().reduceRight((accumulator, currentValue) => {
    accumulator = capitalizeFirstLetter(accumulator).concat(" ");
    return accumulator.concat(currentValue);
  });
  return formattedName;
};

export const formNameFormatterCamel = (formName: string, separator: string) => {
  let formattedName = "";
  let formNameArr = formName.split(separator);
  formattedName = formNameArr.reverse().reduceRight((accumulator, currentValue) => {
    currentValue = capitalizeFirstLetter(currentValue);
    return accumulator.concat(currentValue);
  });
  return formattedName;
};

export const formatAppsDataToTableSelectData = (
  appsArray: IApp[],
  valueFieldname?: string,
  labelFieldName?: string,
  InitialValueLabelname?: string
) => {
  let selectOptions: Array<ISelectOption> = [{ value: "null", label: InitialValueLabelname }];
  if (appsArray.length === 0 || appsArray === undefined) return selectOptions;
  appsArray.forEach((app: IApp) => {
    // @ts-ignore
    const { labelFieldName, valueFieldname } = app;
    selectOptions.push({
      label: labelFieldName,
      value: valueFieldname,
    });
  });
  return selectOptions;
};

export const FilterArrayByString = (
  arrayOfObjectsToFilter: Array<object>,
  stringToFilterBy: string | any,
  objectPropertyToFilter: string
) => {
  return arrayOfObjectsToFilter.filter((objectToFilter) => {
    // @ts-ignore
    return objectToFilter[objectPropertyToFilter] === stringToFilterBy;
  })[0];
};

export const generateRandomChartColors = (numberOfColors: number) => {
  const _colorOptions = Object.keys(CHARTS_PALETTE);
  let arrayOfColors: string[] = [];
  Array.from({ length: numberOfColors }).forEach(() => {
    const colorName: string = _colorOptions[Math.floor(Math.random() * _colorOptions.length)];
    // @ts-ignore
    const color: string = CHARTS_PALETTE[colorName];
    arrayOfColors.push(color);
  });
  return arrayOfColors;
};

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
