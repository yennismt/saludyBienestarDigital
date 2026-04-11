$(document).ready(function () {
  cargarVistaIndex();
});

function cargarVistaIndex() {
  sectionsJ.forEach((item) => {
    $.get("views/components/section.html", function (data) {
      $("#sections").append(data);
      $("#section").attr("id", item.Name);
      $(`#${item.Name} .section-title`).text(item.Title);
      $(`#${item.Name} .section-description`).append(item.Description);
      $(`#${item.Name} .section-img `).attr("src", item.Image);
      if(item.Frase != undefined){
        $(`#${item.Name} .section-frase`).append(item.Frase);
        $(`#${item.Name} .centralText `).show();
      }  
    });
  });

  cardsJOMO.forEach((item) => {
    $.get("views/components/card.html", function (data) {
      $("#Cards").append(data);
      $("#card").attr("href", item.Link);
      $("#card").attr("id", item.Name);
      $(`#${item.Name} .card-title`).text(item.Title);
      $(`#${item.Name} .card-description`).text(item.Description);
      $(`#${item.Name} .card-image `).attr("src", item.Image);
    });
  });
  
}
