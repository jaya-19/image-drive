var signForm = document.querySelector(".sign-form");
var allSignInput = signForm.querySelectorAll("input");
var loginForm = document.querySelector(".login-form");
var allLoginInput = loginForm.querySelectorAll("input");
var creatBtn = document.querySelector(".creat-btn");
var customForm = document.querySelector(".custom-form");
var customFormImg = document.querySelector(".custom-form-img");
var checkBoxes = document.querySelectorAll('input[name="gender"]');


creatBtn.onclick = function () {
customForm.classList.toggle("active");
customFormImg.classList.toggle("active");

}
//============sign up======//
signForm.onsubmit = function (e) {
    e.preventDefault();
    registerFunc();
};
const registerFunc = () => {
    console.log("success");
    var checkedGender;
    checkBoxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            checkedGender = checkbox.value;
        }
    });

    if (localStorage.getItem(allSignInput[2].value) == null
      
       
    )
      
        {
        var userData = {
            f_name: allSignInput[0].value,
            l_name: allSignInput[1].value,
            username: allSignInput[2].value,
            passoword: allSignInput[3].value,
            mobile: allSignInput[4].value,
            gender: checkedGender
           
        }
        localStorage.setItem(allSignInput[2].value, JSON.stringify(userData));
        swal("Good job!", "Registration Done!", "success");
        signForm.reset();
    }
 
     else {
        swal("Already Exist!", "Please change the Username !", "warning");
    }
}




//==============login=============//
loginForm.onsubmit = function (e) {
    e.preventDefault();
    loginFunc();    
}

const loginFunc = () => {
    if (allLoginInput[0].value && allLoginInput[1].value != "") {
        if (localStorage.getItem(allLoginInput[0].value) != null) {
            var data = JSON.parse(localStorage.getItem(allLoginInput[0].value));
            if (allLoginInput[1].value == data.passoword) {
                sessionStorage.setItem("username", allLoginInput[0].value); 
                window.location = "profile/profile.html";
                
            } else {
                swal("Your Passoword is wrong!", "Please Check the Passoword !", "warning");
            }
        } else {
            swal("User name not match!", "Please do registration first!", "warning");
        }
    } else {
        swal("Empty Field!", "Please fill all the data !", "warning");
    }
    loginFunc.reset();
}



