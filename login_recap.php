
<!DOCTYPE html>
<html>
  <head>
      <meta charset="UTF-8">
      <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
      <title> Slim use mvc </title>
      <!-- Favicon-->
      <script src="https://www.google.com/recaptcha/api.js?render=6LcDTKoUAAAAAEkiizw3FRgewiZ4s5iPn0hlSsXD
      "></script>

  </head>

<body>
    <?php

  
    
    ?>
        <form id="sign_in"  method="post" action="?" >
                <div class="msg"></div>
                <div class="input-group">
                    <span class="input-group-addon">
                        <i class="material-icons">person</i>
                    </span>
                    <div class="form-line">
                        <input type="text" class="form-control" id="username" name="username" placeholder="Username" required autofocus>
                    </div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">
                        <i class="material-icons">lock</i>
                    </span>
                    <div class="form-line">
                        <input type="password" class="form-control" id="password"  name="password" placeholder="Password" required>
                    </div>
                </div>
                <div class="row">

                    <div class="col-xs-12">
                        <button class="btn btn-block bg-pink waves-effect" type="submit" >SIGN IN</button>
                    </div>
                </div>
                <div class="row m-t-15 m-b--20">
                    <div class="col-xs-6">
                    </div>
                    <div class="col-xs-6 align-right">
                    </div>
                </div>
            </form>
        <script src="https://www.google.com/recaptcha/api.js?render=6LcDTKoUAAAAAARTjiGhrp8zrhIVWNDyqYy_ahVE"></script>
        <script>
            grecaptcha.ready(function() {
                grecaptcha.execute('6LcDTKoUAAAAAEkiizw3FRgewiZ4s5iPn0hlSsXD', {action: 'homepage'}).then(function(token) {
                   
                });
            });
            </script>
    </body>

    </html>

