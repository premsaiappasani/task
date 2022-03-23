const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
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

var str="";

async function storeData(){
    const response = await fetch('https://api.wazirx.com/api/v2/tickers');
    const body = await response.json();
    let id=0;
    for(let elm in body){
        id++;
        if(id>10){break;}
        let elmData=body[elm];
    //    console.log(elmData);
        let name=elmData.base_unit,last=elmData.last,buy=elmData.buy,sell=elmData.sell,vol=elmData.volume,base_unit=elmData.base_unit;
        str+="("+id+",'"+name+"','"+last+"','"+buy+"','"+sell+"','"+vol+"','"+base_unit+"')";
        if(id!=10){
            str+=',';
        }
    }
    console.log(str);
    return str;
}

async function delData(){
    let bin = await client.query('delete from "company" where true',(err,res)=>{
        if(!err){
            console.log('dELETED successfully');
        }
    });
}

async function insertData(data){
    let bin2 =await client.query('INSERT INTO "company" ("id","name","last","buy","sell","vol","base_unit") VALUES '+data,(err,result)=>{
        if(err){
            console.log(err);
            str="";
            return 1;
        }
        else{
            str="";
            return 0;
        }
    });
}

app.get("/",async (req,res)=>{
    const deleteData= await delData();
    const data = await storeData();  
    const response = await insertData(data);
    const dbdata= await getData();
    console.log(dbdata);
    res.send("<h1>NICE</h1>");
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("Listening");
});

async function getData(){
    client.query('select * from "company"',(err,result)=>{
        console.log('done');
        if(!err){
            return result.rows;
        }
        else
        {
            return err;
        }
    });
}