$.getJSON( "js/data.json", function(data) {
var mainArray = data;
var currentArr = [];
var typeArr = [];
var cart = [];
let sex = ['mens','womens'];
let sizes = ['s','m','l','xl'];
let colors = ["white","black","red","yellow","blue","grey","brown"];
let types = ['Shirt','Dress','Tshirt','Jacket','Fragnance','Bags','Boots','Heels'];
let filteredCart = [];
    // These are the Generic Filter Functions That Will Filter The Items On The Array Of Objects
    var gender = (inp) => { return currentArr.filter(item => item.gender === inp); }
    var type = (inp) => { return typeArr.filter(item => item.type === inp); }
    var size = (inp) => { return currentArr.filter(item => item.size === inp); }
    var color = (inp) => { return currentArr.filter(item => item.color === inp); }
    typeArr = mainArray;
    currentArr = mainArray;
var resetFunction = function()
{   
 $('.item').mouseover(function (){
this.querySelector('.description').style.display = "none";  
this.querySelector('.addToCart').classList.add("fadeInUp");
this.querySelector('.addToCart').style.display = "";
});
$('.item').mouseout(function (){
this.querySelector('.addToCart').style.display = "none";
this.querySelector('.description').style.display = "";  
this.querySelector('.description').classList.add("fadeIn"); 
});

$('.addToCart').click(function(){
    let item=0;
    let cartItem = this.parentNode.lastChild.previousSibling;
    let itemName = cartItem.firstChild.textContent;
    let itemPrice = cartItem.lastChild.textContent;
        var cartProduct = function(name,price,count){
        this.name = name;
        this.price = parseInt(price);
        this.count = parseInt(count);
    }

    let createCart = (name,price,count=1)=>{
        let obj = new cartProduct(name,price,count);
        cart.push(obj);
    }
    createCart(itemName,itemPrice);
    document.querySelector('.cart sup').textContent = cart.length;
});
let carts = [...document.querySelectorAll('.addToCart')];
carts.map(a=>a.style.display="none");
}
    //This Function Display All The Elements of Array Using the .map method on array we pass 'arr'
    //and By Using Template Strings Outputs The Data On The Screen Add To


    showProducts = (arr) => {
    document.querySelector(".rightMainContent").innerHTML = arr.map(item => `<div class="item"><img src="img/products/${item.image}.jpg">
    <div class="description animated"><h1>${item.name}</h1><h3 class"price">${item.price}</h3></div><p class="addToCart animated">Add To<i class="fa fa-shopping-cart" aria-hidden="true"></i></p></div>`).join('');
    resetFunction();
    }
    var showCart = (arr)=> arr.map(a=>`<div class="cart-item"><h1>${a.name}</h1><h2>${a.price}</h2><h2>${a.count}</h2></div>`).join(''); 


//Initially Displaying Products
showProducts(currentArr);
//This Function Evaluates The URL For id Attribute thrown by Index.html
// a href="shop.html#'idname'"
(()=>{
    if(document.location.href.includes('men')){
        currentArr =  gender("mens");
        showProducts(currentArr);
    }
    else if (document.location.href.includes("women")){
        currentArr = gender("womens");
        showProducts(currentArr);    
    }
    else if (document.location.href.includes("dress")){
        currentArr = type("dress");
        showProducts(currentArr);    
    }
    else if (document.location.href.includes("fragnance")){
        currentArr = type("fragnance");
        showProducts(currentArr);    
    }
    else if (document.location.href.includes("jackets")){
        currentArr = type("jacket");
        showProducts(currentArr);    
    }
    else if (document.location.href.includes("shirt")){
        currentArr = type("shirt");
        showProducts(currentArr);
    }
    else if (document.location.href.includes("boots")){
     currentArr = type("boots");
     showProducts(currentArr);
     }
    else if (document.location.href.includes("tops")){
    currentArr = gender("womens").filter((a)=>a.type == "tshirt");
     showProducts(currentArr);
     }
    else if (document.location.href.includes("heels")){
    currentArr = type("heels");
    showProducts(currentArr);
    }
    else if (document.location.href.includes("mfrag")){
    currentArr = gender("mens").filter((a)=>a.type == "fragnance");
    showProducts(currentArr);
    }
    else if (document.location.href.includes("wfrag")){
    currentArr = gender("womens").filter((a)=>a.type == "fragnance");
    showProducts(currentArr);
    }
    else if (document.location.href.includes("mjacket")){ 
    currentArr = gender("mens").filter((a)=>a.type == "jacket");
    showProducts(currentArr);
    }
    else if (document.location.href.includes("wjacket")){ 
    currentArr = gender("womens").filter((a)=>a.type == "jacket");
    showProducts(currentArr);
    }

    else if (document.location.href.includes("mbag")){ 
        currentArr = gender("mens").filter((a)=>a.type == "bags");
    showProducts(currentArr);
    }
    else if (document.location.href.includes("wbag")){ 
    currentArr = gender("womens").filter((a)=>a.type == "bags");
    showProducts(currentArr);
    }
    currentArr = mainArray;
})();

//this IIFE(implicitly invoked function expression) sets the color pickers color according to their ids
// To Add Color Just Set The Id of the Div the Color You Want to Set and add class 'colorpicker'
// <div class="colorpicker" id="white"></div>
(()=> {
let nodeList = [...document.querySelectorAll(".colorpicker")];
nodeList.map((a)=>a.style.backgroundColor = a.id);
})();
//This Will Out Put The Type Array Defined On The Top
(()=> {
let nodeList = document.querySelectorAll(".item");
Array.prototype.slice.call(nodeList).map((a)=> a.style.backgroundColor = a.id);
})();
(()=>{ document.querySelector('#categoryDrop').innerHTML = types.map((a)=> `<h4>${a}</h4>`).join('')})();

//This Code Uses The Event Method To Pick The H4 Element and Run The Filter Functions on them
//This Method Keeps The Dom Clean For Less Ambiguity
$(".sidebar h4,.colorpicker").click(function(event) {
    var text = event.target.innerText;
        document.querySelector('.shopCategory h1').textContent = text;
        var a = event.target.id; //this is just for using color filter
        if(sex.includes(text)) {
                typeArr = gender(text);
                showProducts(typeArr);      
                }
        else if(sizes.includes(text)) {
                showProducts(size(text));
                }
        else if (colors.includes(a)) {
                showProducts( color(a));
            }
        else  if(types.includes(text)) 
            {
                showProducts(type(text.toLowerCase()));
                currentArr = type(text.toLowerCase());
                }

//This IIFE Replaces The Empty Array With a PlaceHolder Text
    (function(){
        //currentArr = mainArray;
    let a = document.querySelector(".rightMainContent").innerHTML;
    if (a == "") {
    document.querySelector('.error').textContent = "Sorry No Product Matcing Your Criteria";
    showProducts(currentArr);
    }
    })();
    $(".removeFilters").click(()=> {
        showProducts(currentArr);
    });
    });
//Sort
$('.lowSort').click(function(){showProducts(currentArr.sort((a,b)=>a.price>b.price?1:-1))});
$('.highSort').click(function(){showProducts(currentArr.sort((a,b)=>a.price>b.price?-1:1))});

var c = (arr) => {
            let countCart = arr.map(a=>a.name).reduce((a,b)=>{
            if(!a[b]){a[b]=1;}
            else {a[b]+=1;}
            return a;
         }
         ,{});
        arr.map( (a)=> { a.count = countCart[a.name]; });
        var uniq = new Set(arr.map(e => JSON.stringify(e)));
        filteredCart = Array.from(uniq).map(e => JSON.parse(e));
        document.querySelector('.cart sup').textContent = arr.length;
        var total = arr.reduce((a,b)=>a.price+b.price);
        document.querySelector(".cartContainer").innerHTML = showCart(filteredCart) +"<button class='saveCart'>Save Cart</button>"+"<button class='clearCart'>Clear Cart</button>";
        $('.saveCart').click(function(){ 
            window.localStorage.setItem('savedCart',JSON.stringify(arr));
            //let total = arr.reduce((a,b)=> a.price+b.price);
            console.log(filteredCart.map(a=>console.log(a)));
             //alert('cart saved');          
                                });
        $('.clearCart').click(function(){ 
            cart = []; 
            window.localStorage.setItem('savedCart',JSON.stringify(cart));
            showCart(cart);
            });
}
(()=>{
    fCart = JSON.parse(window.localStorage.getItem('savedCart'));
    console.log(fCart);
    if(fCart){
    document.querySelector('.cart sup').textContent = fCart.length;
    cart = fCart;
    }
    })();
$('.cartContainer').hide();
$('.cart i').mouseover(() => {
    $('.cartContainer').fadeIn();
    //Tally Function That Returns an Object That is used to assign the Count To The Item
             c(cart);
             });
//Animation For Cart Disappearing
$('.rightMainContent').mouseover(()=>$('.cartContainer').fadeOut(1000));
//console.log(cart);
});
