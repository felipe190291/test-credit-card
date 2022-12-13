import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import encriptado from "./encriptado";
function App() {
  useEffect(() => {
    var input_cvv = document.querySelector(".cvv-input");

    if (input_cvv) {
      input_cvv.addEventListener("mouseenter", () => {
        document.querySelector(".front").style.transform =
          "perspective(1000px) rotateY(-180deg)";
        document.querySelector(".back").style.transform =
          "perspective(1000px) rotateY(0deg)";
      });
      input_cvv.addEventListener("mouseleave", () => {
        document.querySelector(".front").style.transform =
          "perspective(1000px) rotateY(0deg)";
        document.querySelector(".back").style.transform =
          "perspective(1000px) rotateY(180deg)";
      });
    }
  });
  const [backgroundCard, setbackgroundCard] = useState(null);
  const [backgroundCardLogo, setbackgroundLogo] = useState(null);
  const [logoCompanie, setlogoCompanie] = useState(null);
  const [bankInformation, setBankInformation] = useState(null);
  const dataNow = new Date().getFullYear();
  useEffect(() => {
    const year = document.getElementById("yearCredit");

    if (year) {
      for (let i = 0; i < 10; i++) {
        let option = document.createElement("option");
        console.log(i);

        option.text = dataNow + i;
        option.value = dataNow + i;
        year.appendChild(option);
      }
    }
  }, []);
  useEffect(() => {
    if (bankInformation) {
      if (bankInformation.bank.name == "BANCO DE OCCIDENTE, S.A.") {
        setbackgroundCard(1);
        setlogoCompanie(<span>{bankInformation.bank.name}</span>);
      } else if (bankInformation.bank.name == "BANCO DAVIVIENDA, S.A.") {
        setbackgroundCard(3);
        setlogoCompanie(
          <img src={process.env.PUBLIC_URL + "/img/davivienda.png"} alt="" />
        );
      } else if (bankInformation.bank.name == "BANCOLOMBIA, S.A.") {
        setbackgroundCard(2);
        setlogoCompanie(
          <img src={process.env.PUBLIC_URL + "/img/bancolombia.png"} alt="" />
        );
      } else {
        setbackgroundCard(4);
        setlogoCompanie(
          <span className="margin-bankinfo">{bankInformation.bank.name}</span>
        );
      }
    }
  }, [bankInformation]);
  useEffect(() => {
    if (bankInformation) {
      console.log(bankInformation);
      if (bankInformation.scheme == "maestro") {
        setbackgroundLogo(
          <img src={process.env.PUBLIC_URL + "/img/MAESTRO.png"} alt="" />
        );
      } else if (bankInformation.scheme == "martercard") {
        setbackgroundLogo(
          <img src={process.env.PUBLIC_URL + "/img/MASTERCARD.png"} alt="" />
        );
      } else if (bankInformation.scheme == "visa") {
        setbackgroundLogo(
          <img src={process.env.PUBLIC_URL + "/img/visa.png"} alt="" />
        );
      } else if (bankInformation.scheme == "amex") {
        setbackgroundLogo(
          <img src={process.env.PUBLIC_URL + "/img/AMEX.png"} alt="" />
        );
      } else {
        setbackgroundLogo(
          <span className="margin-bankinfo">{bankInformation.scheme}</span>
        );
      }
    }
  }, [bankInformation]);

  function limit_characters(e) {
    if (e.target.value.length > 4) {
      e.target.value = e.target.value.slice(0, 4);
    }
  }
  function limit_characters_cvv(e) {
    if (e.target.value.length > 3) {
      e.target.value = e.target.value.slice(0, 3);
    }
  }

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
    let first_number = inputs["credit_card_number_1"];
    let second_number = inputs["credit_card_number_2"];

    // 540625
    if (
      first_number != "####" &&
      first_number.length == 4 &&
      second_number != "####" &&
      second_number.length >= 2
    ) {
      axios
        .get(
          `https://lookup.binlist.net/${first_number}${second_number.slice(
            0,
            2
          )}`
        )
        .then((res) => {
          if (res.data) setBankInformation(res.data);
        })
        .catch((err) => console.log(err.response));
    }
  }, [inputs["credit_card_number_1"], inputs["credit_card_number_2"]]);
  function addTable() {
    var myTableDiv = document.getElementById("listContainer");

    var table = document.createElement("TABLE");
    table.width = "80%";
    table.style.margin = "auto";
    table.border = "1";

    var tableBody = document.createElement("TBODY");
    table.appendChild(tableBody);

    var tr = document.createElement("TR");
    tableBody.appendChild(tr);
    for (let i = 0; i < 3; i++) {
      var td = document.createElement("TD");
      td.width = "33%";
      if (i === 0) {
        td.appendChild(
          document.createTextNode(
            "**** **** ****" + inputs.credit_card_number_4
          )
        );
      } else if (i === 1) {
        td.appendChild(document.createTextNode(inputs.name));
      } else {
        td.appendChild(
          document.createTextNode(inputs.month + "/" + inputs.year.slice(-2))
        );
      }
      tr.appendChild(td);
    }
    myTableDiv.appendChild(table);
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
  function sendform(e) {
    e.preventDefault();
    if (
      inputs["credit_card_number_1"] == "####" ||
      inputs["credit_card_number_2"] == "####" ||
      inputs["credit_card_number_3"] == "####" ||
      inputs["credit_card_number_4"] == "####" ||
      inputs["name"] == "full name" ||
      inputs["month"] == "MM" ||
      inputs["year"] == "yy" ||
      inputs["cvv"] == "###"
    ) {
      if (inputs["credit_card_number_1"] == "####") {
        handleChange_error("error_credit_card_number_1", "Is required");
        setTimeout(() => {
          handleChange_error("error_credit_card_number_1", null);
        }, 1000);
      }

      if (inputs["credit_card_number_2"] == "####") {
        handleChange_error("error_credit_card_number_2", "Is required");
        setTimeout(() => {
          handleChange_error("error_credit_card_number_2", null);
        }, 1000);
      }
      if (inputs["credit_card_number_3"] == "####") {
        handleChange_error("error_credit_card_number_3", "Is required");
        setTimeout(() => {
          handleChange_error("error_credit_card_number_3", null);
        }, 1000);
      }
      if (inputs["credit_card_number_4"] == "####") {
        handleChange_error("error_credit_card_number_4", "Is required");
        setTimeout(() => {
          handleChange_error("error_credit_card_number_4", null);
        }, 1000);
      }
      if (inputs["name"] == "full name") {
        handleChange_error("error_name", "Is required");
        setTimeout(() => {
          handleChange_error("error_name", null);
        }, 1000);
      }
      if (inputs["month"] == "MM") {
        handleChange_error("error_month", "Is required");
        setTimeout(() => {
          handleChange_error("error_month", null);
        }, 1000);
      }
      if (inputs["year"] == "yy") {
        handleChange_error("error_year", "Is required");
        setTimeout(() => {
          handleChange_error("error_year", null);
        }, 1000);
      }
      if (inputs["cvv"] == "###") {
        handleChange_error("error_cvv", "Is required");
        setTimeout(() => {
          handleChange_error("error_cvv", null);
        }, 1000);
      }
    } else {
      addTable();
    }
  }
  var handleChange_error = (name, value) => {
    setInputsError((val) => ({ ...val, [name]: value }));
  };
  var handleChange = (event) => {
    var usercard = document.getElementById("i_one");
    console.log(usercard.dataset);
    let name = event.target.name;
    let value = event.target.value;
    setInputs((val) => ({ ...val, [name]: value }));
  };
  function imageSelected(id) {
    if (id) {
      switch (id) {
        case 1:
          return {
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/img/fondo_1.jpg"
            })`,
          };
        case 2:
          return {
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/img/fondo_2.jpg"
            })`,
          };
        case 3:
          return {
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/img/fondo_3.jpg"
            })`,
          };
        default:
          return {
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/img/fondo_4.jpg"
            })`,
          };
      }
    } else {
      return {
        background:
          "linear-gradient(-45deg, rgba(238,119,82,1), rgba(255,47,115,1),rgba(67,118,255,1), rgba(35,213,171,1))",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      };
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
                  valueMissing="dsds"
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
                  id=""
                  defaultValue={"month"}
                  className="month-input"
                  name="month"
                  onChange={handleChange}
                >
                  <option value="">month</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
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
                  <option value="">year</option>
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
            <input
              type="submit"
              value="submit DETAILS"
              className="submit-btn elevation-12"
            />
          </form>
        </div>
      </div>
      <div id="listContainer"></div>
    </div>
  );
}

export default App;
