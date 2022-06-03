const spojeni = require("../../helpers/databaseConection")

class AdminService {

    spojeni;

    constructor(spojeni) {
        this.spojeni = spojeni;
    }

    async Login(email, heslo){
        const detailZamestnance = await this.spojeni.query(`SELECT * FROM Zamestnanci WHERE email = ?`, [email])

        if(detailZamestnance && await bcrypt.compare(heslo, detailZamestnance.heslo)){
            return true;
        } else {
            return false;
        }
    }

}

module.exports = AdminService;