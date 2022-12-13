import "./CreditCardComponent.css";
import { useEffect, useState } from "react";
import encriptado from "./encriptado";
import {
  addTable,
  bankInfo,
  cambiotarget,
  consultaCreditCard,
  createmonth,
  createyear,
  imageSelected,
  limit_characters,
  limit_characters_cvv,
  SetModalError,
  tabNumberCard,
} from "./utils";
import { errorSend } from "./errorSend";

const CreditCardComponent = () => {
  const [backgroundCard, setbackgroundCard] = useState(null);
  const [backgroundCardLogo, setbackgroundLogo] = useState(null);
  const [logoCompanie, setlogoCompanie] = useState(null);
  const [bankInformation, setBankInformation] = useState(null);
  const [Modal, setModal] = useState(null);
  const [inputsError, setInputsError] = useState({
    error_credit_card_number_1: null,
    error_credit_card_number_2: null,
    error_credit_card_number_3: null,
    error_credit_card_number_4: null,
    error_name: null,
    error_month: null,
    error_year: null,
    error_cvv: null,
  });
  const [inputs, setInputs] = useState({
    credit_card_number_1: "####",
    credit_card_number_2: "####",
    credit_card_number_3: "####",
    credit_card_number_4: "####",
    name: "full name",
    month: "MM",
    year: "yy",
    cvv: "###",
  });
  useEffect(() => {
    cambiotarget(); // tranform credit card
  });
  const hideModal = () => {
    setModal(null);
  };
  useEffect(() => {
    createyear(); // create options year
    createmonth(); // create options month
  }, []);

  useEffect(() => {
    let first_number = inputs["credit_card_number_1"];
    let second_number = inputs["credit_card_number_2"];
    async function validar(first_number, second_number) {
      const resultado = await consultaCreditCard(first_number, second_number);
      if (resultado === "Error") {
        setModal(<SetModalError handleClick={hideModal} />);
      } else {
        setBankInformation(resultado);
      }
    }
    validar(first_number, second_number); //validate info credit card
  }, [inputs["credit_card_number_1"], inputs["credit_card_number_2"]]);
  useEffect(() => {
    let first_number = inputs["credit_card_number_1"];
    let second_number = inputs["credit_card_number_2"];
    let third_number = inputs["credit_card_number_3"];
    let four_number = inputs["credit_card_number_4"];
    tabNumberCard(first_number, second_number, third_number, four_number); //tab number confort user
  }, [
    inputs["credit_card_number_1"],
    inputs["credit_card_number_2"],
    inputs["credit_card_number_3"],
    inputs["credit_card_number_4"],
  ]);
  useEffect(() => {
    if (bankInformation) {
      setbackgroundLogo(bankInfo(bankInformation, true)); //set type logo
      setbackgroundCard(bankInfo(bankInformation, false)[0]); //set background company
      setlogoCompanie(bankInfo(bankInformation, false)[1]); //   set logo company;
    }
  }, [bankInformation]);
  var handleChange_error = (name, value) => {
    setInputsError((val) => ({ ...val, [name]: value }));
  };
  var handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setInputs((val) => ({ ...val, [name]: value }));
  };
  function sendform(e) {
    e.preventDefault();
    let first_number = inputs["credit_card_number_1"];
    let second_number = inputs["credit_card_number_2"];
    let third_number = inputs["credit_card_number_3"];
    let four_number = inputs["credit_card_number_4"];
    let nameUser = inputs["name"];
    let month = inputs["month"];
    let year = inputs["year"];
    let cvv = inputs["cvv"];
    let lengthcreditcard =
      first_number + second_number + third_number + four_number;
    if (
      first_number == "####" ||
      second_number == "####" ||
      third_number == "####" ||
      four_number == "####" ||
      nameUser == "full name" ||
      month == "MM" ||
      year == "yy" ||
      cvv == "###"
    ) {
      var result = errorSend(
        first_number,
        second_number,
        third_number,
        four_number,
        nameUser,
        month,
        year,
        cvv
      );

      result.forEach((e) => {
        handleChange_error(e[0], e[1]);
        setTimeout(() => {
          handleChange_error(e[0], null);
        }, 1000);
      });
    } else if (lengthcreditcard.length < 16) {
      setModal(
        <SetModalError
          title="
        Please review"
          handleClick={hideModal}
          msg="Must have at least 16 numbers."
        />
      );
    } else {
      addTable(inputs);
      setInputs({
        credit_card_number_1: "####",
        credit_card_number_2: "####",
        credit_card_number_3: "####",
        credit_card_number_4: "####",
        name: "full name",
        month: "MM",
        year: "yy",
        cvv: "###",
      });
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <div className="container">
          <div className="card-container">
            <div className="front" style={imageSelected(backgroundCard)}>
              <div className="image">
                {logoCompanie ? (
                  logoCompanie
                ) : (
                  <span className="margin-bankinfo">BANK_NAME</span>
                )}
              </div>
              <div className="image_down">
                <img src={process.env.PUBLIC_URL + "/img/chip2.png"} alt="" />
                <img src={process.env.PUBLIC_URL + "/img/chip.png"} alt="" />
              </div>
              <div className="card-number-box">
                {inputs["credit_card_number_1"].length > 0
                  ? inputs["credit_card_number_1"]
                  : "####"}
                {"  "}
                {inputs["credit_card_number_2"].length > 0
                  ? inputs["credit_card_number_2"]
                  : "####"}{" "}
                {"  "}
                {inputs["credit_card_number_3"].length > 0
                  ? inputs["credit_card_number_3"]
                  : "####"}{" "}
                {"  "}
                {inputs["credit_card_number_4"].length > 0
                  ? inputs["credit_card_number_4"]
                  : "####"}
              </div>
              <div className="flexbox">
                <div className="box text-left">
                  <span>card holder</span>
                  <div className="card-holder-name">
                    {inputs["name"].length > 0 && inputs["name"].length < 19
                      ? inputs["name"]
                      : inputs["name"].length > 18 && inputs["name"].length
                      ? inputs["name"].slice(0, 18) + ".."
                      : "full name"}
                  </div>
                </div>
                <div className="box mx-auto text-left">
                  <span>VALID THRU</span>
                  <div className="expiration">
                    <span className="exp-month">{inputs["month"]}/</span>
                    <span className="exp-year">{inputs["year"].slice(-2)}</span>
                  </div>
                </div>
                <div className="box logo-company">
                  {backgroundCardLogo ? (
                    backgroundCardLogo
                  ) : (
                    <span>IMAGE_REF</span>
                  )}
                </div>
              </div>
            </div>

            <div className="back">
              <div className="stripe"></div>
              <div className="box">
                <span>cvv</span>
                <div className="cvv-box">
                  {inputs["cvv"].length > 0 ? inputs["cvv"] : "###"}
                </div>
                <img src="image/visa.png" alt="" />
              </div>
            </div>
          </div>

          <form onSubmit={sendform}>
            <div className="text-left color-credit"> credit card number</div>
            <div className="flexbox inputs-all">
              <div className="inputBox top-level">
                <input
                  id="i_one"
                  data-credit_card_number_1={encriptado(
                    inputs["credit_card_number_1"]
                  )}
                  type="number"
                  className="card-number-input"
                  name="credit_card_number_1"
                  onInput={(e) => {
                    limit_characters(e);
                  }}
                  onChange={handleChange}
                />
                {inputsError["error_credit_card_number_1"] ? (
                  <span className="error-span">
                    {inputsError["error_credit_card_number_1"]}
                  </span>
                ) : null}
              </div>{" "}
              <div className="inputBox top-level ">
                <input
                  id="preguntados"
                  type="number"
                  className="card-number-input"
                  onInput={(e) => {
                    limit_characters(e);
                  }}
                  name="credit_card_number_2"
                  onChange={handleChange}
                />
                {inputsError["error_credit_card_number_2"] ? (
                  <span className="error-span">
                    {inputsError["error_credit_card_number_2"]}
                  </span>
                ) : null}
              </div>{" "}
              <div className="inputBox  top-level">
                <input
                  id="preguntatres"
                  type="number"
                  className="card-number-input"
                  onInput={(e) => {
                    limit_characters(e);
                  }}
                  name="credit_card_number_3"
                  onChange={handleChange}
                />
                {inputsError["error_credit_card_number_3"] ? (
                  <span className="error-span">
                    {inputsError["error_credit_card_number_3"]}
                  </span>
                ) : null}
              </div>{" "}
              <div className="inputBox top-level">
                <input
                  id="preguntacuatro"
                  type="number"
                  className="card-number-input"
                  onInput={(e) => {
                    limit_characters(e);
                  }}
                  name="credit_card_number_4"
                  onChange={handleChange}
                />
                {inputsError["error_credit_card_number_4"] ? (
                  <span className="error-span">
                    {inputsError["error_credit_card_number_4"]}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="inputBox">
              <span className="text-left">card holder name</span>
              <input
                type="text"
                className="card-holder-input"
                name="name"
                onChange={handleChange}
              />
              {inputsError["error_name"] ? (
                <span className="error-span">{inputsError["error_name"]}</span>
              ) : null}
            </div>
            <div className="flexbox">
              <div className="inputBox inputBox-valid text-align-left">
                <span className="text-left">VALID THRU</span>
                <select
                  id="monthCredit"
                  defaultValue={"month"}
                  className="month-input"
                  name="month"
                  onChange={handleChange}
                >
                  <option value="MM">month</option>
                </select>
                {inputsError["error_month"] ? (
                  <span className="error-span">
                    {inputsError["error_month"]}
                  </span>
                ) : null}
              </div>
              <div className="inputBox inputBox-valid">
                <span className="year-input-span"></span>
                <select
                  name="year"
                  defaultValue={"year"}
                  id="yearCredit"
                  className="year-input"
                  onChange={handleChange}
                >
                  <option value="yy">year</option>
                </select>
                {inputsError["error_year"] ? (
                  <span className="error-span">
                    {inputsError["error_year"]}
                  </span>
                ) : null}
              </div>
              <div className="inputBox inputBox-valid">
                <span>cvv</span>
                <input
                  name="cvv"
                  onInput={(e) => {
                    limit_characters_cvv(e);
                  }}
                  type="number"
                  className="cvv-input"
                  onChange={handleChange}
                />
                {inputsError["error_cvv"] ? (
                  <span className="error-span">{inputsError["error_cvv"]}</span>
                ) : null}
              </div>
            </div>
            <button type="submit" className="submit-btn elevation-12">
              Send
            </button>
          </form>
        </div>
      </div>
      <div id="listContainer"></div>
      {Modal}
    </div>
  );
};
export default CreditCardComponent;
