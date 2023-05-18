const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7k8mkis.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('portfolio').collection('project');
       


       
        app.post('/project', async(req, res) =>{
            const user = req.body;
            console.log(user);
            const result = await serviceCollection.insertOne(user)
            res.send(result);
        })
        app.get('/project', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        });
        // app.get('/project', async (req, res) => {
        //     const query = {}
        //     const cursor = serviceCollection.find(query).sort({_id:-1});
        //     const services = await cursor.toArray();
        //     res.send(services);
        // });

        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });
        // orders api

        
        
    }
    finally{
        
    }

}
run().catch(err => console.error(err));



app.get('/', (req, res) =>{
    res.send('portfolio service is running')
})

app.listen(port, () =>{
    console.log(`portfolio service is running on ${port}`);
})