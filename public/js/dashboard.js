let x
$(document).ready(function(){
    x=document.getElementsByClassName('title').innerText
    console.log(x);
    a();
  
      
});


  
function a(){
    console.log("a called")
    $.get("/getnews", function(data,status){ 
            data=$.parseJSON(data);
            console.log(data);
            if(data.news.length==0){
                          $(".news_container").empty();  
                          $(".news_container").append("No data");
                      }
                      else{
                     
                          data.news.forEach((article,index)=>{
                           // console.log(val.appreciationcontent);
                           
                              $(".news_container").append("<h3 class='title'>"+article.title+"</h3>"+"<p class='desc'>"+article.description+"</p>"+"<span class=' published'>"+article.publishedAt,article.author+"</span>/"+
                              "<button class=\"btndel btn-secondary\"onclick=\"Edit(\'"+article._id+"\')\">Edit</button><hr/>");
                          
                      });
                      
                    }
    });
}

function Edit(_id) {
    $(".container").hide();
    $("#edittask").show();
    var NewsId = { "id" : _id };
    
    console.log("id is", NewsId);
    

          $.ajax({
            type:'PUT',
            url: '/edittask',
            data: NewsId
        }).done(function(response){
            console.log(response);
            $("#editheadline").attr("value",response.title);
        }).fail(function(response){
            console.log("Oops not working");
        });

        }
