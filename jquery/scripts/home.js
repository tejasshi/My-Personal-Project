$(document).ready(function() {
    var password="";
    var email ="";
    var isRegistered=false;
    var userDetails="";
   $("#login-btn").click(function() {
    email = $("#email").val();
    password = $("#password").val();
     
   // console.log(email + " " + password);
        $.getJSON("http://localhost:3000/users",function(data){
            console.log(data);
            $.each(data,function(kry,value){
                if(email === value.email && password===value.password){
                    isRegistered=true;
                    userDetails=value;
                }
            });

            if(!isRegistered){
                console.log("login failed");
            }else{
                //debugger;
                alert("login successfull!!");
                sessionStorage.setItem("UserDetails",JSON.stringify(userDetails));
                window.location.href="./languagePage.html"
            }


            // const value=data.some(u => u.email === email && password === u.password);
            // if(data.some(u => u.email === email && password === u.password)){
            //    console.log(data);
            // }
            //    });
                // console.log(value);
                //alert("Login Successfull!!!");
               // location.href = "./languagePage.html";
            // }
            // else{
            //     // console.log(value);
            //     alert("Please enter valid email & password");
            //     return false;
            // }
        });
    });

});


