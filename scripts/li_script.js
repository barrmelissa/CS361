

document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("signButton").addEventListener("click", buttonAdd);
});



function popErr(event){

  alert("ERROR Adding User!");
  event.preventDefault();
  
}

function invEmail(event){

  alert("ERROR invalid user email!");
  event.preventDefault();
}

function invPass(event){

  alert("ERROR password incorrect!");
  event.preventDefault();
}


function buttonAdd(event){

	var req = new XMLHttpRequest();
	var payload = {user_valid: 1, email: null, password: null};

	
  if (document.getElementById("email").value && 
      document.getElementById("pass").value){
       
        
        payload.email = document.getElementById("email").value.trim();
        payload.password = document.getElementById("pass").value.trim();
              
        req.open("POST", "http://flip2.engr.oregonstate.edu:4455/", true);
        req.setRequestHeader("Content-Type", "application/json");

        req.addEventListener("load", function(){
          if (req.status >= 200 && req.status < 400){
            
              var response = JSON.parse(req.responseText);

              if (response["ok"]){
               window.location.href = "http://flip2.engr.oregonstate.edu:4455/user_home?id=" + response["id"];
              } 
              else if (response["ie"]){
                invEmail(event);
              }
              else if (response["ip"]){
                invPass(event);
              } 
          }
          else{
            console.log("Error in network request: " + req.statusText);
          }
        });

        req.send(JSON.stringify(payload));
        event.preventDefault();

      }
        
	}
  


