// data
products=[
    {
        id:1,
        name:"Apple",
        price:500
    },
    {
        id:2,
        name:"Grape",
        price:800
    },
    {
        id:3,
        name:"Pineapple",
        price:1000
    },
    {
        id:4,
        name:"Banana",
        price:200
    }
    ,{
        id:5,
        name:"Orange",
        price:300
    }
]




// let filter=products.filter(product=>{
//     // product.price+=100
//     return product.price>=500
//
// })

// selector
const invoiceDate=document.getElementById('invoice-date')
const invoiceNumber=document.getElementById("invoice-number")
const productSelect=document.getElementById("productSelect")
const Quantity=document.getElementById("quantity")
const newListForm=document.getElementById("newListForm")
const rows=document.getElementById("rows")
const costTotal=document.getElementById("costTotal");
const addProduct=document.getElementById("addProduct");
const newProductForm=document.getElementById("newProductForm");

const addProductModal=new bootstrap.Modal('#addProductModal')

newProductForm.addEventListener('submit',function (e){
    e.preventDefault();

    let formData=new FormData(this);
    products.push({
        id: Number(formData.get('id')),
        name:formData.get('name'),
        price:formData.get('price')

    })
    productSelect.append(new Option(formData.get('name'),formData.get('id')))
    this.reset();
    addProductModal.toggle();
})

    // localStorage.setItem("products",JSON.stringify())
// products.forEach(product=>{
//     let option=document.createElement('option')
//     option.value=product.id
//     option.innerText=product.name;
//     productSelect.append(option)
// })


addProduct.addEventListener('click',_=>{
    addProductModal.toggle();
})

products.map(product=>productSelect.append(new Option(product.name,product.id)))

function calcCostTotal(){
    const costs=document.querySelectorAll('.cost');
    let total=[...costs].reduce((pv,cv)=>pv+parseFloat(cv.innerText),0);
    // costs.forEach(cost=>total+=parseFloat(cost.innerText))
    // costTotal.innerText=total;
    costTotal.innerText=total;
    let msg = new SpeechSynthesisUtterance();
    msg.text = 'You chose product cost is'+total;
    window.speechSynthesis.speak(msg);
}
rows.addEventListener('click',e=>{
    // console.log(e.target)
    if(e.target.classList.contains('del-rows')){
        // console.dir(e.target.parentElement.parentElement)
        // console.log(e.target.closest('tr'))
        if(confirm("Are U sure to Delete")){
        e.target.closest('tr').remove();
        calcCostTotal();
        console.log("del")}
    }
})
newListForm.addEventListener('submit',e=>{
    e.preventDefault();
    const formData=new FormData(newListForm);


    let currentProduct=products.find(product => product.id===parseInt(formData.get("product")));

    // console.log(productSelect.value,Quantity.valueAsNumber);


    const tr=document.createElement('tr');
    // tr.innerHTML=`
    //                 <td>${currentProduct.id}</td>
    //               <td>${currentProduct.name}</td>
    //               <td>${currentProduct.price}</td>
    //               <td>${formData.get('quantity')}</td>
    //               <td>${currentProduct.price*Quantity.value}</td>
    //             `;
    // rows.append(tr);
    const currentRows=document.querySelectorAll('tr[product-id]');
    const isExit=[...currentRows].find(row=>row.getAttribute('product-id')===currentProduct.id);
   if(isExit){

       let currentRowQuantity=isExit.querySelector('.row-quantity')
       currentRowQuantity.innerText=parseFloat(currentRowQuantity.innerText)+parseFloat(Quantity.value);
       isExit.querySelector('.cost').innerText=parseFloat(currentRowQuantity.innerText)*currentProduct.price

   }else{
       let row=rows.insertRow();
       row.setAttribute('product-id',currentProduct.id)
       let cell1=row.insertCell();
       cell1.innerHTML=`<button class="btn btn-outline-danger btn-sm del-rows d-print-none"><i class="bi bi-trash pe-none"></i></button>`;
       let cell2=row.insertCell();
       cell2.innerText=currentProduct.name;
       let cell3=row.insertCell();
       cell3.classList.add('text-end');
       cell3.innerText=currentProduct.price;
       let cell4=row.insertCell();
       cell4.innerText=Quantity.value;
       cell4.classList.add('text-end','row-quantity');

       let cell5=row.insertCell();
       cell5.innerText=(currentProduct.price)*(Quantity.value);
       cell5.classList.add('text-end','cost');

   }
    newListForm.reset();
    calcCostTotal();



})

const getRandomID=(min=10000,max=90000)=>{
    min=Math.floor(min)
    max=Math.ceil(max)
    return Math.floor(Math.random()*(max-min)+1)+min
}
invoiceNumber.value=getRandomID();
invoiceDate.valueAsDate=new Date();