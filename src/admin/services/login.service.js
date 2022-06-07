const databaseConection = require("../../helpers/databaseConection")
const Zamestnanec = require("../entities/Zamestnanec.entity");
const bcrypt = require('bcrypt')

class LoginService {

    spojeni;

    constructor() {
        this.spojeni = databaseConection;
    }

    async Login(email, heslo){
        const [detailZamestnance] = await this.spojeni.query(`SELECT * FROM Zamestnanci WHERE email = ?`, [email])

        if(detailZamestnance && await bcrypt.compare(heslo, detailZamestnance.heslo)){
            return new Zamestnanec(
                detailZamestnance.ID_zamestnance,
                detailZamestnance.jmeno,
                detailZamestnance.prijmeni,
                detailZamestnance.dat_narozeni,
                detailZamestnance.adresa_bydliste,
                detailZamestnance.mesto,
                detailZamestnance.telefon,
                detailZamestnance.email,
                detailZamestnance.dat_nastoupeni,
                detailZamestnance.ID_pozice
            );
        } else {
            return false;
        }
    }
}

module.exports = LoginService;