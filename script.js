function tableSetup() {
  let row = document.querySelector("#rows");
  let totalRows = row.value;
  console.log(totalRows);
  let col = document.querySelector("#columns");
  let totalColumns = col.value;
  console.log(totalColumns);
  let container = document.querySelector("#tableDiv");

  const table = document.createElement("table");
  function createRow() {
    for (let i = 0; i < totalRows; i++) {
      const row = document.createElement("tr");

      for (let a = 0; a < totalColumns; a++) {
        const cell = document.createElement("td");
        cell.contentEditable = true;

        cell.addEventListener("blur", function () {
          this.setAttribute("data-tab", this.textContent);
        });

        cell.addEventListener("keypress", function (event) {
          if (event.key === "Enter") {
            event.preventDefault();
            this.setAttribute("data-tab", this.textContent);
            this.blur();
          }
        });

        row.appendChild(cell);
      }

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "x";
      deleteBtn.onclick = function () {
        table.removeChild(row);
      };

      const buttonCel = document.createElement("td");
      buttonCel.appendChild(deleteBtn);
      row.appendChild(buttonCel);

      table.appendChild(row);
    }
  }

  function createHeader() {
    const header = document.createElement("tr");
    for (let i = 0; i < totalColumns; i++) {
      const headerCel = document.createElement("th");
      headerCel.textContent = `Header ${i + 1}`;
      headerCel.contentEditable = true;
      const deleteColBtn = document.createElement("button");
      deleteColBtn.textContent = "x";
      deleteColBtn.onclick = function () {
        for (let rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
          table.rows[rowIndex].deleteCell(i);
        }
      };

      headerCel.appendChild(deleteColBtn);
      header.appendChild(headerCel);
    }

    table.insertBefore(header, table.firstChild);
  }

  createRow();
  createHeader();
  container.appendChild(table);
}
