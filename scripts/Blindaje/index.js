$(document).ready(function () {
  cargarVistaIndex();
});

function cargarVistaIndex() {
  sectionsB.forEach((item) => {
    $.get("views/components/section.html", function (data) {
      $("#sections").append(data);
      $("#section").attr("id", item.Name);
      $(`#${item.Name} .section-title`).text(item.Title);
      $(`#${item.Name} .section-description`).append(item.Description);
      $(`#${item.Name} .section-img `).attr("src", item.Image);
      $(`#${item.Name} .section-frase`).append(item.Frase);
      $(`#${item.Name} .centralText `).show();
    });
  });

}
