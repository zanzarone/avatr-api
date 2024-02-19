class Failure extends Error {
  constructor(message, code, errorList, path, subcode) {
    super(message);
    //# Aggiungi i tuoi campi personalizzati
    this.code = code;
    //# Aggiungi i tuoi campi personalizzati
    this.path = path;
    //# Aggiungi i tuoi campi personalizzati
    this.subcode = subcode;
    //# Aggiungi i tuoi campi personalizzati
    this.errors = errorList;
    //# Imposta il nome della classe, necessario per ottenere un trace di errore significativo
    this.name = this.constructor.name;
    //# Cattura la traccia dell'errore
    Error.captureStackTrace(this, this.constructor);
  }
}

const Code = {
  //! ================ 4XX ================
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  //! ================ 500 ================
  Internal: 500,
};

const Paths = {
  Cors: 1,
  Generate: 100,
};

const SubCode = {
  Validation: 1,
  UnknownParams: 2,
  MissingFile: 3,
  LoadImage: 4,
  Draw: 4,
};

module.exports = { Failure, Paths, Code, SubCode };
