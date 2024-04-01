import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import MoviesModel from './api/models/moviesModel.js'

async function main(){
  dotenv.config()

  const client = new mongodb.MongoClient(
    process.env.DB_STRING,
  )
  const port = process.env.PORT || 8000


  try {
    await client.connect()
    await MoviesModel.injectDB(client)
    app.listen(port, () => {
      console.log('Server is running on port ' + port);
    })
  }
  catch(e) {
    console.error(e);
    process.exit(1)
  }
}

main().catch(console.error);
