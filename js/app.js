$(document).ready(function(){
  var game = "stopped";
  var btn = "check";
  var score = 0;
  var howManyVerbs = 10;
  $("#how-many-verbs").val(howManyVerbs);

  $("#button-plus").click(function(){
    if (howManyVerbs < 100) {
      howManyVerbs += 10;
      $("#how-many-verbs").val(howManyVerbs);
    }
  })
  $("#button-minus").click(function(){
    if (howManyVerbs > 0) {
      howManyVerbs -= 10;
      $("#how-many-verbs").val(howManyVerbs);
    }
  })

  $("#start").click(function(e){
    e.preventDefault();
    $(".container-fluid").addClass("started");
    $(".container-fluid").removeClass("stopped");
    if (game == "stopped") {
      $(this).html('Arreter');
      $(this).removeClass('btn-primary').addClass('btn-danger');
      game = "started";
      var randomVerbIndex = getRandomInt(irregulars.length);
      var leftVerbs = howManyVerbs;

      newVerb(randomVerbIndex, score);
      $(".header h3").text(howManyVerbs+" verbs challenge");
      $("div.button").append(`
        <button type="button" id="check" class="btn btn-primary" name="button">Valider</button>
      `)
      $("div.score").append(`
        <p class="text-center">rate on /20: <span class="score">${score}</span></p>
      `)

      $(".over-footer").addClass("d-none");
      $(".over-footer-title").addClass("d-none");


      $("#check").click(function(e){
        e.preventDefault();
        if (btn == "check") {
          var temp = checkAnswer(randomVerbIndex, score, leftVerbs);
          score = temp[0];
          leftVerbs = temp[1];
        } else {
          randomVerbIndex = getRandomInt(irregulars.length);
          newVerb(randomVerbIndex, score);
        }
      });

      $(window).keypress(function(e) {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
          e.preventDefault();
          if (btn == "check") {
            var temp = checkAnswer(randomVerbIndex, score, leftVerbs);
            score = temp[0];
            leftVerbs = temp[1];
          } else {
            randomVerbIndex = getRandomInt(irregulars.length);
            newVerb(randomVerbIndex, score);
          }
        }
      });

    } else {
      $(".container-fluid").removeClass("started");
      $(".container-fluid").addClass("stopped");
      $(this).html('Démarrer');
      $(this).removeClass('btn-danger').removeClass('btn-success').addClass('btn-primary');
      game = "stopped";
      howManyVerbs = 10;
      $(".header h3").text("");
      $("div.title").html("");
      $("div.infinitif").html("");
      $("div.preterit").html("");
      $("div.p-passe").html("");
      $("div.button").html("");
      $("div.score").html("");

      $(".over-footer").removeClass("d-none");
      $(".over-footer-title").removeClass("d-none");
      $("#how-many-verbs").val(howManyVerbs);
    }
  })

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function newVerb(randomVerbIndex, score) {
    $("div.infinitif").show();
    $("div.preterit").show();
    $("div.p-passe").show();
    $("div.title").html(`
      <h2 class = "text-center">${irregulars[randomVerbIndex][3]}</h2>
    `)
    $("div.infinitif").html(`
      <input type="text" class="border form-control mb-2" name="Infinitif" value="${irregulars[randomVerbIndex][0]}">
    `)
    $("div.preterit").html(`
      <input type="text" class="border form-control mb-2 preterit" name="Prétérit" placeholder="Prétérit" value="">
    `)
    $("input.preterit").focus();
    $("div.p-passe").html(`
      <input type="text" class="border form-control mb-2 p-passe" name="Participe Passé" placeholder="Participe Passé" value="">
    `)
    $("span.score").text(score);
    $("#check").html("Valider");
    btn = "check";
  }

  function checkAnswer(randomVerbIndex, score, leftVerbs) {
    leftVerbs--;
    if (leftVerbs > 0) {
      $(".header h3").text(howManyVerbs+" verbs challenge ("+ leftVerbs +" left)");
      $("input.preterit").blur();
      if ($("input.preterit").val() == irregulars[randomVerbIndex][1]) {
        $("input.preterit").addClass("border border-success");
        score += 1;
      } else {
        $("input.preterit").addClass("border border-danger");
      }

      if ($("input.p-passe").val() == irregulars[randomVerbIndex][2]) {
        $("input.p-passe").addClass("border-success");
        score += 1;
      } else {
        $("input.p-passe").addClass("border-danger");
      }

      $("input.preterit").val(irregulars[randomVerbIndex][1]);
      $("input.p-passe").val(irregulars[randomVerbIndex][2]);

      $("span.score").html(score);
      $("#check").html("Recommencer");
      btn = "retry";
      return [score, leftVerbs];
    } else {
      var percent = score / howManyVerbs * 50;
      $(".header h3").text(howManyVerbs+" verbs challenge");
      $("div.title").html(`
        <h2 class = "text-center">Score: ${percent}%</h2>
      `)
      $("div.infinitif").hide();
      $("div.preterit").hide();
      $("div.p-passe").hide();
      $("#check").hide();
      $("#start").removeClass('btn-danger').addClass('btn-success').html('Recommencer');
      return [score, leftVerbs];
    }
  }
})
