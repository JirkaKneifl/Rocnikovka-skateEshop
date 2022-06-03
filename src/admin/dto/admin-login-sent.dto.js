class AdminLoginSentDTO{

    email;
    heslo;

    constructor(email,heslo){
        this.email = email;
        this.heslo = heslo;
    }

    static FromRequest(req){
        return new AdminLoginSentDTO(
            req.body.email,
            req.body.heslo
        )
    }
    
}

module.exports = AdminLoginSentDTO