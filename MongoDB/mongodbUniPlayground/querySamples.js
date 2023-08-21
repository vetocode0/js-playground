const { describe } = require("node:test")

let [gteCount, gtCount] = [db.trips.find({"birth year":{$gt:1998}}).count(), db.trips.find({"birth year": {$eq:1998}}).count()]

db.companies.find({ $or : [{ $and:[{"founded_year": 2004}, { $or : [ { "category_code" : "social"}, {"category_code":"web"}] }]},{$and:[{"founded_month":"October"},{ $or : [{"category_code":"social"}, {"category_code":"web"}]}]}]})	

db.companies.find(
				{ $or : 
					[
						{ $and:[
								{"founded_year": 2004}, 
								{ $or : [ { "category_code" : {$eq: "social"}}, {"category_code":{$eq: "web"}}] }
						]},
						{$and:[
								{"founded_month":10},
								{ $or : [{"category_code":{$eq: "social"}}, {"category_code":{$eq: "web"}} ]}
						]}
					]}
				).count()

db.companies.find({ $and:[{"founded_year": 2004}, { $or : [ { "category_code" : {$eq: "social"}}, {"category_code":{$eq: "web"}}] }]})


db.companies.find({ $or : [{ $and:[{"founded_year": 2004}, { $or : [ { "category_code" : {$eq: "social"}, {"category_code":"web"}] }]},{$and:[{"founded_month":"October"},{ $or : [{"category_code":"social"}, {"category_code":"web"}]}]})


db.companies.countDocuments({ $or : [{ $and:[{"founded_year": 2004}, { $or : [ { "category_code" : {$eq: "social"}}, {"category_code" :{$eq: "web"}}] }]},{$and:[{"founded_month":"October"},{ $or : [{"category_code": {$eq:  "social"} }, {"category_code":{$eq: "web" }} ]}]}]})


db.trips.find({ "$expr": { "$eq": [ "$end station id", "$start station id"] }
              }).count()

db.trips.find({ "$expr": { "$and": [ { "$gt": [ "$tripduration", 1200 ]}, { "$eq": [ "$end station id", "$start station id" ]} ]}}).count()


db.listingsAndReviews.find({ "amenities": {
	"$size": 20,
	"$all": [ "Internet", "Wifi",  "Kitchen",
			 "Heating", "Family/kid friendly",
			 "Washer", "Dryer", "Essentials",
			 "Shampoo", "Hangers",
			 "Hair dryer", "Iron",
			 "Laptop friendly workspace" ]
		   }
}).pretty()
// show dbs
// use sample_traning
db.companies.findOne()
db.companies.countDocuments({$expr: {$eq: ["$permalink", "$twitter_username"]}})
db.listingsAndReviews.find({"property_type":"House", "amenities":{$all:["Changing table"]}}).count()

// projections allow you to specify which fields to include/exclude. To include {<field name> : 1 }, to exclude {<field name> : 0}
db.listingsAndReviews.find({"property_type":"House", "amenities":{$all:["Changing table"]}},{"amenities":0, "reviews":0, "host": 0})

db.grades.find({ "scores": { "$elemMatch": { "type": "extra credit" } }
               }).pretty()

			   db.grades.find({ "class_id": 431 },
               { "scores": { "$elemMatch": { "score": { "$gt": 85 } } }
             }).pretty()

//dot notation when traversing sub documents looks wild. In the parenthesis, with spaces in names, just include a "." to the sub field.
// use sample_training

db.trips.findOne({ "start station location.type": "Point" })

db.companies.find({ "relationships.0.person.last_name": "Zuckerberg" },
                  { "name": 1 }).pretty()

db.companies.find({ "relationships.0.person.first_name": "Mark",
                    "relationships.0.title": { "$regex": "CEO" } },
                  { "name": 1 }).count()


db.companies.find({ "relationships.0.person.first_name": "Mark",
                    "relationships.0.title": {"$regex": "CEO" } },
                  { "name": 1 }).pretty()

db.companies.find({ "relationships":
                      { "$elemMatch": { "is_past": true,
                                        "person.first_name": "Mark" } } },
                  { "name": 1 }).pretty()

db.companies.find({ "relationships":
                      { "$elemMatch": { "is_past": true,
                                        "person.first_name": "Mark" } } },
                  { "name": 1 }).count()


//upsert example. Last line has an upsert in it.
db.iot.updateOne({ "sensor": r.sensor, "date": r.date,
				  "valcount": { "$lt": 48 } },
						{ "$push": { "readings": { "v": r.value, "t": r.time } },
					   "$inc": { "valcount": 1, "total": r.value } },
				{ "upsert": true })



//.aggregate()
//allows you to filter data by filter gates/stages. this function takes an array of filter objects and passes the results from each gate/stage to the next.

db.listingsAndReviews.aggregate([
								 { "$match": { "amenities": "Wifi" } },
								 { "$project": { "price": 1,
												 "address": 1,
												 "_id": 0 }}]).pretty()


db.listingsAndReviews.aggregate([ { "$project": { "address": 1, "_id": 0 }},
                                  { "$group": { "_id": "$address.country" }}])

// Project only the address field value for each document, then group all documents into one document per address.country value, 
// and count one for each document in each group.
db.listingsAndReviews.aggregate([
                                  { "$project": { "address": 1, "_id": 0 }},
                                  { "$group": { "_id": "$address.country",
                                                "count": { "$sum": 1 } } }
                                ])			
								
								
db.listingsAndReviews.aggregate([
                                  { "$project": { "amenities": 1, "_id": 0 }},
                                  { "$group": { "_id": "$amenities",
                                                "count": { "$sum": 1 } } }
                                ])									



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

const aggr = [
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

// mostActiveCommenters
// 

try {
	const pipeline = [
						{ '$group': { '_id': '$email', 'count': { '$sum': 1 } } }, 
						{ '$sort': { 'count': -1 } }, 
						{ '$limit': 20 }, 
						//{ '$lookup': { 'from': 'users', 'localField': '_id', 'foreignField': 'email', 'as': 'result' } }
					  ]

	const readConcern = {readConcern: "majority"}

	const aggregateResult = await comments.aggregate(pipeline, {
	  readConcern,
	})

	return await aggregateResult.toArray()
	} catch (e) {
	console.error(`Unable to retrieve most active commenters: ${e}`)
	return { error: e }
}
// --------------------------------------------
// bulk writes
// --------------------------------------------
 db.stock.bulkWrite([
		{updateOne: {"filter": {"item":"apple"}, "update": {"$inc": {"quantity": 50}}}},
		{updateOne: {"filter": {"item":"butter"}, "update": {"$inc": {"quantity": 50}}}},
		{updateOne: {"filter": {"item":"bread"}, "update": {"$inc": {"quantity": 50}}}},
		{updateOne: {"filter": {"item":"celery"}, "update": {"$inc": {"quantity": 50}}}},
	],
		{ordered: false}
 )


  
  const client = await MongoClient.connect(
	'mongodb+srv://m001-student:m001-mongodb-basics@cluster0.nw16vl0.mongodb.net/test',
	{ useNewUrlParser: true, useUnifiedTopology: true }
  );
  const coll = client.db('sample_mflix').collection('movies');
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  await client.close();
