$(document).ready(function () {
  cargarVistaIndex();
});

function cargarVistaIndex() {
  sectionsMM.forEach((item) => {
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

 tecnicas.forEach((item) => {
    $.get("views/components/card.html", function (data) {
      $("#Cards").append(data);
      $('#card').removeAttr('href');
      $('#card').attr('id', item.Name);
      $(`#${item.Name} .card-title`).text(item.Title);
      $(`#${item.Name} .card-description`).append(item.Description);
      $(`#${item.Name} .card-image `).attr('src', item.Image)
      
    });
  });

  //  $.get("views/components/slider.html", function (data) {
  //   $("#slider").append(data);
  // });
}


started = false;

function startCounter() {
    let time = 47;
    const count = document.getElementById("count");

    const interval = setInterval(() => {
        time--;
        count.textContent = time;

        // animación
        count.classList.add("animate");
        setTimeout(() => count.classList.remove("animate"), 150);

        if (time <= 0) {
            clearInterval(interval);
            count.textContent = "0";
        }
    }, 1000);
}

// detectar cuando aparece en pantalla
observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
            started = true;
            startCounter();
        }
    });
}, { threshold: 0.6 });

observer.observe(document.getElementById("counter"));