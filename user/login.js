let apiURL = 'http://34.67.71.40:7000/login';

let login = document.getElementById("form");
login.addEventListener("submit", submitForm);

function submitForm(event){
    event.preventDefault();

    var data = new FormData();
    data.append("username", document.getElementById("username").value);
    data.append("password", document.getElementById("password").value);

    fetch(apiURL,{
      method: 'POST',
      body: data      
    })
    .then(response => response.json())
    .then(data =>{
      console.log('Success: ', data);

      if(storageAvailable('sessionStorage')){
        window.sessionStorage.setItem("id", `${data.id}`);
        window.sessionStorage.setItem("role", `${data.roleId}`);
      }else{
        //i guess theres no session storage for the user
      }
      //checks the type of the user and redirects to the proper page

      location.assign('employee-home.html');
    })
    .catch((error)=>{
      console.error('Error: ',error);
      login.reset();
    })
    
}
    //needs to add handling for when password is incorrect

    function storageAvailable(type) {
      var storage;
      try {
          storage = window[type];
          var x = '__storage_test__';
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
      }
      catch(e) {
          return e instanceof DOMException && (
              // everything except Firefox
              e.code === 22 ||
              // Firefox
              e.code === 1014 ||
              // test name field too, because code might not be present
              // everything except Firefox
              e.name === 'QuotaExceededError' ||
              // Firefox
              e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
              // acknowledge QuotaExceededError only if there's something already stored
              (storage && storage.length !== 0);
      }
  }
  