function srednjeVrijednosti(){
    let sumaKolone;
    let sumaUkupna = 0;
    listaSrVrKolona = [];
    listaEfekata = [];
    srVrUkupna = NaN;

    for(let i = 0; i < k; i++)
    {
        sumaKolone = 0;
        for (let j = 0; j < n; j++) {
            sumaKolone += parseFloat(listaKolona[i][j].value);
        }
        listaSrVrKolona.push(sumaKolone/n);
        sumaUkupna += sumaKolone;

        console.log(sumaKolone);
    }

    srVrUkupna = sumaUkupna/(k*n);
    console.log("Ukupna srednja vr  " + srVrUkupna);

    listaSrVrKolona.forEach(element => {
        listaEfekata.push(element - srVrUkupna);
    });

    tabelaRezultati();
}

function ss(){
    ssa = 0;
    sse = 0;
    sst = 0;
    
    for (let i = 0; i < k; i++) {
        ssa += Math.pow((listaEfekata[i]),2);
        for (let j = 0; j < n; j++) {
            sse += Math.pow((listaKolona[i][j].value - listaSrVrKolona[i]),2); 
        }       
    }
    
    ssa *= n;
    sst = ssa + sse;
}

function kontrasti(){
    
        let c = listaEfekata[kontrastPrvaText.value - 1] - listaEfekata[kontrastDrugaText.value - 1];
        let sc = Math.sqrt(se2*2/(k*n));
        let p = 1-(1-povjerenjeKontrasti.value)/2;

        let c1 = c - (formulajs.TINV(p, k*(n-1))) * sc;
        let c2 = c + (formulajs.TINV(p, k*(n-1))) * sc;

        kontrastiRezultati(sc, c1, c2);
}

function anova(){
    let povjerenje = povjerenjeText.value;
    let ssat = ssa/sst;
    let sset = sse/sst;

    let sa2 = ssa/(k-1);
    se2 = sse/(k*(n-1));

    let Fizr = sa2/se2;
    let Ftab = formulajs.FINV(povjerenje,(k-1),k*(n-1));


    anovaRezultati(ssat*100, sset*100, Fizr, Ftab);
}

