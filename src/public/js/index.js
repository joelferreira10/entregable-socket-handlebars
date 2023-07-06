const socket=io();
const form=document.getElementById('form')
const nameForm=document.getElementById('name')
const priceForm=document.getElementById('price')
const btn=document.getElementById('btn')
let productsForm=document.getElementById('products')

btn.addEventListener('click',()=>{
    let name=nameForm.value;
    let price=priceForm.value
    socket.emit('newUser',{name,price})
    
    nameForm.value=""
    priceForm.value=""
})
// form.addEventListener('submit',(e)=>{
//     e.preventDefault();})
// form.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     let name=nameForm.value
//     let price=priceForm.value

//     socket.emit('newUser',{name,price})
//     nameForm.value=""
//     priceForm.value=""
//     console.log("producto enviado")
// })

socket.on('products',products=>{
    console.log("products enviados",products)
    let productsInfo=""
    products.forEach(item => {
        productsInfo+=`
            ${item.name} - ${item.price}<br>
        `
    });
    productsForm.innerHTML=productsInfo
})
// socket.emit('message2',"Hola desde el front")
// socket.emit('message',"hola, me comunico desde websocket")
// socket.on("evento_para_socket_individual",data=>{
//     console.log(data)
// })

// socket.on('evento_para_todos_menos_el_socket_actual',data=>{
//     console.log(data)
// })

// socket.on('evento_para_todos',data=>{
//     console.log(data)
// })
