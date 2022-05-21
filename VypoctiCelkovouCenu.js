function VypoctiCelkovouCenu (dataPridejDoKosikuSession){
    return dataPridejDoKosikuSession.reduce((cenaDoKterePricitam, polozka)=>{
        return cenaDoKterePricitam + polozka.CenaJednePolozky * polozka.mnozstvi;
    },0) 
}

module.exports = VypoctiCelkovouCenu;
/*
Number.prototype.times = function (){

}
*/