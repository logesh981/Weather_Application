const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const express=require('express')


const app=express()
//define path for express config
const pathDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(pathDirectory))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Logesh'
    })
}
)
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Logesh'
    })
}
)
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        name:'Logesh'
    })
}
)
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Something bad happened,Try providing an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location:place,
                forecast:forecastdata,
                address:req.query.address
            })
        })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{title:'Help error',message:'Help article Not found',name:'Logesh'})
})
app.get('*',(req,res)=>{
    res.render('error',{title:'Error',message:'page not found',name:'Logesh'})
})
app.listen(3000,()=>{
    console.log('Server is running on 3000')
})