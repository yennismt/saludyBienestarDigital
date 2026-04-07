$(document).ready(function () {
  cargarVistaIndex();
});

$(document).on("click",".module", function () {
    let module = $(this).data("module");
    cargarModulo(module)
});

function cargarVistaIndex() {
  $.get("views/components/nav.html", function (data) {
    $("#nav").append(data);
  });

  $.get("views/components/footer.html", function (data) {
    $("#footer").append(data);
  });

  podcast.forEach((item) => {
    $.get("views/components/card.html", function (data) {
      $("#podcastCard").append(data);
      $("#card").attr("href", item.Link);
      $("#card").attr("id", item.Name);
      $(`#${item.Name} .card-title`).text(item.Title);
      $(`#${item.Name} .card-description`).text(item.Description);
      $(`#${item.Name} .card-image `).attr("src", item.Image);
    });
  });

  sectionsIndex.forEach((item) => {
    $.get("views/components/section.html", function (data) {
      $("#sections").append(data);
      $("#section").attr("id", item.Name);
      $(`#${item.Name} .section-title`).text(item.Title);
      $(`#${item.Name} .section-description`).text(item.Description);
      $(`#${item.Name} .section-img `).attr("src", item.Image);
    });
  });
}

function cargarModulo(id) {

  let ruta = "";
  switch (id) {
    case 1:
        ruta = "views/EntiendeElJuego.html"
      break;
    case 2:
        ruta = "views/ModoMonje.html"
      break;
    case 3:
        ruta = "views/CuidaTuCuerpo.html"
      break;
    case 4:
        ruta = "views/Blindaje.html"
      break;
    case 5:
        ruta = "views/JOMO.html"
      break;
    default:
      break;
  }
  if (ruta != "") {
    $("#dvPrincipal").empty()
    $.get(ruta, function (data) {
    $("#dvPrincipal").append(data);
  });
  }    
  
}
