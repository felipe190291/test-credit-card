//sample basic encryption

export function encriptado(input) {
  let encripto = "456" + input.replace("2", "5") + "x" + "456";
  encripto.replace("45", "*").replace("x", "?");
  return encripto;
}
export function desencriptado(input) {
  let desencripto = input.replace("?", "x").replace("*", "45").slice(3, 6);

  return desencripto.replace("5", "2");
}
