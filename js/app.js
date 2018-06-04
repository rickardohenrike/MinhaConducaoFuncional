
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDdh1mvOsKN881Ziwz7Cyzbr0v7xUtx1B8",
    authDomain: "minha-conducao-oficial.firebaseapp.com",
    databaseURL: "https://minha-conducao-oficial.firebaseio.com",
    projectId: "minha-conducao-oficial",
    storageBucket: "minha-conducao-oficial.appspot.com",
    messagingSenderId: "463274889663"
  };
  firebase.initializeApp(config);




function cadastre_se() {

  var email = $("#email").val();
  var senha = $("#senha").val();

  if (email == "" && senha == "") {
  	alert("Preeencha os campos corretamente!");
  	return false;
  }

  firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(function(user){

      alert('Usuário criado com sucesso!');
      $('#formLogin').trigger('reset');

    })
    .catch(function(error){

      alert('Erro ao criar usuário. Tente com outro E-Mail e use senha com 6 dígitos!');
      console.log("Erro: " + error.message)

    });

}

function logar() {

	var email = $("#email").val();
	var senha = $("#senha").val();

	firebase.auth().signInWithEmailAndPassword(email, senha)
	.then(function(user){

		localStorage.setItem("user_id", user.uid);
      	localStorage.setItem("user_email", user.email);

	  	location.href = "inicio.html";

	})
	.catch(function(error){

	  alert('Usuário ou Senha Inválido!');
	  console.log("Erro: " + error.message)

	});

}

function logarComGoogle() {

	var provedor =  new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provedor)
    .then(function(result){

      localStorage.setItem("user_id", result.user.uid);
      localStorage.setItem("user_email", result.user.email);

      location.href = "listarestudantes.html";

    })
    .catch(function(error){

      console.log(error.message);
      alert("Erro na Autenticação com o Google");

    });

}
function logarComGoogleResponsavel() {

	var provedo =  new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provedo)
    .then(function(result){

      localStorage.setItem("user_id", result.user.uid);
      localStorage.setItem("user_email", result.user.email);

      location.href = "localizacao.html";

    })
    .catch(function(error){

      console.log(error.message);
      alert("Erro na Autenticação com o Google");

    });

}

function logoff() {

  // console.log('teste');
  firebase.auth().signOut();

  localStorage.removeItem("user_id");
  localStorage.removeItem("user_email");

  location.href = "index.html";

}

function logoffresp() {

  firebase.auth().signOut();

  localStorage.removeItem("user_id");
  localStorage.removeItem("user_email");

  location.href = "indexresponsavel.html";

}

/*
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    alert('logado');
  } else {
    alert('nao logado');
  }
});
*/



var x, y;
var pos;

function error(erro){
  console.log('Erro!');
  console.log(erro);
};
function map(){
  var ref = firebase.database().ref('rota/localizacao');
  ref.on
  var localizacao;
  ref.on("value", function(data){
    x = data.child("x").val();
    y = data.child("y").val();
    console.log(x,y);
  }, error);

pos = google.maps.LatLng(x, y);
console.log(pos);

// function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(x, y),
    zoom: 14
  });
  var infoWindow = new google.maps.InfoWindow({map: map});
  infoWindow.setPosition(pos);
      infoWindow.setContent('A van está aqui aqui!');
      map.setCenter(pos);
}
