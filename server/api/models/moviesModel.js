let movies

export default class MoviesModel{
  static async injectDB(conn){
    if (movies) {
      return
    }
    try {
      movies = await conn.db(process.env.DB_NAME).collection('movies')
    }
    catch(e) {
      console.error(`unable to connect Model : ${e}` )
    }
  }

  static async getMovies({
    filters = null,
    page = 0,
    moviesPerPage = 20,
  } = {}){
    let query
    if (filters){
      if ("title" in filters) {
        query = {$text: {$search: filters['title']}}
      }
      else if ('rated' in filters) {
        query = {$text : {$search : filters['rated']}}
      }
    }
    let cursor
    try {
      cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page)
      const moviesList = await cursor.toArray()
      const totalNumMovies = await movies.countDocuments(query)
      return {moviesList, totalNumMovies}
    }
    catch(e) {
      console.error(`Error occured when retrieving movies : ${e}`)
      return {moviesList : [], totalNumMovies : 0}
    }
  }
}
