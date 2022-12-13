export function errorSend(
  first_number,
  second_number,
  third_number,
  four_number,
  nameUser,
  month,
  year,
  cvv
) {
  var errores_all = [];
  if (first_number == "####" || first_number == "") {
    errores_all.push(["error_credit_card_number_1", "Is required"]);
  }

  if (second_number == "####" || second_number == "") {
    errores_all.push(["error_credit_card_number_2", "Is required"]);
  }

  if (third_number == "####" || third_number == "") {
    errores_all.push(["error_credit_card_number_3", "Is required"]);
  }
  if (four_number == "####" || four_number == "") {
    errores_all.push(["error_credit_card_number_4", "Is required"]);
  }
  if (nameUser == "full name") {
    errores_all.push(["error_name", "Is required"]);
  }
  if (month == "MM") {
    errores_all.push(["error_month", "Is required"]);
  }
  if (year == "yy") {
    errores_all.push(["error_year", "Is required"]);
  }
  if (cvv == "###") {
    errores_all.push(["error_cvv", "Is required"]);
  }
  return errores_all;
}
