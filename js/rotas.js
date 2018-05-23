

function minhasrotas() {

  firebase.database().ref("estudante")
  .on("value", function(estudante){

    var html = "";

    estudante.forEach(function(estudante){

      html += '<tr>'+             
                '<td>'+estudante.val().nomeest+'</td>'+
                '<td>'+estudante.val().endereco+'</td>'+
                '<td>'+estudante.val().escola+'</td>'+
                '<td><a href="listarresponsavel.html" class="btn btn-default">Ir <span class="glyphicon glyphicon-search"></span></a></td>'+
                '<td> <input type="checkbox" class="form-check-input" id="exampleCheck1"> <label class="form-check-label" for="exampleCheck1">Faltou</label></td>'+
              '</tr>';

    });

    $("#conteudoTabelaEstudantesRotas").html(html);

  });}
