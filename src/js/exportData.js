import { createModal } from "./modalOperations";

export function generateJSONData() {
  const tableRows = Array.from(document.querySelectorAll("table tbody tr"));
  //get the data from each table row and show them
  const rowData = tableRows.map((row) => {
    const cells = Array.from(row.cells);
    const cellData = cells.map((cell) => cell.textContent.trim());
    console.log(cellData);
    return {
      Name: cellData[0],
      Surname: cellData[1],
      Email: cellData[2],
      Age: cellData[3],
      "Selected Color": cellData[4],
      "Contact Method": cellData[5],
    };
  });
  console.log(JSON.stringify(rowData, null, 2));
  return JSON.stringify(rowData, null, 2);
}

export function showExportModal() {
  const jsonData = generateJSONData();

  const exportModal = createModal();
  const modalContent = exportModal.querySelector(".modal-content");

  const jsonTextArea = document.createElement("textarea");
  jsonTextArea.value = jsonData;
  jsonTextArea.setAttribute("readonly", true);
  jsonTextArea.style.width = "100%";
  jsonTextArea.style.height = "200px";
  jsonTextArea.style.resize = "none";

  const closeButton = document.createElement("button");
  closeButton.innerHTML = "Close";
  closeButton.onclick = function () {
    exportModal.remove();
  };

  modalContent.innerHTML = ""; // clear any existing content
  modalContent.appendChild(jsonTextArea);
  modalContent.appendChild(closeButton);

  document.body.appendChild(exportModal);
}
