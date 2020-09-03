

document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("registerButton").addEventListener("click", buttonAdd);
});




function buttonAdd(event){

	var req = new XMLHttpRequest();
	var payload = {user_insert: 1, student: null, teacher: null, fname: null, lname: null, 
                 password: null, dob: null, email: null, bio: null, edu: null};

	
  if (document.getElementById("first_name").value && 
      document.getElementById("last_name").value &&
      document.getElementById("dob").value &&
      document.getElementById("pass").value &&
      document.getElementById("pass2").value &&
      document.getElementById("email").value &&
      (document.getElementById("student").checked || document.getElementById("teacher").checked)){

		  if (document.getElementById("pass").value.trim() !== document.getElementById("pass2").value.trim()){
          alert("ERROR passwords don't match!");
          event.preventDefault();
      }
      else{

        if (document.getElementById("student").checked){
          payload.student = 1;
        }
        else{
          payload.student = 0;
         
        }

        if (document.getElementById("teacher").checked){
          payload.teacher = 1;
        }
        else{
          payload.teacher = 0;
         
        }
       
        payload.fname = document.getElementById("first_name").value.trim();
        payload.lname = document.getElementById("last_name").value.trim();
        payload.email = document.getElementById("email").value.trim();
        payload.password = document.getElementById("pass").value.trim();
        payload.dob = document.getElementById("dob").value;
        payload.bio = document.getElementById("bio").value;
        payload.edu = document.getElementById("highest_education").value;
              
        req.open("POST", "http://flip2.engr.oregonstate.edu:4455/", true);
        req.setRequestHeader("Content-Type", "application/json");

        req.addEventListener("load", function(){
          if (req.status >= 200 && req.status < 400){
            
              var response = JSON.parse(req.responseText);

              if (response["ok"]){
                alert("User Added!");
                window.location.href = "http://flip2.engr.oregonstate.edu:4455/user_home?id=" + response["id"];
              } 
              else if (response["dup"]){
                alert("ERROR user email already used!");
                event.preventDefault();
              }
              else{
                alert("ERROR Adding User!");
                event.preventDefault();
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
  else{
     alert("ERROR: Required Info Missing!");
     event.preventDefault();
  }
  
}

