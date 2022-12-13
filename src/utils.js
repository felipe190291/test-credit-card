import axios from "axios";
export function cambiotarget() {
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
}
export function createyear() {
  const dataNow = new Date().getFullYear();
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
}
export function createmonth() {
  const month = document.getElementById("monthCredit");

  if (month) {
    for (let i = 1; i < 13; i++) {
      let option = document.createElement("option");
      console.log(i);

      option.text = i < 10 ? "0" + i : i;
      option.value = i < 10 ? "0" + i : i;
      month.appendChild(option);
    }
  }
}
export function limit_characters(e) {
  if (e.target.value.length > 4) {
    e.target.value = e.target.value.slice(0, 4);
  }
}
export function limit_characters_cvv(e) {
  if (e.target.value.length > 3) {
    e.target.value = e.target.value.slice(0, 3);
  }
}

export function consultaCreditCard(first_number, second_number) {
  if (
    first_number != "####" &&
    first_number.length == 4 &&
    second_number != "####" &&
    second_number.length >= 2
  ) {
    return axios
      .get(
        `https://lookup.binlist.net/${first_number}${second_number.slice(0, 2)}`
      )
      .then((res) => {
        if (res.data) return res.data;
      })
      .catch((err) => "Error");
  }
}
export function imageSelected(id) {
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
export function addTable(inputs) {
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
        document.createTextNode("**** **** ****" + inputs.credit_card_number_4)
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
}
export function bankInfo(bankInformation, bool) {
  if (bool) {
    if (bankInformation.scheme == "maestro") {
      return <img src={process.env.PUBLIC_URL + "/img/MAESTRO.png"} alt="" />;
    } else if (bankInformation.scheme == "mastercard") {
      return (
        <img src={process.env.PUBLIC_URL + "/img/MASTERCARD.png"} alt="" />
      );
    } else if (bankInformation.scheme == "visa") {
      return <img src={process.env.PUBLIC_URL + "/img/visa.png"} alt="" />;
    } else if (bankInformation.scheme == "amex") {
      return <img src={process.env.PUBLIC_URL + "/img/AMEX.png"} alt="" />;
    } else {
      return <span className="margin-bankinfo">{bankInformation.scheme}</span>;
    }
  } else {
    if (bankInformation.bank.name) {
      if (bankInformation.bank.name == "BANCO DE OCCIDENTE, S.A.") {
        return [1, <span>{bankInformation.bank.name}</span>];
      } else if (bankInformation.bank.name == "BANCO DAVIVIENDA, S.A.") {
        return [
          3,
          <img src={process.env.PUBLIC_URL + "/img/davivienda.png"} alt="" />,
        ];
      } else if (bankInformation.bank.name == "BANCOLOMBIA, S.A.") {
        return [
          2,
          <img src={process.env.PUBLIC_URL + "/img/bancolombia.png"} alt="" />,
        ];
      } else {
        return [
          4,
          <span className="margin-bankinfo">{bankInformation.bank.name}</span>,
        ];
      }
    } else {
      return [null, null];
    }
  }
}
export function tabNumberCard(
  first_number,
  second_number,
  third_number,
  four_number
) {
  if (
    first_number.length == 4 &&
    first_number != "####" &&
    second_number == "####"
  ) {
    const tabOne = document.getElementById("preguntados");
    tabOne.focus();
  }
  if (
    second_number.length == 4 &&
    second_number != "####" &&
    third_number == "####"
  ) {
    const tabTwo = document.getElementById("preguntatres");
    tabTwo.focus();
  }
  if (
    third_number.length == 4 &&
    third_number != "####" &&
    four_number == "####"
  ) {
    const tabThree = document.getElementById("preguntacuatro");
    tabThree.focus();
  }
}
export const SetModalError = (props) => {
  const classes = props.className;
  const msgError = props.msg || "The number does not match a valid card.";
  const titleError = props.title || "Something went wrong.";
  const handleClick = props.handleClick;
  return (
    <ModalInfo
      error="true"
      handleClick={handleClick}
      title={titleError}
      text={msgError}
      classesMsg={classes}
    />
  );
};
export const ModalInfo = (props) => {
  const title = props.title;
  const display = props.display || "flex";
  const position = props.position || "fixed";
  const text = props.text || "none";
  let styleModal = {
    display: display,
    position: position,
    whiteSpace: "pre-line",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0 8%",
  };

  function handleClick(event) {
    props.handleClick();
  }

  const classesMsg = props.classesMsg || null;
  return (
    <div
      className="modalInfo justify-content-center align-items-center"
      style={styleModal}
    >
      <div className={"modalInfoContenido"}>
        <div className={"title"}>{title}</div>

        <div className={"title my-0"}>{text}</div>

        <div className=" my-1">
          <button className="btnAction  py-2" onClick={handleClick}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};
