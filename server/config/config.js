process.env.PORT =  process.env.PORT || 3000

process.env.NODE_ENV  = process.env.NODE_ENV || 'dev'

let urlDB
if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/cafe'
} else {
  urlDB = 'mongodb+srv://dbadmin:123qweasd@cluster0-hpkmd.gcp.mongodb.net/cafe'
}
process.env.URL_DB = urlDB