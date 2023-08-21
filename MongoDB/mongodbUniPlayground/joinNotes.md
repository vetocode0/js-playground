// Aggregate Function
// Match an object ID on the movie then join with the comments table 

								


/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
const id = '573a13b5f29313caabd42c2f'
const agg = [
	{ '$match': { '_id': new ObjectId(id) } }, 
	{'$lookup': {
			'from': 'comments', 
			'let': { 'id': '$_id' }, 
			'pipeline': [
			{ '$match': {'$expr': { '$eq': [ '$movie_id', '$$id' ] } } }, 
			{ '$sort': { 'date': 1 } }
			], 
			'as': 'comments'
		}
	}
]
  