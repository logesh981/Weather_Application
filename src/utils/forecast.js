const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/76fa021d4a6e8acb680d9e8b4ac6404d/'+latitude+','+longitude+'?units=si'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to darkSky API',undefined)
                }
        else if(body.error){
            callback('some mysterious error occured',undefined)
                }
        else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}
module.exports=forecast