process.env.PORT =  process.env.PORT || 3000

process.env.NODE_ENV  = process.env.NODE_ENV || 'dev'

let urlDB
if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/cafe'
} else {
  urlDB = 'mongodb+srv://dbadmin:123qweasd@cluster0-hpkmd.gcp.mongodb.net/cafe'
}
process.env.URL_DB = urlDB

process.env.TOKEN_EXPIRES_IN = 60 * 60 * 24 * 30

process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'test-seed'

process.env.CLIENT_ID = process.env.CLIENT_ID || '874409115664-jibr2e5606kt6f3f6sbvmljp98q5qrg4.apps.googleusercontent.com'