Download the CLI Client
Npm install -g mongodb-realm-cli

Create a programmatic API Key
sdepprcw
f1b0384a-d12a-4a20-a34e-1a97f07381d5

Authenticate to realm-cli
realm-cli login --api-key sdepprcw --private-api-key f1b0384a-d12a-4a20-a34e-1a97f07381d5

realm-cli pull --remote app-0-xwvob --template web.graphql.todo


m001-student
m001-mongodb-basics


mongodb+srv://m001-student:m001-mongodb-basics@cluster0.nw16vl0.mongodb.net/test


Login:
mongo "mongodb+srv://cluster0.nw16vl0.mongodb.net/myFirstDatabase" --username m001-student --password m001-mongodb-basics

mongosh "mongodb+srv://cluster0.nw16vl0.mongodb.net/myFirstDatabase" --username m001-student --password m001-mongodb-basics

Vscode: 
MongoDB: Connect



mongodump --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"

mongoexport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --collection=sales --out=sales.json

mongorestore --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"  --drop dump

mongoimport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --drop sales.json
