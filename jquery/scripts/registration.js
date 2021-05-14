$(document).ready(function() {

   var userid=1;
   var password="";
   var cpassword="";
   var name="";
   var email ="";
    var mobile=1;
    $("#register").click(function() {
    name = $("#name").val();
    email = $("#email").val();
    password = $("#password").val();
    cpassword = $("#cpassword").val();
    mobile= $("#mobile").val();

    

    if (name == '' || email == '' || password == '' || cpassword == '' || mobile=='') {
    alert("Please fill all fields!!!");
    } 

    else if ((password.length) < 8) {
        console.log("going further");
    alert("Password should atleast 8 character in length...!!!!!!");
    } 
    else if ((password)!=(cpassword)) {
    alert("Your passwords don't match. Try again?");
    } 
   
   else if(mobile.length<10){
       alert("Invalid mobile number!!!");
   }
   
   
    else {
        alert("Registered!!!!");
         adduser();
       
    }
    });

     function adduser(){
        
        $.getJSON("http://localhost:3000/users",function(data){
            userid=parseInt(data[data.length-1].id+1);
        var newuser={"id":userid, "name":name,"contact":mobile, "email":email, "password": cpassword};
        //debugger;
        data.push(newuser);
        console.log(userid);
        console.log(data)

        $.ajax
    ({
        type: "POST",
        dataType : 'json',
        async: false,
        url: 'http://localhost:3000/users',
        data:  newuser ,
        success: function () {alert("Thanks!"); 
    window.open("./home.html")},
        failure: function() {alert("Error!");}
    });
        });
    }
    });