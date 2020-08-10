/*
OBS!
Client ID, Secret and redirect URI are added to localStorage... not the safest way!

I am using the redirect uri:
http://localhost:3000/

and hosting using a small NODE express webserver
*/

window.onload = () => {
  //Get the "code"
  document.getElementById("authbutton").onclick = () => {
    //store the constiables
    const client_id = document.getElementById('clientid').value;
    const clientsecret = document.getElementById('clientsecret').value;
    const redirect_uri = document.getElementById('redirecturi').value;
    //localstorage
    localStorage.setItem("CID", client_id);
    localStorage.setItem("CS", clientsecret);
    localStorage.setItem("RURI", redirect_uri);
    //get the code 
    const authEnd = "https://identity.vismaonline.com/connect/authorize?";
    location.href = 
    authEnd +
    "client_id=" + client_id +
    "&redirect_uri=" + redirect_uri +
    "&state=abcde12345" +
    "&nonce=abcde12345" +
    "&scope=ea:api%20offline_access%20ea:sales" +
    "&response_type=code";
  }

  //"code" from URL fragment
  codef = () => {
    const qryString = window.location.search;
    const urlParam = new URLSearchParams(qryString);
    const code = urlParam.get('code');
    document.getElementById('Tcode').value = code;
  }
  codef();
  
  //Get the token
  tokenf = () => {
    const http0 = new XMLHttpRequest();
    const CORSserver = "https://cors-anywhere.herokuapp.com/";
    const tokenEnd = "https://identity.vismaonline.com/connect/token";
    const url = CORSserver + tokenEnd;
    http0.open("POST", url, true);
    http0.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http0.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("CID") + ':' + localStorage.getItem("CS")));
    
    const data = "grant_type=authorization_code&code=" + document.getElementById('Tcode').value + "&redirect_uri=" + localStorage.getItem("RURI");
    http0.send(data);
  
    http0.onload = () => {
      const content = http0.response;
      const json = JSON.parse(content);
      document.getElementById("token").value = json["access_token"];
      document.getElementById("rtoken").value = json["refresh_token"];      
    }
  }
  if (document.getElementById('Tcode').value.length >=1) {
    tokenf();
  }
  //cool stuff to add
  //timer for token
  //automatic re-authentication
  //
  //
}