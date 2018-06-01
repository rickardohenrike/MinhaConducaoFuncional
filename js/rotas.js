function minhasrotas() {

  firebase.database().ref("rota").orderByChild('cod_estudante')
    .on("value", function (estudante) {

      var html = "";


      var html_estudante = "";
      estudante.forEach(function (retorno) {


        firebase.database().ref('estudante/' + retorno.val().cod_estudante)
          .on("value", function (estudante) {


            html_estudante +=
              '<tr>' +
                '<td>' + estudante.val().nomeest + '</td>' +
                '<td>' + estudante.val().endereco + '</td>' +
                '<td>' + estudante.val().escola + '</td>' +
                '<td><a href="listarresponsavel.html" class="btn btn-default">Ir <span class="glyphicon glyphicon-search"></span></a></td>' +
                '<td> <input type="checkbox" class="form-check-input" id="exampleCheck1"> <label class="form-check-label" for="exampleCheck1">Faltou</label></td>' +
              '</tr>';

            $('#conteudoTabelaEstudantesRotas').html(html_estudante);

          });

      });

    });

};

function setLocation(x, y) {

}
