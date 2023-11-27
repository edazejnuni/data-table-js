import { isValidEmail } from "./formValidation";
import { createModal } from "./modalOperations";

let table = null;
const displayData = document.getElementById("displayData");

export function showFormData() {
  // Get the input values
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;
  const selectColor = document.getElementById("selectColor").value;
  const checkEmail = document.getElementById("checkEmail").checked;
  const checkPhone = document.getElementById("checkPhone").checked;
  const checkSMS = document.getElementById("checkSMS").checked;
  console.log(validAge);
  // validate age
  const validAge = Number(age) <= 120 && age !== "";
  if (!validAge) {
    alert("Please enter a valid age (less than or equal to 120).");
    return;
  }
  // Check if email is valid
  const validEmail = isValidEmail(email);
  if (!validEmail) {
    alert("Please enter a valid email address.");
    return;
  }
  // Check at least one contact preference is selected
  if (!(checkEmail || checkPhone || checkSMS)) {
    alert("Please select at least one contact method.");
    return;
  }
  //do the check if there is no data
  const hasData =
    name ||
    surname ||
    age ||
    email ||
    selectColor ||
    checkEmail ||
    checkPhone ||
    checkSMS;
  if (!hasData) {
    displayData.innerHTML = "<p>No data to display.</p>";
    if (table) {
      table.remove();
      table = null;
    }
    return;
  }

  // create table if it doesnt exist
  if (!table) {
    table = document.createElement("table");
    const tableHead = table.createTHead();
    const headerRow = tableHead.insertRow();
    const headers = [
      "Name",
      "Surname",
      "E-mail",
      "Age",
      "Selected Color",
      "Contact method",
      "Action",
    ];

    headers.forEach((headerTitle) => {
      const th = document.createElement("th");
      th.appendChild(document.createTextNode(headerTitle));
      headerRow.appendChild(th);
    });
    displayData.innerHTML = "";
    displayData.appendChild(table);
  }

  // Create table body if it doesnt exist
  let tableBody = table.querySelector("tbody");
  if (!tableBody) {
    tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
  }

  // Create a new row
  const bodyRow = tableBody.insertRow();

  // Insert data into the row cells
  [name, surname, email, age, selectColor].forEach((data) => {
    const cell = bodyRow.insertCell();
    cell.appendChild(document.createTextNode(data));
  });

  // insert checkbox labels
  const checkBoxCell = bodyRow.insertCell();
  //the user can choose more so we create an array and push the choices there
  const selectedMethods = [];

  if (checkEmail) {
    selectedMethods.push("By email");
  }
  if (checkPhone) {
    selectedMethods.push("By phone");
  }
  if (checkSMS) {
    selectedMethods.push("Via SMS");
  }

  if (selectedMethods.length > 0) {
    const contactMethodText = selectedMethods.join(", "); // join selected methods with commas
    checkBoxCell.appendChild(document.createTextNode(contactMethodText));
  }
  // create delete button
  const deleteCell = bodyRow.insertCell();
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.onclick = function () {
    //create modal
    const modal = createModal();
    //create ok and close buttons
    const modalOkButton = modal.querySelector("#modalOkButton");
    const modalCloseButton = modal.querySelector("#modalCloseButton");

    //create function to set the action on click of delete
    modalOkButton.onclick = function () {
      // remove the row on click of ok
      tableBody.removeChild(bodyRow);
      if (tableBody.rows.length === 0) {
        displayData.innerHTML = "<p>No data to display.</p>";
        table.remove();
        table = null;
      }
      // close the modal
      modal.remove();
    };
    // close modal on click of close
    modalCloseButton.onclick = function () {
      modal.remove();
    };

    // Append the modal to the body
    document.body.appendChild(modal);
  };
  deleteCell.appendChild(deleteButton);

  // clear input values after the submit
  document.getElementById("name").value = "";
  document.getElementById("surname").value = "";
  document.getElementById("age").value = "";
  document.getElementById("email").value = "";
  document.getElementById("selectColor").value = "";
  document.getElementById("checkEmail").checked = false;
  document.getElementById("checkPhone").checked = false;
  document.getElementById("checkSMS").checked = false;
}
