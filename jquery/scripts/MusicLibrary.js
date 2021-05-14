let language;
let songs=[];
let albums=[];
let languageSongs=[];
let selectedSongs=[];
let jazz=[];
let rock=[];
let classical=[];
let recentSong=[];
$(document).ready(function(){
   
    language=sessionStorage.getItem("language");
    console.log(language);

    $.getJSON("http://localhost:3000/songs",function(data){
    songs=data;

    getAllSongs(songs);
    
    });

    $("#search").keyup(function(){
        $("#result").html(' ');
        var searchField=$("#search").val();
        if(searchField=="")
        {
            document.getElementById("register").innerHTML="";
        }
        var expression=new RegExp(searchField,"i");
        $.each(selectedSongs,function(key,value){
            if(value.name.search(expression) != -1 || value.album.search(expression)!= -1)
            {
                
                $("#result").append(`<li class="list-group-item" ><img src="${value.image}" height="40" width="40" class="img-thumbnail" />'${value.name}'  | <span class="text-muted">'${value.album}'</span><br><button type="submit" onclick="playTrack('${value.name}','${value.album}')">Play</button></li>`);
            }
        });

    });

    let profilename=document.getElementById("profile-name");
    var name=JSON.parse(sessionStorage.getItem("UserDetails"));
     profilename.innerHTML=name.name;


     
$('#button-logout').click(function(){
    sessionStorage.setItem('playlist',null);
    sessionStorage.setItem('recentsong',null);
    sessionStorage.setItem('language',null);
    window.location.href='./Home.html';
  })
});

function getRecentSong(){
    recentSong[0]=JSON.parse(sessionStorage.getItem("recentsong"));
    
    var ul=$('div.recentplay');
         ul.append(`<div class="col py-4 col-sm-8 ">
         <div class="card">
            <img src="../images/${recentSong[0].image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${recentSong[0].name}</h5>
            <div class="text-center">
            <button type="button" class="btn btn-outline-danger" onclick="recentPlayed()" >Explore</button> </div>
         </div></div></div>`);
}

function recentPlayed(){
    recentSong[0]=JSON.parse(sessionStorage.getItem("recentsong"));
    sessionStorage.setItem("playlist",JSON.stringify(recentSong));
    window.open("../html/audio.html","_self");
}

function getAllSongs(songs){
    selectedSongs=[];
    let languages=language.split(" ");
   
    for(m=0;m<languages.length;m++)
    {
    
        if(languages[m]=="hindi"){
        languageSongs[m]=songs[0].hindi;
        if(m==0)
            selectedSongs=songs[0].hindi;
            else{
                for(p=0;p<songs[0].hindi.length;p++){
                    selectedSongs.push(songs[0].hindi[p]);
                }
            }
        getalbums(languageSongs[m],"Hindi");
        }

        else if(languages[m]=="marathi"){
            languageSongs[m]=songs[0].marathi;
            if(m==0)
            selectedSongs=songs[0].marathi;
            else{
                for(p=0;p<songs[0].marathi.length;p++){
                    selectedSongs.push(songs[0].marathi[p]);
                }
            }
            getalbums(languageSongs[m],"Marathi");
        }

        else if(languages[m]=="punjabi"){
            languageSongs[m]=songs[0].punjabi;
            if(m==0)
            selectedSongs=songs[0].punjabi;
            else{
                for(p=0;p<songs[0].punjabi.length;p++){
                    selectedSongs.push(songs[0].punjabi[p]);
                }
            }
            getalbums(languageSongs[m],"Punjabi");
        }

        else if(languages[m]=="english"){
            languageSongs[m]=songs[0].english;
            if(m==0)
            selectedSongs=songs[0].english;
            else{
                for(p=0;p<songs[0].english.length;p++){
                    selectedSongs.push(songs[0].english[p]);
                }
            }
            getalbums(languageSongs[m],"English");
        }
        
    }
    getartists(selectedSongs);
    getAlbumCategories(selectedSongs);
}

function getalbums(songs,languagetype){
    albums=[];
    let counter=0;
     albums[0]=songs[0].album;
     for(i=1;i<songs.length;i++)
     {
         counter=0;
        for(y=0;y<albums.length;y++){
             if(songs[i].album!=albums[y])
             {
                 counter++;
             }
        }
        if(counter==albums.length)
        albums.push(songs[i].album);
     }
    
    for(j=0;j<albums.length;j++)
    {
        
        sessionStorage.setItem("playlist",JSON.stringify(songs));
        
         imagename=albums[j].split(" ");
         
         let image=imagename.join("");
         image=image+".jfif";
         var ul=$('div.myalbum');
         ul.append(`<div class="col py-4">
         <div class="card">
            <img src="../images/${image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${albums[j]}</h5>
            <div class="text-center">
            <button type="button" class="btn btn-outline-danger" onclick="addplay('${albums[j]}')" >Explore</button> </div>
         </div></div></div>`);
      }
  
 }

function addplay(album){
    playlist=[];
   
    for(k=0;k<languageSongs.length;k++){
       for(l=0;l<languageSongs[k].length;l++){
           if(album==languageSongs[k][l].album)
           {
               playlist.push(languageSongs[k][l]);
             
           }
       }
    }
    sessionStorage.setItem("playlist",JSON.stringify(playlist));
    window.open("../html/audio.html","_self");
}


function getartists(allsongs){
    artists=[];
   
    for(i=0;i<allsongs.length;i++)
    {
       
        if(Array.isArray(allsongs[i].artist))
        {
            for(j=0;j<allsongs[i].artist.length;j++)
            {
               
                if(artists.length==0)
                {
                  
                    artists.push(allsongs[i].artist[j]);
                }
                else{
                    let counter=0;
                    for(k=0;k<artists.length;k++)
                    {
                        if(allsongs[i].artist[j]!=artists[k])
                        {
                           counter++;
                        }
                    }
                    if(artists.length==counter)
                    artists.push(allsongs[i].artist[j]);
                }
            }
        }
        else{
            
            if(artists.length==0)
                {
                    artists.push(allsongs[i].artist);
                }
                else{
                    counter=0;
                    for(l=0;l<artists.length;l++)
                    {
                        if(allsongs[i].artist!=artists[l])
                        {
                           counter++;
                        }
                    }
                    if(artists.length==counter)
                    artists.push(allsongs[i].artist);
                }
        }
       
    }
    
    for(j=0;j<artists.length;j++){
        
        imagename=artists[j].split(" ");
        
        let image=imagename.join("");
        image=image+".jfif";

        var ul=$('div.artist');
        ul.append(`<div class="col py-4">
        <div class="card">
        <img src="../images/${image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${artists[j]}</h5>
        <div class="text-center">
        <button type="button" class="btn btn-outline-danger" onclick="playArtists('${artists[j]}')" >Explore</button> </div>
        </div></div></div>`);
    }
   
    
}

function playArtists(artistName){
    alert(artistName);
    let playlist=[];

  for(i=0;i<selectedSongs.length;i++)
  {
      if(Array.isArray(selectedSongs[i].artist))
      {
          for(j=0;j<selectedSongs[i].artist.length;j++)
          {
                if(artistName==selectedSongs[i].artist[j])
                {
                    playlist.push(selectedSongs[i]);
                }
          }
      }
      else{
        if(artistName==selectedSongs[i].artist)
        {
            playlist.push(selectedSongs[i]);
        }
      }
  }
   
  
   sessionStorage.setItem("playlist",JSON.stringify(playlist));
   window.open("../html/audio.html","_self");
}

function  getAlbumCategories(allsongs){
    for(i=0;i<allsongs.length;i++)
    {
        if(allsongs[i].categories=="Rock")
        {
            rock.push(allsongs[i]);
        }
        else if(allsongs[i].categories=="Jazz")
        {
            jazz.push(allsongs[i]);
        }
        else if(allsongs[i].categories=="Classical")
        {
            classical.push(allsongs[i]);
        }
    }
   
}

function playCategory(str){
    
    playlist=[];
    if(str=="Rock"){
        playlist=rock;
    }
    else if(str=="Jazz"){
        playlist=jazz;  
    }
    else if(str=="Classical"){
        playlist=classical;  
    }
   
    sessionStorage.setItem("playlist",JSON.stringify(playlist));
    window.open("../html/audio.html","_self");
   
}

function playTrack(song,album)
{
    let playlist=[];

    for(m=0;m<selectedSongs.length;m++)
    {
        if(selectedSongs[m].name==song && selectedSongs[m].album==album)
        {
           playlist[0]=selectedSongs[m];
           break;
        }

    }
    sessionStorage.setItem("playlist",JSON.stringify(playlist));
    location.href="../html/audio.html";


}
