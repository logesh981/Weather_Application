const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibG9nZXNoaCIsImEiOiJjazNkemZoem0xZTl3M2RydGFocjJ5bDV3In0.Nk82DrGOK0ohoItkGwD3Mw'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('cannot connect with the Api',undefined)
        }
        else if(body.features.length==0){
            callback('cannot find the requested place',undefined)
        }
        else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                place:body.features[0].place_name
            })
        }
    })
}
module.exports=geocode