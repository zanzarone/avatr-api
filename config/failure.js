class Failure extends Error {
  constructor(message, code, errorList) {
    super(message);

    //# Aggiungi i tuoi campi personalizzati
    this.code = code;

    //# Aggiungi i tuoi campi personalizzati
    this.errors = errorList;

    //# Imposta il nome della classe, necessario per ottenere un trace di errore significativo
    this.name = this.constructor.name;

    //# Cattura la traccia dell'errore
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { Failure };
