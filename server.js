import express from 'express';
import fetch from 'node-fetch';
const app=express();

async function getData(){
    const response = await fetch('https://api.wazirx.com/api/v2/tickers');
    const body = await response.json();
    return body;
}

app.get("/",async (req,res)=>{
    const data = await getData();  
    res.send(data);
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("Listening");
});