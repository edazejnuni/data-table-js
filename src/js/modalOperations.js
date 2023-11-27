export function createModal() {
  // create the modal structure
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
        <p>Are you sure you want to delete this row?</p>
        <div class="modal-buttons">
          <button id="modalOkButton">Ok</button>
          <button id="modalCloseButton" class="close">Close</button>
        </div>
        </div>
      </div>
    `;
  return modal;
}
