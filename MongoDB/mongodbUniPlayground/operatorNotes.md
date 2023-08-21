Show dbs
Use sample_training
Show collections

Functions: 
	- .findOne()
	- .find()
	- .updateOne()
	- .updateMany()
	- .deleteOne()
	- deleteMany()
	- .insert()

Operators:
	- $push - adds element to array. Converts field to array if wasn't previously.
	- $set
	- $inc
	- $unset
	- $eq - Equal to
	- $ne - Not equal to
	- $gt - Greater than
	- $lt - Less than
	- $gte - Greater than or equal to
	- $lte - Less than or equal to
	- $and -  $and: [ { <operator > : <value> } , { <operator> : <value>} ]
	- $or
	- $nor
	- $not
	- $expr { $expr: { <expression> } }  $<field name> denotes value
	- $size - {<array field> : {"$size": <number>}} Returns a cursor with all documents where the specified array field is exactly the given length
	- $all - {<array field> : {"$all": <array>}} Returns a cursor with all documents in which the specified array field contains all the given elements regardless of their order in the array.
	- $elemMatch - Query elements in an array 
	
db.zips.find({<field>: <value>})
db.zips.find( { <field> : { <operator> : <value> } } )
db.zips.find( { <field> : { $and: [ { <operator > : <value> } , { <operator> : <value>} ] }} )



db.inspections.findOne()

db.inspections.insert()

let [gteCount, gtCount] = [db.trips.find({"birth year":{$gt:1998}}).count(), db.trips.find({"birth year": {$eq:1998}}).count()]

db.zips.countDocuments({"state":"GA", "pop": {$gt : 1000}})


Best to use "$and" when using an operator more than once in the same query eg. {$or:{<field>: [value0], <field>: [value1>}, $or:{<field>:<value>}
Wasteful "$and" test: db.zips.find({"state":"GA", $and:[{"pop": {$gt : 5000}}, {"city":{$ne : "ATLANTA"}}]}).count()
More efficient version: db.zips.find({ "state":"GA", "pop": {$gt : 5000, $lt : 25000}, "city":{$ne : "ATLANTA"} }).count()

db.zips.countDocuments({"pop":{$lt:1000000,$gt:5000}})

Projections:
Projections allow you to specify which fields to include/exclude. You cannot mix and match includes/excludes unless it's to exclude the _id value. To include {<field name> : 1 }, to exclude {<field name> : 0}
db.<collection>.find({ <query>}, { <projection> })

db.listingsAndReviews.find({"property_type":"House", "amenities":{$all:["Changing table"]}},{"amenities":0, "reviews":0, "host": 0})

$elemMatch Matches documents that contain an array field with at least one element that matches the specified query criteria. 
		- OR -
Projects only the array elements with at least one element that matches the specified criteria.

db.grades.find({ "scores": { "$elemMatch": { "type": "extra credit" } }
               }).pretty()

use sample_training

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

.sort().limit()
use sample_training

Ascending
db.zips.find().sort({ "pop": 1 }).limit(1)

db.zips.find({ "pop": 0 }).count()

Descending
db.zips.find().sort({ "pop": -1 }).limit(1)

db.zips.find().sort({ "pop": -1 }).limit(10)

db.zips.find().sort({ "pop": 1, "city": -1 })

upsert
upsert is false by default. When set to true, an update command can create a new document if conditions are met.

db.iot.updateOne({ "sensor": r.sensor, "date": r.date,
                   "valcount": { "$lt": 48 } },
                         { "$push": { "readings": { "v": r.value, "t": r.time } },
                        "$inc": { "valcount": 1, "total": r.value } },
                 { "upsert": true })

.aggregate()
allows you to filter data by filter gates/stages. this function takes an array of filter objects and passes the results from each gate/stage to the next.

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
0.0.0.0/0
