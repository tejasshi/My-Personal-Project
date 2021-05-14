$(document).ready(function(){
    $('.multi_select').selectpicker();

    let $selects=[];
   
    
    $("#btn").click(function(){
        var str="",i;
        for(i=0;i<myform.language.options.length;i++)
        {
            if(myform.language.options[i].selected)
            {
                str=str+myform.language.options[i].value+" ";
            }
        }
        sessionStorage.setItem("language",str);
        window.open("../html/MusicLibrary.html","_self");
    });
    
});