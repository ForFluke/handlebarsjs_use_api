
function check_login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  $.ajax({
      type: "POST",
      url: "/mvc_slim/public/check_login_client",
      data: { username: username, password: password},
      success: function(html){
          var Obj = JSON.parse(html);
          var json_data = Array;
          if(Obj.status_login == false){
              alert('UserName OR Password Not Correct');
              window.location.href = "?"
          }else{
              json_data = Obj.token;
              document.cookie = "json_data="+json_data;
              // console.log(document.cookie);
              window.location.href = "index.html";
          }
        
      }
  });
}

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

$(function () {
    var data_json = parseJwt(document.cookie);

    main_call_data_jwt(data_json);
    // show_profile_detail(data_json);
    
    var context = {
        "city": "London",
        "street": "Baker Street",
        "number": "221B"
      };

      $.get('/mvc_slim/public/calldata/mvc_menu',function (data){
        var data_return = JSON.parse(data);
            context.people = data_return;
            menu_callbacks(context);
      });
      
      $.get('/mvc_slim/public/calldata/mvc_content',function (data){
        var data_return = JSON.parse(data);
            context.content = data_return;
            content_callbacks(context);
            content_callbacks_full(context);
      });

    function main_call_data_jwt(data_json){
        console.log(data_json);
        var theTemplateScript = $("#profile_call_token_sc").html(); /// อ้างอิงว่าจะชี้ไปที่ script ตัวไหนในหน้า html
        var theTemplate = Handlebars.compile(theTemplateScript); 
        var theCompiledHtml = theTemplate(data_json);
        $('.profile_call_token').append(theCompiledHtml);  // อ้างอิงว่าจะสร้าง append ที่ใด id หรือ class ชื่ออะไร
      }

    function menu_callbacks(data){
      // console.log(data);
      var theTemplateScript = $("#example-template").html(); /// อ้างอิงว่าจะชี้ไปที่ script ตัวไหนในหน้า html
      var theTemplate = Handlebars.compile(theTemplateScript); 
      var theCompiledHtml = theTemplate(data);
      $('.menu_callbacks').append(theCompiledHtml);  // อ้างอิงว่าจะสร้าง append ที่ใด id หรือ class ชื่ออะไร
    }
    
    function content_callbacks(data){
      // console.log(data);
      var theTemplateScript = $("#content_tem").html(); /// อ้างอิงว่าจะชี้ไปที่ script ตัวไหนในหน้า html
      var theTemplate = Handlebars.compile(theTemplateScript); 
      var theCompiledHtml = theTemplate(data);
      $('.content_callbacks').append(theCompiledHtml);  // อ้างอิงว่าจะสร้าง append ที่ใด id หรือ class ชื่ออะไร
    }

    function content_callbacks_full(data){
      // console.log(data);
      var theTemplateScript = $("#content_tem_full").html(); /// อ้างอิงว่าจะชี้ไปที่ script ตัวไหนในหน้า html
      var theTemplate = Handlebars.compile(theTemplateScript); 
      var theCompiledHtml = theTemplate(data);
      $('.model_show_detail').append(theCompiledHtml);  // อ้างอิงว่าจะสร้าง append ที่ใด id หรือ class ชื่ออะไร
    }  

    function show_profile_detail(data_json){
      // console.log(data);
      var theTemplateScript = $("#profie_detail_usejwt").html(); /// อ้างอิงว่าจะชี้ไปที่ script ตัวไหนในหน้า html
      var theTemplate = Handlebars.compile(theTemplateScript); 
      var theCompiledHtml = theTemplate(data_json);
      $('.show_profile_detail').append(theCompiledHtml);  // อ้างอิงว่าจะสร้าง append ที่ใด id หรือ class ชื่ออะไร
    }
    
  });

  