const express = require('express')
const app = express()

app.use(express.static('public'))




let now = new Date().getUTCHours();
console.log(new Date().getUTCHours());

app.get('/', (req,res)=>{
    if (now >= 6 && now <= 12)
    res.send(`<h3 style="color:Tomato">Buenos dias!</h3>`);
    if (now>=13 && now <= 19)
    res.send(`<h3 style:"MediumSeaGreen">Buenas tardes!</h3>`)
    else
    res.send(`<h3 style:"SlateBlue">Buenas noches!</h3>`)

})

app.get('/random',(req,res)=>{
    let numbers= []
    let numbersObject= new Object();
    for(let i=0 ; i<100; i++){
     let randomNum=Math.floor(Math.random() * 21);
     numbers.push(randomNum)
    }
    
    for(let i=0; i<numbers.length;i++){
        if(numbersObject[numbers[i]]){
            numbersObject[numbers[i]]++
        }
        else{
        numbersObject[numbers[i]]=1
        }
    }
    res.send(`<h3>${JSON.stringify(numbersObject)}</h3>`)
    
})


app.get('/info',(req,res)=>{

})

app.get('/operaciones',(req,res)=>{
    let num1 = parseFloat(req.query.num1);
    let num2 = parseFloat(req.query.num2);
    let operacion = req.query.operacion;
    switch(operacion){
        case "suma":
            res.send(`<h2>${JSON.stringify({num1,num2,operacion,"resultado":num1+num2})}</h2>`)
            break;
        case "resta":
            res.send(`<h2>${JSON.stringify({num1,num2,operacion,"resultado":num1-num2})}</h2>`)
            break;
        case "division":
            res.send(`<h2>${JSON.stringify({num1,num2,operacion,"resultado":num1/num2})}</h2>`)
            break;
        case "multiplicacion":
            res.send(`<h2>${JSON.stringify({num1,num2,operacion,"resultado":num1*num2})}</h2>`)
            break;
        default:
            res.send(`<h2>${JSON.stringify({"error":{num1,num2,operacion}})}</h2>`)        
    }



})




app.set('PUERTO', 8080)
const PORT = process.env.PORT || app.get('PUERTO')





const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en Servidor: ${error}`))