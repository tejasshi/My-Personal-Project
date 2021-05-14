

$(document).ready(function () {
  var name="";
  var email="";
  var contact="";
  var id="";
  var password="";
  var oldPass="";
  var newPass="";
  var confirmPass="";
  var user_data;
  let favSongList,user,playlist=[];
 var userDetails= JSON.parse(sessionStorage.getItem('UserDetails'));
 //console.log(userDetails);
 id=userDetails.id;
 console.log(id);
  $.getJSON('http://localhost:3000/users/'+id,UserData);
  var dataUrl;
pageOnLoad();
  function pageOnLoad(){

 $.getJSON("http://localhost:3000/images/"+userDetails.id,function(data){
               
                  sessionStorage.setItem('imageUrl',data.path);
                  //alert(data.path);
                  let recentImageUrl=sessionStorage.getItem('imageUrl'); 
                  document.querySelector('#profileimage').setAttribute("src",recentImageUrl);
                });
            
         }
 
 
  function UserData(data)
  {
        $('#myName').text(data.name);
        $('#myEmail').text(data.email); 
        user_data=data;
   ///hange Password Functionality
   
            $('#submitdata').click(function(){
               
                oldPass=$('#oldPass').val();
                newPass=$('#newPass').val();
                confirmPass=$('#confirmPass').val();
 
               // console.log(oldPass+'  '+newPass+'  '+confirmPass);
 
                if(oldPass == '' || newPass == ''  || confirmPass == '')
                {
                 alert('!!Please Fill All Details!!');
                }
                else if(oldPass==user_data.password)
                {
                  if(newPass==confirmPass){
                   var chnagepass={"id":data.id,"name":data.name,"contact":data.contact,"email":data.email,"password":confirmPass}
                   var url="http://localhost:3000/Users/"+data.id;
                    $.ajax
                   ({
                    type: "PUT",
                    dataType : 'json',
                    async: false,
                    url: url,
                    data:  chnagepass ,
                    success: function () {alert("PassWord Change Successfully!"); },
                    failure: function() {alert("Please Try Again!");}
             
                     });  
                    }
                  else{
                         alert(" please Confrim password")
                      }
                 }
                
                 
             
            });
   
 
   
   ///////////////////playlist Part Code//////////////////////////////////////////
 
  
   //userPlaylist(data);
   userPlaylist();    
   function userPlaylist()
   {
      
        var playlist=JSON.parse(localStorage.getItem(id));


       
         var ul = $('div.mycart');
 
 
 for(var i=0;i<playlist.length;i++)
 {
 ul.append('<div class="col py-2">'+
 '<div class="card" style="width: 17rem;">'+
 '<img src="'+playlist[i].image+'" class="card-img-top" id="img" alt="...">'+
 '<div class="card-body">'+
   '<h5 class="card-title">'+playlist[i].name+'</h5>'+
   '<div>'+playlist[i].artist+'</div>'+
   '<audio controls id="audioPanel">'+
   '<source src="'+playlist[i].path+'"type="audio/mpeg">'+
   '</audio>'+
 '</div>'+
 '</div>'+
 '</div>'
 );
 }
 
        
   }
    
  }
 

  // profile pic///////////////////////////////////////////////////////////////////////////////////////////////
     document.querySelector('#uploadImage').addEventListener("change",function(){
         console.log(this.files);
         const reader=new FileReader();
          
        
           reader.readAsDataURL(this.files[0]);
    
    
           reader.addEventListener("load",()=>{
            dataUrl=reader.result;
             sessionStorage.setItem('imageUrl',dataUrl);
            setImage();
           })
           
    
        })
       
       function setImage()
        {
           let getImageUrl=sessionStorage.getItem('imageUrl');
           console.log("geturl::"+getImageUrl);
          var post=getImageUrl;
           userid=id;
           //https://jsonplaceholder.typicode.com/posts
          fetch("http://localhost:3000/images",{
            method:'POST',
            body:JSON.stringify({
              id:userid,
              path:post
                
                
            }),
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            }
    })
      .then(function(response){
        
        return response.json()
      })
    .then(function(data){
    
    })
     
     }
    
    
    ///uplod
    
     document.querySelector('#changeImage').addEventListener("change",function(){
         console.log(this.files);
         const reader=new FileReader();
          
        
           reader.readAsDataURL(this.files[0]);
    
    
           reader.addEventListener("load",()=>{
            dataUrl=reader.result;
             sessionStorage.setItem('imageUrl',dataUrl);
            changeImage();
           })
           
    
        })
       
       function changeImage()
        {
           let getImageUrl=sessionStorage.getItem('imageUrl');
           console.log("geturl::"+getImageUrl);
          var post=getImageUrl;
           userid=id;
           //https://jsonplaceholder.typicode.com/posts
          fetch("http://localhost:3000/images/"+userid,{
            method:'PUT',
            body:JSON.stringify({
              id:userid,
              path:post
                
                
            }),
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            }
    })
      .then(function(response){
        
        return response.json()
      })
    .then(function(data){
    
    })
     
     }
     
     recentImageUrl=sessionStorage.getItem('imageUrl');     
    document.querySelector('#profileimage').setAttribute("src",recentImageUrl);
  
    $('#button-logout').click(function(){
      sessionStorage.setItem('imageUrl',null);
      sessionStorage.setItem('playlist',null);
      sessionStorage.setItem('recentsong',null);
      sessionStorage.setItem('language',null);
      window.location.href='./Home.html';
    })
  
    
  
 });
 
