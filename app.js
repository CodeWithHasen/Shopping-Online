function GetCategories(){
    fetch("https://fakestoreapi.com/products/categories")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        data.unshift("All");
        for(var item of data)
        {
        var option = document.createElement("option");
        option.text = item.toUpperCase();
        option.value = item;
        document.getElementById("lstCategories").appendChild(option);
        }
    })
}

function GetProducts(url){
    document.getElementById("productsContainer").innerHTML="";
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            for(var item of data)
            {
                var div = document.createElement("div");
                div.className="card m-2 p-2";
                div.style.width="200px";
                div.innerHTML = `
                    <img src=${item.image} class="card-img-top" height="200">
                    <div class="card-header" style="height:140px">
                    <p>${item.title}</p>
                    </div>
                    <div class="card-body">
                        <p>${item.price}</p>
                        <p>Rating : ${item.rating.rate}</p>
                        <p>Count : ${item.rating.count}</p>
                    </div>
                    <div class="card-footer">
                        <button onclick="AddToCartClick(${item.id})" class="btn btn-danger w-100">
                        <span class="bi bi-cart4"></span> 
                        Add to Cart
                        </button>
                    </div>
                `;
                document.getElementById("productsContainer").appendChild(div);
            }
        })
}

function bodyload(){
    GetCategories();
    GetProducts("https://fakestoreapi.com/products");
    GetCartItemsCount();
}

function CategoryChange(){
    var categoryName = document.getElementById("lstCategories").value;
    if(categoryName=="All") {
        GetProducts("https://fakestoreapi.com/products");
    } else {
        GetProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
    }
}
var cartItems = [];
var count = 0;
function GetCartItemsCount(){
    count = cartItems.length;
    document.getElementById("cartCount").innerHTML = count;
}

function AddToCartClick(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        cartItems.push(data);
        alert("Item Added to Cart");
        GetCartItemsCount();
    })
}
function ShowCartClick(){
    document.querySelector("tbody").innerHTML ="";
    for(var item of cartItems){
        var tr = document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdPhoto = document.createElement("td");

        tdTitle.innerHTML = item.title;
        tdPrice.innerHTML = item.price;

        var img = document.createElement("img");
        img.src = item.image;
        img.width="100";
        img.height="100";

        tdPhoto.appendChild(img);

        tr.appendChild(tdTitle);
        tr.appendChild(tdPrice);
        tr.appendChild(tdPhoto);

        document.querySelector("tbody").appendChild(tr);
    }
}