import express from 'express';
import fetch from 'node-fetch';
const app=express();

async function getData(){
    const response = await fetch('https://api.wazirx.com/api/v2/tickers')
    return response.text();
}

app.get("/",(req,res)=>{
    res.send(getData());
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("Listening");
});