



function check_login() {
  // ฟังก์ชันของการ login มี 3 ตัวคือ check_login  , gen_token_recap , sent_check_login_to_api เรียงตามลำดับนี้
    gen_token_recap();
}
function gen_token_recap(){
  //สร้าง token ของ recap 
      grecaptcha.ready(function() {
      grecaptcha.execute('6LcDTKoUAAAAAARTjiGhrp8zrhIVWNDyqYy_ahVE', {action: 'login'}).then(function(token) {
          // ค่า token ที่ถูกส่งกลับมา จะถูกนำไปใช้ส่งไปตรวจสอบกับ api อีกครั้ง
          // เราเอาค่า token ไปไว้ใน input hidden ชื่อg-recaptcha-response
            document.getElementById('g-recaptcha-response').value = token;
          sent_check_login_to_api();
      });
    });
}
function sent_check_login_to_api(){
  // ส่ง ข้อมูลไปเช็คที่ api ของการ login โดยจะส่งไป 3 ค่า คือ username pasword และ รหัส token ของรหัสการ recaptcha
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var g_recaptcha_response = document.getElementById("g-recaptcha-response").value;

  $.ajax({
      type: "POST",
      url: "/mvc_slim/public/check_login_client",
      data: { username: username, password: password,g_recaptcha_response: g_recaptcha_response,},
      success: function(html){
      var Obj = JSON.parse(html);
      //console.log(Obj);
          var json_data = Array;
          if(Obj.status_login == false){
            if(Obj.response.score  <= 0.5){
              alert('your Robot');
            }else{
              alert('UserName OR Password Not Correct');
            }
            
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

  function clear_cookie_all(){
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
       
    }
  }

$( document ).ready(function() {
  if(getCookie('json_data') == "''" || getCookie('json_data') == '' ){
    document.cookie = "json_data='set'";
    window.location.href = "login.html";
  }else{
    // console.log(document.cookie);
  }
});

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
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

    // main_call_data_jwt(data_json);
    // show_profile_detail(data_json);

    // var data_json_profile = parseJwt(document.cookie);

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
      
   main_call_data_jwt(data_json);

    show_profile_detail(data_json);

    function main_call_data_jwt(data_json){
        // console.log(data_json);
        $(".profile_call_token").empty();
        var theTemplateScript = $("#profile_call_token_sc").html(); /// อ้างอิงว่าจะชี้ไปที่ script ตัวไหนในหน้า html
        var theTemplate = Handlebars.compile(theTemplateScript); 
        var theCompiledHtml = theTemplate(data_json);
        $('.profile_call_token').append(theCompiledHtml);  // อ้างอิงว่าจะสร้าง append ที่ใด id หรือ class ชื่ออะไร
        
      }

    function menu_callbacks(data){
      // console.log(data);
      $(".menu_callbacks").empty();
      var theTemplateScript = $("#example-template").html(); /// อ้างอิงว่าจะชี้ไปที่ script ตัวไหนในหน้า html
      var theTemplate = Handlebars.compile(theTemplateScript); 
      var theCompiledHtml = theTemplate(data);
      $('.menu_callbacks').append(theCompiledHtml);  // อ้างอิงว่าจะสร้าง append ที่ใด id หรือ class ชื่ออะไร
    }
    
    function content_callbacks(data){
      $(".content_callbacks").empty();
      // console.log(data);
      var theTemplateScript = $("#content_tem").html(); /// อ้างอิงว่าจะชี้ไปที่ script ตัวไหนในหน้า html
      var theTemplate = Handlebars.compile(theTemplateScript); 
      var theCompiledHtml = theTemplate(data);
      $('.content_callbacks').append(theCompiledHtml);  // อ้างอิงว่าจะสร้าง append ที่ใด id หรือ class ชื่ออะไร
    }

    function content_callbacks_full(data){
      // console.log(data);
      $(".model_show_detail").empty();
      var theTemplateScript = $("#content_tem_full").html(); /// อ้างอิงว่าจะชี้ไปที่ script ตัวไหนในหน้า html
      var theTemplate = Handlebars.compile(theTemplateScript); 
      var theCompiledHtml = theTemplate(data);
      $('.model_show_detail').append(theCompiledHtml);  // อ้างอิงว่าจะสร้าง append ที่ใด id หรือ class ชื่ออะไร
    }  

    function show_profile_detail(data_json){
      $(".show_profile_detail").empty();
      var theTemplateScript_profile = $("#profie_detail_usejwt").html(); /// อ้างอิงว่าจะชี้ไปที่ script ตัวไหนในหน้า html
      var theTemplate_profile = Handlebars.compile(theTemplateScript_profile); 
      var theCompiledHtml_profile = theTemplate_profile(data_json);
      $('.show_profile_detail').append(theCompiledHtml_profile);  // อ้างอิงว่าจะสร้าง append ที่ใด id หรือ class ชื่ออะไร
    }
    
  });

  