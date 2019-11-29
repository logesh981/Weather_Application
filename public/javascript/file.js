console.log('javascript file loaded')

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message1')
const message2=document.querySelector('#message2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    message1.textContent='loading..'
     message2.textContent=''
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           console.log(data.error)
           message1.textContent=data.error
        }
        else{
           console.log(data.location)
           console.log(data.forecast)
           message1.textContent=data.location
           message2.textContent=data.forecast
        }
    })
})
})