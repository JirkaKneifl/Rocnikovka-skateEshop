class ProxyZamestnanecSession {
  session;

  constructor(session) {
    this.session = session.zamestnanec;
  }

  add(zamestnanec) {
    this.session = zamestnanec;
  }

  isLogged() {
    if (this.session) {
      return true;
    }
    return false;
  }

  remove() {
    this.session = null;
  }
}
module.exports = ProxyZamestnanecSession;
