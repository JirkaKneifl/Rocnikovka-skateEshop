class ProxyKosikSession {
    req;
 
    constructor(req) {
        if (!req.session.cart) {
            req.session.cart = [];
        }
 
        this.req = req;
    }
 
    add(PolozkaVKosiku) {
        this.req.session.cart.push(PolozkaVKosiku);
    }
 
    update(ID_polozkyInput, noveMnozstvi) {
        this.req.session.cart = this.req.session.cart.map(polozka =>{
            if (polozka.ID_produktu == ID_polozkyInput) {
                 polozka.mnozstvi = noveMnozstvi;
            }
                return polozka
        })
    }
 
    remove(ID_polozkyInput) {
        console.log("ID_polozkyInput: ",ID_polozkyInput)	
        this.req.session.cart = this.req.session.cart.filter(polozka =>{
            console.log("polozka: ",polozka)
            return polozka.ID_produktu != ID_polozkyInput;
        })
        console.log("this.session: ",this.req.session)
    }

    celkovaCena(){
        return this.req.session.cart.reduce((cenaDoKterePricitam, polozka)=>{
            return cenaDoKterePricitam + polozka.CenaJednePolozky * polozka.mnozstvi;
        },0)
    }
}
module.exports = ProxyKosikSession