var username = sessionStorage.getItem("username");
if (username == null) {

    window.location = "../index.html";
} else {
    
    localStorage.setItem("username", username);
}


// Set cookie function
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

setCookie("username", username, 7); 






var username = sessionStorage.getItem("username");
if (username == null) {

    window.location = "../index.html";
} else {
    
    localStorage.setItem("username", username);
}


var navbBrand = document.querySelector(".navbar-brand");

if (localStorage.getItem(username) != null) {
    var userData = JSON.parse(localStorage.getItem(username));
    console.log(userData);
    navbBrand.innerHTML = userData.f_name+"    "+ userData.l_name;
    console.log(navbBrand);
}

var logOutBtn = document.querySelector(".logout-btn");

// logOutBtn.onclick = function () {
//     this.innerHTML = "Please Wait...";
//     setTimeout(function (params) {
//         localStorage.removeItem("username");
//         window.location = "../index.html";
//     }, 2000);
// }

logOutBtn.onclick = function () {
    this.innerHTML = "Please Wait...";
    document.cookie = "username=; expires=Thu, 01 june 2024 00:00:00 UTC; path=/;";
    setTimeout(function () {
        localStorage.removeItem("username");
        window.location = "../index.html";
    }, 2000);
};



// start file coding

var imgurl;
var imgName;
var allImage = [];  
var uploadInput = document.querySelector(".upload-input");

uploadInput.onchange = function () {
    console.log(y=uploadInput.files[0]);
    if (uploadInput.files[0].size < 1000000) {
        var freader = new FileReader();
        freader.onload = function (e) {
            imgurl = e.target.result;
            console.log(imgurl);
            imgName = uploadInput.files[0].name;
        };
        
    
        freader.readAsDataURL(uploadInput.files[0]);
   
    } else {
        alert("File Size to Large");
    }

};


// start upload calling

var uploadBtn = document.querySelector(".upload-btn");
uploadBtn.addEventListener("click", () => {
    registerFun();
    getDataFunc();
});

if (localStorage.getItem(username + "_allImage") != null) {
    allImage = JSON.parse(localStorage.getItem(username + "_allImage"));
}

const  registerFun = () => {
    if (uploadInput.value != "" ) {
        allImage.push({
            imgUrl : imgurl,
            imgName : imgName
        });
        localStorage.setItem(username + "_allImage",JSON.stringify(allImage));
        swal("God Job!", "Image Registed Successfully!", "success");
  
    }
    else{
        swal("Empty Field!", "Please Upload Image First!", "warning");
    }
};


var allImageEl = document.querySelector('.all-image-field');
const getDataFunc =() => {
    allImageEl.innerHTML = "";
    allImage.forEach((img,index) =>{
        allImageEl.innerHTML += ` <div class="col-md-2 mb-4 text-center" index="${index}">
                <div class="card p-1 custom-card-height">
                    <div class="card-header">
                        <h5>
                           ${img.imgName}
                        </h5>
                    </div>
                    <div class="card-body">
                        <img src="${img.imgUrl}" alt="" class="w-75 custom-imag-height">
                    </div>
                   <div class="card-footer d-flex gap-2 justify-content-between">
                        <button class="btn view-btn text-white w-50" data-bs-toggle="modal" data-bs-target="#myModal"><i class="fa-solid fa-eye"></i></button>
                        <button class="btn text-white w-50 del-btn"><i class="fa-solid fa-trash"></i></button>
                   </div>
                </div>
            </div>`;
    });

    // start delete coding
    var alldelBtn = document.querySelectorAll(".del-btn");

    for (let i = 0; i < alldelBtn.length; i++) {
        alldelBtn[i].onclick = function () {
            var parent = this.parentElement.parentElement.parentElement;
            var index = parent.getAttribute("index");
            console.log(parent);
            console.log(index )
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    allImage.splice(index,1);
                    localStorage.setItem(username + "_allImage", JSON.stringify(allImage)); 
                    parent.remove();
                    swal("Poof! Your imaginary file has been deleted!", { icon: "success" });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
        }
    }

    var allViewBtn  = document.querySelectorAll(".view-btn");
    var imgBox = document.querySelector(".img-box");
    var modaltitle = document.querySelector(".modal-title");

    for (let i = 0; i < allViewBtn.length; i++) {
        allViewBtn[i].onclick = function () {
            var parent = this.parentElement.parentElement;
            console.log(parent);
            var imgName = parent.querySelector("h5").innerHTML;
            var src =  parent.querySelector('img').src;
            console.log(src);
            modaltitle.innerHTML = imgName;
            imgBox.src = src;
        }
    }
};

getDataFunc();
