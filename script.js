// ============================================================
// SELETOR DE CHAVETAS
// ============================================================

class SelChav {

    // --------------------------------------------------------
    // Tabela de perfis
    // --------------------------------------------------------

    static profiles = [

        { name: "2x2",   dia: 8,   b: 2,  h: 2,  t1: 1.2,  t2: 1.0 },
        { name: "3x3",   dia: 10,  b: 3,  h: 3,  t1: 1.8,  t2: 1.4 },
        { name: "4x4",   dia: 12,  b: 4,  h: 4,  t1: 2.5,  t2: 1.8 },
        { name: "5x5",   dia: 17,  b: 5,  h: 5,  t1: 3.0,  t2: 2.3 },
        { name: "6x6",   dia: 22,  b: 6,  h: 6,  t1: 3.5,  t2: 2.8 },
        { name: "8x7",   dia: 30,  b: 8,  h: 7,  t1: 4.0,  t2: 3.3 },
        { name: "10x8",  dia: 38,  b: 10, h: 8,  t1: 5.0,  t2: 3.3 },
        { name: "12x8",  dia: 44,  b: 12, h: 8,  t1: 5.0,  t2: 3.3 },
        { name: "14x9",  dia: 50,  b: 14, h: 9,  t1: 5.5,  t2: 3.8 },
        { name: "16x10", dia: 58,  b: 16, h: 10, t1: 6.0,  t2: 4.3 },
        { name: "18x11", dia: 65,  b: 18, h: 11, t1: 7.0, t2: 4.4 },
        { name: "20x12", dia: 75,  b: 20, h: 12, t1: 7.5, t2: 4.9 },
        { name: "22x14", dia: 85,  b: 22, h: 14, t1: 9.0,  t2: 5.4 },
        { name: "25x14", dia: 95,  b: 25, h: 14, t1: 9.0, t2: 5.4 },
        { name: "28x16", dia: 110, b: 28, h: 16, t1: 10.0, t2: 6.4 },
        { name: "32x18", dia: 130, b: 32, h: 18, t1: 11.0, t2: 7.4 },
        { name: "36x20", dia: 150, b: 36, h: 20, t1: 12.0, t2: 8.4 },
        { name: "40x22", dia: 170, b: 40, h: 22, t1: 13.0, t2: 9.4 },
        { name: "45x25", dia: 200, b: 45, h: 25, t1: 15.0, t2: 10.4 },
        { name: "50x28", dia: 230, b: 50, h: 28, t1: 17.0, t2: 11.4 },
        { name: "56x32", dia: 260, b: 56, h: 32, t1: 20.0, t2: 12.4 }

    ];


    // --------------------------------------------------------
    // CONSTRUTOR
    // --------------------------------------------------------

    constructor({ dia }) {

        this.dia = dia;

        this.comLar = "";

        this.larg = "";
        this.alt = "";

        this.t1 = "";
        this.t2 = "";

        this.calcEixo = "";
        this.calcCubo = "";
    }


    // --------------------------------------------------------
    // SELECIONA O PERFIL
    // --------------------------------------------------------

    diaSel() {

        for (const rule of SelChav.profiles) {

            if (this.dia <= rule.dia) {

                this.comLar = rule.name;

                this.larg = rule.b;
                this.alt = rule.h;

                this.t1 = rule.t1;
                this.t2 = rule.t2;

                return true;
            }
        }

        this.comLar = "Sem perfil";

        this.larg = "";
        this.alt = "";
        this.t1 = "";
        this.t2 = "";

        return false;
    }


    // --------------------------------------------------------
    // CALCULA EIXO E CUBO
    // --------------------------------------------------------

    calcDim() {

        if (
            typeof this.t1 !== "number" ||
            typeof this.t2 !== "number"
        ) {
            return false;
        }

        this.calcEixo =
            this.dia - this.t1;

        this.calcCubo =
            this.dia + this.t2;

        return true;
    }
}



// ============================================================
// VARIÁVEIS DO CSV
// ============================================================

let csvData = [];

let headers = [];



// ============================================================
// QUANDO O USUÁRIO SELECIONA O CSV
// ============================================================

document
    .getElementById("csvFileInput")
    .addEventListener("change", function (event) {

        const file = event.target.files[0];

        if (!file) {
            return;
        }


        const reader = new FileReader();


        reader.onload = function (e) {

            const text = e.target.result;

            csvData = parseCSV(text);

            renderTable(csvData);

            console.log(
                "CSV carregado:",
                csvData
            );
        };


        reader.onerror = function () {

            alert("Erro ao ler o arquivo CSV.");
        };


        reader.readAsText(file);
    });



// ============================================================
// PARSE CSV
// ============================================================

function parseCSV(text) {

    const rows = text
        .split(/\r?\n/)
        .map(row => row.trim())
        .filter(row => row.length > 0);


    if (rows.length === 0) {

        headers = [];

        return [];
    }


    // --------------------------------------------------------
    // Cabeçalho
    // --------------------------------------------------------

    headers = rows[0]
        .split(",")
        .map(header => header.trim());


    // --------------------------------------------------------
    // Dados
    // --------------------------------------------------------

    const data = [];


    for (let i = 1; i < rows.length; i++) {

        const values = rows[i]
            .split(",")
            .map(value => value.trim());


        const obj = {};


        headers.forEach((header, index) => {

            obj[header] =
                values[index] ?? "";
        });


        data.push(obj);
    }


    return data;
}



// ============================================================
// MOSTRA TABELA
// ============================================================

function renderTable(data) {

    const thead =
        document.querySelector("#dataTable thead");

    const tbody =
        document.querySelector("#dataTable tbody");


    // --------------------------------------------------------
    // Limpa
    // --------------------------------------------------------

    tbody.innerHTML = "";


    // --------------------------------------------------------
    // Se não houver dados
    // --------------------------------------------------------

    if (data.length === 0) {

        const row =
            document.createElement("tr");


        const cell =
            document.createElement("td");


        cell.colSpan = 4;

        cell.textContent =
            "Nenhum resultado encontrado.";


        row.appendChild(cell);

        tbody.appendChild(row);

        return;
    }


    // --------------------------------------------------------
    // Cria linhas
    // --------------------------------------------------------

    data.forEach(item => {

        const row =
            document.createElement("tr");


        // Código
        const tdCodigo =
            document.createElement("td");

        tdCodigo.textContent =
            item["codigo"] || "";

        row.appendChild(tdCodigo);


        // Perfil
        const tdPerfil =
            document.createElement("td");

        tdPerfil.textContent =
            item["perfil"] || "";

        row.appendChild(tdPerfil);


        // Comprimento
        const tdComprimento =
            document.createElement("td");

        tdComprimento.textContent =
            item["comprimento"] || "";

        row.appendChild(tdComprimento);


        // Tipo
        const tdTipo =
            document.createElement("td");

        tdTipo.textContent =
            item["tipo"] || "";

        row.appendChild(tdTipo);


        tbody.appendChild(row);
    });
}



// ============================================================
// CALCULA TUDO
// ============================================================

function calc1() {

    // --------------------------------------------------------
    // Diâmetro
    // --------------------------------------------------------

    const dia =
        parseFloat(
            document.getElementById("dia1").value
        );


    // --------------------------------------------------------
    // Verifica
    // --------------------------------------------------------

    if (Number.isNaN(dia)) {

        limparCalculos();

        return;
    }


    // --------------------------------------------------------
    // Cria seletor
    // --------------------------------------------------------

    const chaveta =
        new SelChav({
            dia: dia
        });


    // --------------------------------------------------------
    // Seleciona perfil
    // --------------------------------------------------------

    const encontrou =
        chaveta.diaSel();


    if (!encontrou) {

        alert(
            "Não existe perfil cadastrado para esse diâmetro."
        );

        limparCalculos();

        return;
    }


    // --------------------------------------------------------
    // Calcula dimensões
    // --------------------------------------------------------

    chaveta.calcDim();


    // --------------------------------------------------------
    // Mostra perfil
    // --------------------------------------------------------

    document.getElementById(
        "valChavPerf"
    ).textContent =
        chaveta.comLar;


    document.getElementById(
        "valChavPerf2"
    ).textContent =
        chaveta.comLar;


    // --------------------------------------------------------
    // Mostra dimensões
    // --------------------------------------------------------

    document.getElementById(
        "larg"
    ).textContent =
        chaveta.larg;


    document.getElementById(
        "alt"
    ).textContent =
        chaveta.alt;


    document.getElementById(
        "t1"
    ).textContent =
        chaveta.t1;


    document.getElementById(
        "t2"
    ).textContent =
        chaveta.t2;


    // --------------------------------------------------------
    // Mostra cálculos
    // --------------------------------------------------------

    document.getElementById(
        "calcEixo"
    ).textContent =
        chaveta.calcEixo.toFixed(2);


    document.getElementById(
        "calcCubo"
    ).textContent =
        chaveta.calcCubo.toFixed(2);


    // --------------------------------------------------------
    // Atualiza o tipo/comprimento
    // --------------------------------------------------------

    selTp();
}



// ============================================================
// SELECIONA TIPO E CALCULA COMPRIMENTO
// ============================================================

function selTp() {

    // --------------------------------------------------------
    // Tipo
    // --------------------------------------------------------

    const tipo =
        document.getElementById("tpSel").value;


    // --------------------------------------------------------
    // Comprimento
    // --------------------------------------------------------

    const comprimento =
        parseFloat(
            document.getElementById("comp").value
        );


    // --------------------------------------------------------
    // Variação
    // --------------------------------------------------------

    const variacao =
        parseFloat(
            document.getElementById("varCom").value
        );


    // --------------------------------------------------------
    // Atualiza tipo mesmo se comprimento estiver vazio
    // --------------------------------------------------------

    document.getElementById(
        "tp"
    ).textContent =
        tipo;


    // --------------------------------------------------------
    // Verifica comprimento
    // --------------------------------------------------------

    if (Number.isNaN(comprimento)) {

        document.getElementById(
            "compMin"
        ).textContent = "";

        document.getElementById(
            "compMax"
        ).textContent = "";

        return false;
    }


    // --------------------------------------------------------
    // Se variação estiver vazia, usa zero
    // --------------------------------------------------------

    const varFinal =
        Number.isNaN(variacao)
            ? 0
            : variacao;


    // --------------------------------------------------------
    // Calcula mínimo e máximo
    // --------------------------------------------------------

    const compMin =
        comprimento - varFinal;


    const compMax =
        comprimento + varFinal;


    // --------------------------------------------------------
    // Mostra na página
    // --------------------------------------------------------

    document.getElementById(
        "compMin"
    ).textContent =
        compMin;


    document.getElementById(
        "compMax"
    ).textContent =
        compMax;


    // --------------------------------------------------------
    // Debug
    // --------------------------------------------------------

    console.log({
        tipo: tipo,
        comprimento: comprimento,
        variacao: varFinal,
        compMin: compMin,
        compMax: compMax
    });


    return true;
}



// ============================================================
// FILTRA CSV
// ============================================================

function filterTable() {

    // --------------------------------------------------------
    // Verifica se CSV foi carregado
    // --------------------------------------------------------

    if (csvData.length === 0) {

        alert(
            "Carregue primeiro a planilha CSV."
        );

        return;
    }


    // --------------------------------------------------------
    // Perfil
    // --------------------------------------------------------

    const perfilFiltro =
        document
            .getElementById("valChavPerf2")
            .textContent
            .trim()
            .toLowerCase();


    // --------------------------------------------------------
    // Comprimento mínimo
    // --------------------------------------------------------

    const compMin =
        parseFloat(
            document
                .getElementById("compMin")
                .textContent
        );


    // --------------------------------------------------------
    // Comprimento máximo
    // --------------------------------------------------------

    const compMax =
        parseFloat(
            document
                .getElementById("compMax")
                .textContent
        );


    // --------------------------------------------------------
    // Tipo
    // --------------------------------------------------------

    const tipoFiltro =
        document
            .getElementById("tp")
            .textContent
            .trim()
            .toLowerCase();


    // --------------------------------------------------------
    // Verifica os filtros
    // --------------------------------------------------------

    if (!perfilFiltro) {

        alert(
            "Informe um diâmetro para selecionar o perfil."
        );

        return;
    }


    if (
        Number.isNaN(compMin) ||
        Number.isNaN(compMax)
    ) {

        alert(
            "Informe o comprimento e a variação."
        );

        return;
    }


    // --------------------------------------------------------
    // FILTRO
    // --------------------------------------------------------

    const filtrado =
        csvData.filter(item => {

            // Perfil do CSV
            const perfil =
                String(
                    item["perfil"] || ""
                )
                .trim()
                .toLowerCase();


            // Comprimento do CSV
            const comprimento =
                parseFloat(
                    String(
                        item["comprimento"] || ""
                    )
                    .replace(",", ".")
                );


            // Tipo do CSV
            const tipo =
                String(
                    item["tipo"] || ""
                )
                .trim()
                .toLowerCase();


            // ------------------------------------------------
            // Comparações
            // ------------------------------------------------

            const perfilOK =
                perfil === perfilFiltro;


            const comprimentoOK =
                !Number.isNaN(comprimento) &&
                comprimento >= compMin &&
                comprimento <= compMax;


            const tipoOK =
                tipo === tipoFiltro;


            // ------------------------------------------------
            // Resultado
            // ------------------------------------------------

            return (
                perfilOK &&
                comprimentoOK &&
                tipoOK
            );
        });


    // --------------------------------------------------------
    // Mostra resultados
    // --------------------------------------------------------

    renderTable(filtrado);


    // --------------------------------------------------------
    // DEBUG
    // --------------------------------------------------------

    console.log(
        "========== FILTRO =========="
    );

    console.log(
        "Perfil:",
        perfilFiltro
    );

    console.log(
        "Comprimento mínimo:",
        compMin
    );

    console.log(
        "Comprimento máximo:",
        compMax
    );

    console.log(
        "Tipo:",
        tipoFiltro
    );

    console.log(
        "Resultados:",
        filtrado.length
    );

    console.log(
        "============================"
    );
}



// ============================================================
// LIMPA A PESQUISA
// ============================================================

function resetTable() {

    // --------------------------------------------------------
    // Limpa filtros mostrados
    // --------------------------------------------------------

    document.getElementById(
        "valChavPerf2"
    ).textContent = "";


    document.getElementById(
        "compMin"
    ).textContent = "";


    document.getElementById(
        "compMax"
    ).textContent = "";


    document.getElementById(
        "tp"
    ).textContent = "";


    // --------------------------------------------------------
    // Mostra novamente todos os dados
    // --------------------------------------------------------

    renderTable(csvData);
}



// ============================================================
// LIMPA OS CÁLCULOS
// ============================================================

function limparCalculos() {

    const ids = [
        "valChavPerf",
        "valChavPerf2",
        "larg",
        "alt",
        "t1",
        "t2",
        "calcEixo",
        "calcCubo"
    ];


    ids.forEach(id => {

        const elemento =
            document.getElementById(id);

        if (elemento) {
            elemento.textContent = "";
        }
    });
}