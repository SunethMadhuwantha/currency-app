const express=require("express")
const cors=require("cors")
const axios=require("axios");


const app=express();

app.use(express.json())
app.use(cors())

//all currencies in list
app.get("/getAllCurrencies", async (req,res)=>{
    const nameURL="https://openexchangerates.org/api/currencies.json?app_id=cb1dc9ec0c934f83a4d648e87dc43294";

    
    try {
       const namesResponse = await axios.get(nameURL);
    const nameData=namesResponse.data;

    return res.json(nameData) 
    } catch (err) {
        console.error(err);
        
    }
})


app.get("/convert", async (req, res)=>{
    const {date,sourceCurrency,targetCurrency,amountInSourceCurrency}=req.query;
    try {
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=cb1dc9ec0c934f83a4d648e87dc43294`;
        const dataResponse=await axios.get(dataURL);
        const rates=dataResponse.data.rates;

        const sourceRate=rates[sourceCurrency];
        const targetRate=rates[targetCurrency];

        const targetAmount=(targetRate / sourceRate)*amountInSourceCurrency;

        return res.json(targetAmount.toFixed(2));
    } catch (err) {
        console.error(err);
        
    }
})


app.listen(5000, ()=>{
    console.log("server started")
})