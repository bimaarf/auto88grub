import React from "react";

const NumberFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

export const CurrentFormat = ({ value }) => {
  const formattedPrice = NumberFormat.format(value);
  return <>{formattedPrice}</>;
};
