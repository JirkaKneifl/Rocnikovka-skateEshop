const spojeni = require("../../helpers/databaseConection")
const VypoctiCelkovouCenu = require("../../../VypoctiCelkovouCenu")

class OrderService {

    spojeni;

    constructor(spojeni){
        this.spojeni = spojeni;
    }

    

    async VytvorObjednavku(dto, sessionPolozkay){
        const celkovaCena = VypoctiCelkovouCenu(sessionPolozkay);

        await this.spojeni.query(`INSERT INTO objednavky VALUES(
            null, 
            NOW(),
            null,
            null,
            null,
            null,
            ?,?,?,?,?,?,?,?,1,?
        )`, [
            dto.jmeno,
            dto.prijmeni,
            dto.telefon,
            dto.email,
            dto.ulice_cp,
            dto.psc,
            dto.mesto,
            dto.popis,
            celkovaCena
        ])

        await Promise.all(sessionPolozkay.map(sessionPolozka => 
            this.spojeni.query(`INSERT INTO objednavky_produkty VALUES(?, ?, ?, ?, ?)`,
            [
            dto.ID_produktu,
            dto.nazveProduktu,
            dto.ID_objednavky,
            dto.CenaProduktu,
            dto.mnozstviVObjednavce
            ])
        ))
    }

    async ListVsechObjednavek(){
        return this.spojeni.query(`SELECT * FROM objednavky LEFT JOIN stavyobjednavek ON objednavky.ID_stav = stavyobjednavek.ID_stav ORDER BY objednavky.dat_prijeti DESC`)
    }

    async Expedovat(cisloObjednavky){
       return this.spojeni.query(`UPDATE objednavky SET ID_stav = 0 WHERE cislo = ?`, [cisloObjednavky]) 
    }

    async DetailObjednavky(cisloObjednavky){
        const objednavky =  await this.pripojeni.query(`SELECT * FROM objednavky LEFT JOIN stavyobjednavek ON objednavky.ID_stav = stavyobjednavek.ID_stav WHERE objednavky.cislo = ?`, [cisloObjednavky])
        const objednavka = objednavky[0];

        const radkyObjednavky = await this.pripojeni.query(`SELECT * FROM objednavky_produkty WHERE ID_objednavky = ?`, [cisloObjednavky])

        return [objednavka, radkyObjednavky];
    }
}

module.exports = OrderService;