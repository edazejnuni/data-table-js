// [x] get the value of each input
// [x] check if there are datas, if not show message
// [x] do the checks on age, email, contact preference
// 1. age <= 120
// 2. email valid
// 3. at least 1 contact preference selected
// [x] we need to create
// 1. <table></table>
// 2. <thead></thead>
// 3. <thead></thead>
// 4. <tr></tr>
// 5. <th></th>
// 6. <tbody></tbody>
// 7. <tr></tr>
// 8. <td></td>
// 9. delete buton
// [x] show the datas in the table
// [x] create export button
// [x] generate json from the table data
// [x] show modal and add the json there

import { showExportModal } from "./js/exportData";
import { showFormData } from "./js/tableOperations";

const exportData = document.getElementById("exportData");

// add event listener to the export button
const exportButton = document.createElement("button");
exportButton.innerHTML = "Export";
exportButton.onclick = showExportModal;
exportData.appendChild(exportButton);

// add event listener to the submit button
document.getElementById("submitButton").addEventListener("click", showFormData);
