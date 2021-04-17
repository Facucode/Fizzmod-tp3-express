import express from 'express';
const app = express();
import * as fs from 'fs';


app.use(express.static('public'))




let date = new Date();
let now = date.toLocaleTimeString('en-GB',{hour:'2-digit'})

console.log(now);

app.get('/', (req,res)=>{
    if (now >= 6 && now <= 12)
    res.send(`<h3 style="color:Tomato">Buenos dias!</h3>`);
    if (now>=13 && now <= 19)
    res.send(`<h3 style="color:MediumSeaGreen">Buenas tardes!</h3>`)
    else
    res.send(`<h3 style="color:SlateBlue">Buenas noches!</h3>`)

})

app.get('/random',(req,res)=>{
    let numbers= []
    let numbersObject= new Object();
    for(let i=0 ; i<10000; i++){
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


app.get('/info', async (req,res)=>{
    async function contenido() {
        try{
    let data =  await fs.promises.readFile('package.json','utf-8')
        return data}
        catch(error){
            console.log('ERROR leyendo archivo')
        } 

    
    }
       
    

    let info = {
        //contenidoStr:JSON.stringify(contenido()),
        //contenidoObj:JSON.parse(this.contenidoStr),
        //size:contenido().length
    }
    let contenidoInfo = await contenido()
    info["contenidoStr"]= JSON.stringify(JSON.parse(contenidoInfo));
    info["contenidoObj"]= JSON.parse(contenidoInfo)
    info["size"]=contenidoInfo.length

    await console.log(info)

    res.send(`<h2>${JSON.stringify(info)}</h2>`);
    (async () => {
    await fs.promises.writeFile('info.txt', JSON.stringify(info,null,2))
    })()

    

})

app.get('/operaciones?:num1?:num2?:operacion',(req,res)=>{
            
    
    if(req.query.num1 && req.query.num2 && req.query.operacion){     
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

    
    
}
else{
    res.sendFile(process.cwd()+'/public/operaciones.html')

}

})



app.set('PUERTO', 8080)
const PORT = process.env.PORT || app.get('PUERTO')





const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en Servidor: ${error}`))