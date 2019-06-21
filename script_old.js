

$(function () {
    var theTemplateScript = $("#example-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    var context = {
        "city": "London",
        "street": "Baker Street",
        "number": "221B"
      };
      $.get('/mvc_slim/public/calldata/mvc_menu',function (data){
        var data_return = JSON.parse(data);
            context.people = data_return
            // $.each($.parseJSON(data) , function(index,object){
            //     console.log(object);
            //         context.people = object
            // })
        console.log(context);
        var theCompiledHtml = theTemplate(context);
        $(document.body).append(theCompiledHtml);
      });

    // // Grab the template script
    // var theTemplateScript = $("#example-template").html();
    // // Compile the template
    // var theTemplate = Handlebars.compile(theTemplateScript);
    // $(document).ready(function () {
    //     $.ajax({
    //         type: "get",
    //         url: "/mvc_slim/public/calldata/mvc_menu",
    //         success: function (data) {
    //             var data_return = JSON.parse(data);
    //             context = {people: data_return}
    //             console.log(context);
    //             var theCompiledHtml = theTemplate(context);
    //             $(document.body).append(theCompiledHtml);
    //         }
    //         });
    //     });
  });

  