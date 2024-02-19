import React from "react";

const NumberFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

export const CurrentXFormat = ({ value }) => {
  const formattedPrice = NumberFormat.format(value);

  // Extracting currency symbol and the numeric part
  const [, currencySymbol, numericPart] = formattedPrice.match(/(\D+)(\d.*)/);

  // Replacing the second digit (tens place) with 'x' in the hundreds of millions place
  let modifiedNumericPart = numericPart;
  if (numericPart.length > 8) {
    modifiedNumericPart =
      numericPart.slice(0, -10) + "x" + numericPart.slice(-9);
  }

  // Construct the modified formatted price
  const modifiedFormattedPrice = currencySymbol + modifiedNumericPart;

  return <>{modifiedFormattedPrice}</>;
};
