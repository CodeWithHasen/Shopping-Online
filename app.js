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
var totalPrice = 0;

function GetCartItemsCount(){
    count = cartItems.length;
    document.getElementById("cartCount").innerHTML = count;
    CalculateTotalPrice();
}

function AddToCartClick(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(response => response.json())
    .then(data => {
        cartItems.push(data);
        alert("Item Added to Cart");
        GetCartItemsCount();
        ShowCartClick();
    });
}
function ShowCartClick(){
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    for(let i = 0; i < cartItems.length; i++){
        let item = cartItems[i];

        let tr = document.createElement("tr");

        let tdTitle = document.createElement("td");
        tdTitle.innerHTML = item.title;

        let tdPrice = document.createElement("td");
        tdPrice.innerHTML = `&#8377;${item.price.toFixed(2)}`;

        let tdPhoto = document.createElement("td");
        let img = document.createElement("img");
        img.src = item.image;
        img.width=50;
        img.height=50;
        tdPhoto.appendChild(img);

        let tdTrash = document.createElement("td");
        let btnDelete = document.createElement("button");
        btnDelete.className = "btn btn-danger btn-sm";
        btnDelete.innerHTML = `<span class="bi bi-trash"></span>`;
        btnDelete.onclick = function() {
            RemoveFromCart(i);
        };
        tdTrash.appendChild(btnDelete);

        tr.appendChild(tdTitle);
        tr.appendChild(tdPrice);
        tr.appendChild(tdPhoto);
        tr.appendChild(tdTrash);

        tbody.appendChild(tr);
    }

    CalculateTotalPrice();
}

function RemoveFromCart(index) {
    cartItems.splice(index, 1);
    ShowCartClick();
    GetCartItemsCount();
}

function CalculateTotalPrice() {
    totalPrice = cartItems.reduce((sum, item) =>sum + item.price, 0);
    document.getElementById("totalAmount").innerHTML = `Total: &#8377;${totalPrice.toFixed(2)}`;
}