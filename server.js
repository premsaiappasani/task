import fetch from 'node-fetch';
const express = require('express');

const {Client} = require('pg');
const app=express();


const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "onetwo",
    database: "postgres"
})

client.connect();

async function storeData(){
    const response = await fetch('https://api.wazirx.com/api/v2/tickers');
    const body = await response.json();
    let sl=0;
    for(let elm in body){
        sl++;
        if(sl>10){break;}
        let elmData=body[elm];
        let name=elmData.base_unit,last=elmData.last,buy=elmData.buy,sell=elmData.sell,vol=elmData.volume,base_unit=elmData.base_unit;
        client.query('insert into "company"("sl","name","last","buy","sell","vol","base_unit")value(sl,name,last,buy,sell,vol,base_unit)');
    }
    return 200;
}

app.get("/",async (req,res)=>{
    const data = await storeData();  
    res.send(data);
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("Listening");
});


// const { client } = require('pg/lib');

// client.query('select * from "company"',(err,result)=>{
//     console.log('done');
//     if(!err){
//         console.log(result.rows);
//     }
//     else
//     {
//         console.log(err);
//     }
//     client.end();
// });
