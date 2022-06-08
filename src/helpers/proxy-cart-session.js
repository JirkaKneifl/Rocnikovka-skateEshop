class ProxyKosikSession {
    session;
 
    constructor(session) {
        if (!session.cart || session.cart === undefined) {
            session.cart = [];
        }
 
        this.session = session.cart;
    }
 
    add(PolozkaVKosiku) {
        this.session.push(PolozkaVKosiku);
    }
 
    update(ID_polozkyInput, noveMnozstvi) {
        this.session = this.session.map(polozka =>{
            if (polozka.ID_produktu == ID_polozkyInput) {
                return {
                    ...polozka,
                    mnozstvi: noveMnozstvi
                }
            }else {
                return polozka
            }
        })
    }
 
    remove(ID_polozkyInput) {
        this.session = this.session.filter(polozka =>{
            return polozka.ID_produktu != ID_polozkyInput;
        })
    }
}
module.exports = ProxyKosikSession