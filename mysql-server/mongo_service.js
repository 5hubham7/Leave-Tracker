const mongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://shubham:Shubham@123@ltcluster.p4e1p.mongodb.net/";
const dbname = "LTDB";

const getNextSequence = async (sequenceOfName) => {
    let client = new mongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    let col = client.db(dbname).collection("sequences");

    let sequenceDoc = (
        await col.findOneAndUpdate(
            { _id: sequenceOfName },
            { $inc: { sequence_value: 1 } },
            { new: true }
        )
    ).value;
    return sequenceDoc;
};

// CREATE

const insertOne = async (collectionname, json, id) => {
    let client = new mongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    let col = client.db(dbname).collection(collectionname);
    let sequenceDoc = await getNextSequence(id);

    json[id] = sequenceDoc.sequence_value + 1;
    // json["employee_id"] = (await col.find().count()) + 1;
    let result = await col.insertOne(json);
    client.close();
    return result;
};

// READ

const find = async (collectionname, json) => {
    let client = new mongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    let col = client.db(dbname).collection(collectionname);
    let result = await col.find(json).toArray();
    client.close();
    return result;
};

const findOne = async (collectionname, json) => {
    let client = new mongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    let col = client.db(dbname).collection(collectionname);
    let result = await col.find(json).toArray();
    client.close();
    return result;
};

const updateOne = async (collectionname, json1, json2) => {
    let client = new mongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    let col = client.db(dbname).collection(collectionname);
    let result = await col.updateOne(json1, { $set: json2 });
    client.close();
    return result;
};

// DELETE

const deleteOne = async (collectionname, json) => {
    let client = new mongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    let col = client.db(dbname).collection(collectionname);
    let result = await col.deleteOne(json);
    client.close();
    return result;
};

module.exports = { insertOne, find, findOne, updateOne, deleteOne };
