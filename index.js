function fetch_user_data() {
    // initializing some important constant
    // i am using the refreance of documentation of omniport
  const client_id = "Tm3HosWalwv6u2659Z2NNJVrix9dzlakb24ITtvV";
  const client_secret =
    "FkEK5CHn68xv0sBolyS14oUTJsbHPL0Jsowi8TJU895tPj05gC16cr1pIHF6ycDOPbwYOqCokmda7wX5osYfEGn4zVrcV8563pecjggHE7b1rARQG4jbbuiKEzF6s9zu";

  const authorization_code = window.location.search.split("&")[0].replace("?code=", "");
  console.log(authorization_code);
  const grant_type = "authorization_code";
  const redirect_uri = "http://localhost:8080/";

  const data =
    "client_id=" +
    client_id +
    "&client_secret=" +
    client_secret +
    "&grant_type=" +
    grant_type +
    "&redirect_uri=" +
    redirect_uri +
    "&code=" +
    authorization_code;
  const retrieve_token_uri = "https://channeli.in/open_auth/token/";
  //method-post-of-const-data-to-url-https://channeli.in/open_auth/token/
  const http = new XMLHttpRequest();
  http.open("POST", retrieve_token_uri);
  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  http.send(data);
  //inresponse we get access token which can be retrive from url itself
  var access_token = "";
  //function to get user data
  function get_user_data() {
    const retrieve_data_uri = "https://channeli.in/open_auth/get_user_data/ ";
    // sending get request(contains access token) to server 
    http.open("GET", retrieve_data_uri);
    http.setRequestHeader("Authorization", "Bearer " + access_token);
    http.send();
    // checking weather my request is a succes or not if success then do parse json data
    http.onreadystatechange = () => {
      if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
        console.log(http.responseText);
        parsed_user_data = JSON.parse(http.responseText);
        var profile_data = document.getElementById("data");
        var profile_data_string =
          "Enrolment Number: " + parsed_user_data.username + "<br/>";
        profile_data_string +=
          "Name: " + parsed_user_data.person.fullName + "<br/>";
        profile_data_string +=
          "Current Year: " + parsed_user_data.student.currentYear + "<br/>";
        profile_data_string +=
          "Institute Email: " +
          parsed_user_data.contactInformation.instituteWebmailAddress +
          "<br/>";
        var profile_data = document.getElementById("welcome");
        profile_data.innerHTML = `
                <img class="mydp" src="https://channeli.in${parsed_user_data.person.displayPicture}" alt="your dp">
                Welcome! ${parsed_user_data.person.fullName} <br>
                you are in ${parsed_user_data.student.currentYear}st year<br>
                Now explore your favourite group`;
                // var username1 = parsed_user_data.person.fullName
              //  const user=parsed_user_data.person.fullName
              // expo(username1);
      }
    };
  }

  http.onreadystatechange = () => {
    if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
      console.log(http.responseText);
      access_token = JSON.parse(http.responseText).access_token;
      get_user_data();
    }
  };
}
function test212(){
   console.log('connected')
}
fetch_user_data();
function appendToDom(){
  var comment =document.getElementById('txt_in').value;
 let username="kunal"
  var today = new Date();
var time = today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+ "--"+ + today.getHours() + ":" + today.getMinutes();
 const node = document.createElement('div');
 node.classList.add('txt_con');
 let comm =`<em class="gol"> ${username} </em> </br> <p class="comm">${comment} </p><p class="samay"> time:- ${time}</p>`;
 node.innerHTML = comm;
 document.getElementById("myList").appendChild(node)
 }
  // expo=(username1)=>{
  //   class UserList {
  //     user1= username1
  //   }
  //     }
  //     export function expo(username1){
  //       class userList {
  //         user1= "shree ram"
  //       }
  //       return userList
  //   }
//recycle bin
   // profile_data.innerHTML=profile_data_string
        //             var x = document.createElement("IMG");
        //   x.setAttribute("src", `https://channeli.in${parsed_user_data.person.displayPicture}`);
        //   x.setAttribute("width", "304");
        //   x.setAttribute("height", "228");
        //   x.setAttribute("alt", "The Pulpit Rock");
        //   document.body.appendChild(x);
