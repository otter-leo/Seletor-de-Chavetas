class selChav {
  static profiles = [
    { name: "2x2", dia: 8,  b: 2,  h: 2,  t1: 1.2, t2: 1.0 },
    { name: "3x3", dia: 10, b: 3,  h: 3,  t1: 1.8, t2: 1.4 },
    { name: "4x4", dia: 12, b: 4,  h: 4,  t1: 2.5, t2: 1.8 },
    { name: "5x5", dia: 17, b: 5,  h: 5,  t1: 3.0, t2: 2.3 },
    { name: "6x6", dia: 22, b: 6,  h: 6,  t1: 3.5, t2: 2.8 },
    { name: "8x7", dia: 30, b: 8,  h: 7,  t1: 4.0, t2: 3.3 },
    { name: "10x8", dia: 38, b: 10, h: 8,  t1: 5.0, t2: 3.3 },
    { name: "12x8", dia: 44, b: 12, h: 8,  t1: 5.0, t2: 3.3 },
    { name: "14x9", dia: 50, b: 14, h: 9,  t1: 5.5, t2: 3.8 },
    { name: "16x10", dia: 58, b: 16, h: 10, t1: 6.0, t2: 4.3 },
    { name: "18x11", dia: 65, b: 18, h: 11, t1: 7.0, t2: 4.4 },
    { name: "20x12", dia: 75, b: 20, h: 12, t1: 7.5, t2: 4.9 },
    { name: "22x14", dia: 85, b: 22, h: 14, t1: 9.0, t2: 5.4 },
    { name: "25x14", dia: 95, b: 25, h: 14, t1: 9.0, t2: 5.4 },
    { name: "28x16", dia: 110, b: 28, h: 16, t1: 10.0, t2: 6.4 },
    { name: "32x18", dia: 130, b: 32, h: 18, t1: 11.0, t2: 7.4 },
    { name: "36x20", dia: 150, b: 36, h: 20, t1: 12.0, t2: 8.4 },
    { name: "40x22", dia: 170, b: 40, h: 22, t1: 13.0, t2: 9.4 },
    { name: "45x25", dia: 200, b: 45, h: 25, t1: 15.0, t2: 10.4 },
    { name: "50x28", dia: 230, b: 50, h: 28, t1: 17.0, t2: 11.4 },
    { name: "56x32", dia: 260, b: 56, h: 32, t1: 20.0, t2: 12.4 }
  ];

  constructor({ comp, larg, alt, tp, dia, calcEixo, calcCubo, t1, t2, inpDia, varCom}) {
    this.comp = "";
    this.larg = "";
    this.alt = "";
    this.tp = tp;
    this.dia = dia;
    this.comLar = "";
    this.calcEixo = "";
    this.calcCubo = "";
    this.t1 = "";
    this.t2 = "";
    this.inpDia = ""
    this.varCom= varCom;
  }

  diaSel() {
    for (const rule of selChav.profiles) {
      if (this.dia <= rule.dia) {
        this.comLar = rule.name;
        this.larg = rule.b;
        this.alt = rule.h;
        this.t1 = rule.t1;
        this.t2 = rule.t2;
        return;
      }
    }
    this.comLar = "no match";
  }

  calcDim(){
    this.inpDia = parseFloat(document.getElementById("dia1").value);
    this.calcCubo = (this.inpDia + this.t2);
    this.calcEixo = (this.inpDia - this.t1);
    return;
  }

}    

function calc1(){
  //alert("erro1")
  let valChavPerf = parseFloat(document.getElementById("dia1").value);
  const exeCalc1 = new selChav({
    dia: valChavPerf
  });

  exeCalc1.diaSel();
  exeCalc1.calcDim();
  selTp();
  filterCSV();
  //alert("erro2")
  
  document.getElementById("valChavPerf").textContent = exeCalc1.comLar;
  document.getElementById("valChavPerf2").textContent = exeCalc1.comLar;
  document.getElementById("larg").textContent = exeCalc1.larg;
  document.getElementById("alt").textContent = exeCalc1.alt;
  document.getElementById("t1").textContent = exeCalc1.t1;
  document.getElementById("t2").textContent = exeCalc1.t2;
  document.getElementById("calcCubo").textContent = exeCalc1.calcCubo;
  document.getElementById("calcEixo").textContent = exeCalc1.calcEixo;
  document.getElementById("profileFilter").textContent = exeCalc1.comLar;
  
 
}
  

function pgItens() {
  console.log("Button clicked!");
  window.location.href = "pgItens.html";
}


function selTp(){
  let valSel
  valSel = document.getElementById("tpSel").value
  //alert(valSel)
  document.getElementById("tp").textContent = valSel
  document.getElementById("comp2").textContent = document.getElementById("comp").value
}


function filterCSV(){

}  



//--- CSV
let csvData = [];
let headers = [];

// Load CSV file
document.getElementById("csvFileInput").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    csvData = parseCSV(text);
    renderTable(csvData);
  };

  reader.readAsText(file);
});

// Parse CSV safely
function parseCSV(text) {
  const rows = text
    .split("\n")
    .map(r => r.trim())
    .filter(r => r.length > 0);

  headers = rows[0].split(",").map(h => h.trim());

  return rows.slice(1).map(row => {
    const values = row.split(",").map(v => v.trim());
    let obj = {};

    headers.forEach((h, i) => {
      obj[h] = values[i];
    });

    return obj;
  });
}

// Render table
function renderTable(data) {
  const thead = document.querySelector("#dataTable thead");
  const tbody = document.querySelector("#dataTable tbody");

  thead.innerHTML = "";
  tbody.innerHTML = "";

  // header row
  const headerRow = document.createElement("tr");
  headers.forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // data rows
  data.forEach(item => {
    const row = document.createElement("tr");

    headers.forEach(h => {
      const td = document.createElement("td");
      td.textContent = item[h] || "";

      // highlight serial column if exists
      if (h.toLowerCase().includes("serial")) {
        td.classList.add("highlight");
      }

      row.appendChild(td);
    });

    tbody.appendChild(row);
  });
}

// Filter table
function filterTable() {
  const profileFilter = document.getElementById("profileFilter").value.toLowerCase();
  const lengthFilter = document.getElementById("lengthFilter").value;
  const typeFilter = document.getElementById("typeFilter").value.toLowerCase();

  const filtered = csvData.filter(item => {
    const profile = (item["profile"] || "").toLowerCase();
    const length = item["length"] || "";
    const type = (item["type"] || "").toLowerCase();

    return (
      profile.includes(profileFilter) &&
      (lengthFilter ? length == lengthFilter : true) &&
      type.includes(typeFilter)
    );
  });

  renderTable(filtered);
}

// Reset table
function resetTable() {
  document.getElementById("profileFilter").value = "";
  document.getElementById("lengthFilter").value = "";
  document.getElementById("typeFilter").value = "";

  renderTable(csvData);
}