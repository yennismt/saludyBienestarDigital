$(document).ready(function () {
  cargarVistaIndex();
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
      $('#card').attr('href', item.Link);
      $('#card').attr('id', item.Name);
      $(`#${item.Name} .card-title`).text(item.Title);
      $(`#${item.Name} .card-description`).text(item.Description);
      $(`#${item.Name} .card-image `).attr('src', item.Image)
    });
  });


   sectionsIndex.forEach((item) => {
    $.get("views/components/section.html", function (data) {
      $("#sections").append(data);
      $('#section').attr('id', item.Name);
      $(`#${item.Name} .section-title`).text(item.Title);
      $(`#${item.Name} .section-description`).text(item.Description);
      $(`#${item.Name} .section-img `).attr('src', item.Image)
    });
  });
}
