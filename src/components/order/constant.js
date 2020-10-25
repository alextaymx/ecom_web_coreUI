import { getCountryAPI } from "../../apiCalls/get";

export const ORDER_TYPE = {
  Purchase_Order: 1,
  Sales_Order: 2,
};

export const ORDER_OPTIONS = [
  { label: "Purchase Order", value: 1 },
  { label: "Sales Order", value: 2 },
];
