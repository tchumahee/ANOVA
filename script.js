let brMjerenja = document.querySelector("#br-mjerenja");
let brAlternativa = document.querySelector("#br-alternativa");
let prviUnos = document.querySelector("#prvi-unos");
let p2 = document.querySelector("#p2");
let tabela = document.querySelector("#tabela");
let tabelaR = document.querySelector("#tabela-rezultata");
let drugiUnos = document.querySelector("#drugi-unos");
let anovaIspis = document.querySelector("#anova");
let povjerenjeText = document.querySelector("#povjerenje-input");
let treciUnos = document.querySelector("#treci-unos");
let kontrastPrvaText = document.querySelector("#kontrast-prva");
let kontrastDrugaText = document.querySelector("#kontrast-druga");
let kontrastiIspis = document.querySelector("#kontrasti");
let povjerenjeKontrasti = document.querySelector("#povjerenje-kontrasti-input");

let paramButton = document.querySelector("#param-button");
let mjerenjaButton = document.querySelector("#mjerenja-button");
let nazadButton = document.querySelector("#nazad-button");
let kontrastiButton = document.querySelector("#kontrasti-button");

let n;
let k;

let listaKolona = [];
let listaSrVrKolona = [];
let listaEfekata = [];
let srVrUkupna = NaN;
let ssa = 0;
let sse = 0;
let sst = 0;
let se2 = NaN;

paramButton.addEventListener("click", prihvatiVr);
mjerenjaButton.addEventListener("click", prihvatiMjerenja);
nazadButton.addEventListener("click", nazad);
kontrastiButton.addEventListener("click", prihvatiVrKontr);

function nazad(){
    prviUnos.classList.remove("hide");
    mjerenjaButton.classList.add("hide");
    nazadButton.classList.add("hide");
    drugiUnos.classList.add("hide");
    treciUnos.classList.add("hide");
}

function prihvatiMjerenja() {
    srednjeVrijednosti();
    ss();
    anova();
    
    treciUnos.classList.remove("hide");
}

function prihvatiVr(){
    if (brMjerenja.value !== "" && brAlternativa.value !==""){
        n = brMjerenja.value;
        k = brAlternativa.value;

        prviUnos.classList.add("hide");
        mjerenjaButton.classList.remove("hide");
        nazadButton.classList.remove("hide");
        drugiUnos.classList.remove("hide");

        tabelaPrikaz();
        tabelaR.innerHTML = "";
        anovaIspis.innerHTML = "";
        kontrastiIspis.innerHTML = "";
    }
}

function prihvatiVrKontr() {
    if (kontrastPrvaText.value !== "" && kontrastDrugaText.value !=="" && kontrastPrvaText.value <= k && kontrastDrugaText.value <= k){
        kontrasti();
    }
}


function tabelaPrikaz() {
   
    tabela.innerHTML = "";
    listaKolona = [];

    let naslovRedaDiv = document.createElement("div");
    naslovRedaDiv.className = "kolona";

    for (let j = 0; j <= n; j++) {
        let naslovReda = document.createElement("input");
        naslovReda.value = j;
        naslovReda.readOnly = true;
        naslovReda.style.textAlign = "center";  
        naslovRedaDiv.appendChild(naslovReda);
        tabela.appendChild(naslovRedaDiv);
    }

    for (let i = 0; i < k; i++) {

        let listaPolja = [];

        let kolonaDiv = document.createElement("div");
        kolonaDiv.className = "kolona";

        let naslovKolone = document.createElement("input");
        naslovKolone.value = i+1;
        naslovKolone.readOnly = true;
        naslovKolone.style.textAlign = "center";
        kolonaDiv.appendChild(naslovKolone);
        for (let j = 0; j < n; j++) {

            let red = document.createElement("input");
            red.setAttribute("type", "number");
            red.style.backgroundColor = "rgb(215, 189, 230)";
            kolonaDiv.appendChild(red);
            listaPolja.push(red);

        }

        tabela.appendChild(kolonaDiv);
        listaKolona.push(listaPolja);

    }
    
}

function tabelaRezultati() {

    tabelaR.innerHTML = "";

    tabelaR.innerHTML = "";

    let redDivSr = document.createElement("div");

    let redDivE = document.createElement("div");

    let prvoPolje = document.createElement("input");
    prvoPolje.value="Srednje vr. kolona";
    prvoPolje.readOnly = true;
    prvoPolje.style.textAlign = "center";
    redDivSr.appendChild(prvoPolje);

    prvoPolje = document.createElement("input");
    prvoPolje.value="Efekat";
    prvoPolje.readOnly = true;
    prvoPolje.style.textAlign = "center";
    redDivE.appendChild(prvoPolje);

    for (let i = 0; i < k; i++) {
        let poljeSr = document.createElement("input");
        poljeSr.value = listaSrVrKolona[i];
        poljeSr.readOnly = true;   
        poljeSr.style.backgroundColor = "rgb(215, 189, 230)";
        redDivSr.appendChild(poljeSr);    

        let poljeE = document.createElement("input");
        poljeE.value = listaEfekata[i];
        poljeE.readOnly = true;   
        poljeE.style.backgroundColor = "rgb(215, 189, 230)";
        redDivE.appendChild(poljeE);  
    }

    redDivSr.style.flexDirection = "row";
    redDivSr.style.alignItems = "center";
    tabelaR.appendChild(redDivSr);

    redDivE.style.flexDirection = "row";
    redDivE.style.alignItems = "center";
    tabelaR.appendChild(redDivE);
   
}


function anovaRezultati(ssat, sset, Fizr, Ftab){
    anovaIspis.innerHTML = "";
    anovaIspis.innerHTML = "SSE/SST = " + sset.toFixed(2) + "%<br>SSA/SST = " + ssat.toFixed(2) + "%<br>F(izracunato) = " + Fizr.toFixed(2) + "<br>F(kriticno) = " + Ftab.toFixed(2) 
    + "<br><br>";
}

function kontrastiRezultati(sc, c1, c2) {
    kontrastiIspis.innerHTML = "sc = " + sc.toFixed(4) + "<br>(c1,c2) = (" + c1.toFixed(4) + "," + c2.toFixed(4) + ")" 
}


