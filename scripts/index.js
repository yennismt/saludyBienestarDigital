const colors = ["#CADCF6", "#95c1ff", "#2B3357", "#E5CDFE"];

$(document).ready(function () {
  cargarVistaIndex();
});

$(document).on("click", ".module", function () {
  let module = $(this).data("module");
  cargarModulo(module);
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
      ruta = "views/EntiendeElJuego.html";
      break;
    case 2:
      ruta = "views/ModoMonje.html";
      break;
    case 3:
      ruta = "views/CuidaTuCuerpo.html";
      break;
    case 4:
      ruta = "views/Blindaje.html";
      break;
    case 5:
      ruta = "views/JOMO.html";
      break;
    default:
      break;
  }
  if (ruta != "") {
    $("#dvPrincipal").empty();
    $.get(ruta, function (data) {
      $("#dvPrincipal").append(data);

      $(".section").each(function () {
        if (colors.length === 0) return;

        const index = Math.floor(Math.random() * colors.length);
        const randomColor = colors.splice(index, 1)[0];

        $(this).css("background-color", randomColor);
      });
    });
  }
}

/* ── LANGUAGE ── */
let currentLang = "es";

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.getElementById("btn-es").classList.toggle("active", lang === "es");
  document.getElementById("btn-en").classList.toggle("active", lang === "en");

  document.querySelectorAll("[data-lang-es]").forEach((el) => {
    const text = el.getAttribute("data-lang-" + lang);
    if (text) el.innerHTML = text;
  });

  // re-render quiz in new lang
  currentQ = 0;
  answered = false;
  renderQuiz();
}

/* ── NAVBAR SCROLL ── */
window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 40);
  document
    .getElementById("scrollTop")
    .classList.toggle("visible", window.scrollY > 300);

  // Active module tab
  const mods = ["mod1", "mod2", "mod3", "mod4", "mod5"];
  let active = 0;
  mods.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) active = i;
  });
  document
    .querySelectorAll(".module-tab")
    .forEach((t, i) => t.classList.toggle("active", i === active));
});

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── MOBILE MENU ── */
function toggleMobileMenu() {
  const links = document.querySelector(".nav-links");
  if (links.style.display === "flex") {
    links.style.display = "";
  } else {
    links.style.cssText =
      "display:flex;flex-direction:column;position:absolute;top:70px;left:0;right:0;background:#fff;padding:20px;box-shadow:0 8px 24px rgba(0,0,0,.1);z-index:999;border-top:1px solid #eee";
  }
}

/* ── CAROUSEL ── */
const carouselState = {};

function getCarState(id) {
  if (!carouselState[id])
    carouselState[id] = {
      current: 0,
      total: document.getElementById(id).children.length,
    };
  return carouselState[id];
}

function updateCarousel(id) {
  const state = getCarState(id);
  const track = document.getElementById(id);
  track.style.transform = `translateX(-${state.current * 100}%)`;
  const dots = document.querySelectorAll(`#${id}-dots .car-dot`);
  dots.forEach((d, i) => d.classList.toggle("active", i === state.current));
}

function moveCarousel(id, dir) {
  const state = getCarState(id);
  state.current = (state.current + dir + state.total) % state.total;
  updateCarousel(id);
}

function goToSlide(id, idx) {
  const state = getCarState(id);
  state.current = idx;
  updateCarousel(id);
}

/* ── CHECKLIST ── */
function toggleCheck(item) {
  item.classList.toggle("checked");
}

/* ── ACCORDION ── */
function toggleAccordion(header) {
  const item = header.parentElement;
  const wasOpen = item.classList.contains("open");
  document
    .querySelectorAll(".acc-item")
    .forEach((i) => i.classList.remove("open"));
  if (!wasOpen) item.classList.add("open");
}

/* ── VIDEO PLACEHOLDER ── */
function showVideoMsg(element) {
  const url = element.getAttribute("data-video");

  element.innerHTML = `
   <iframe width="450" height="220" src="https://www.youtube.com/embed/nDJ1hrso46w?autoplay=1" title="¿Qué es bienestar digital?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `;
  element.onclick = null;
}

/* ══════════════════════════════════════════════════
   QUIZ
══════════════════════════════════════════════════ */
const questions = [
  {
    es: {
      q: "¿Cuántas horas en promedio usa pantalla diariamente un universitario?",
      opts: ["2 horas", "4 horas", "Más de 6 horas", "1 hora"],
      correct: 2,
      fb: "Los estudios muestran que los universitarios usan pantallas más de 6 horas al día en promedio, incluyendo estudio y entretenimiento.",
    },
    en: {
      q: "How many hours does a university student use screens daily on average?",
      opts: ["2 hours", "4 hours", "More than 6 hours", "1 hour"],
      correct: 2,
      fb: "Studies show university students use screens more than 6 hours daily on average, including studying and entertainment.",
    },
  },
  {
    es: {
      q: "¿Qué es la regla 20-20-20 para el cuidado visual?",
      opts: [
        "20 min de pantalla, 20 de descanso, 20 repeticiones",
        "Cada 20 min, mirar a 20 pies por 20 segundos",
        "Tamaño de fuente 20, brillo 20%, 20 min al día",
        "Parpadear 20 veces cada 20 minutos",
      ],
      correct: 1,
      fb: "La regla 20-20-20, recomendada por la Academia Americana de Oftalmología, dice: cada 20 minutos, mira algo a 20 pies (6m) de distancia por 20 segundos.",
    },
    en: {
      q: "What is the 20-20-20 rule for eye care?",
      opts: [
        "20 min screen, 20 rest, 20 reps",
        "Every 20 min, look at 20 feet away for 20 seconds",
        "Font size 20, brightness 20%, 20 min/day",
        "Blink 20 times every 20 minutes",
      ],
      correct: 1,
      fb: "The 20-20-20 rule, recommended by the American Academy of Ophthalmology: every 20 minutes, look at something 20 feet away for 20 seconds.",
    },
  },
  {
    es: {
      q: "¿Qué porcentaje de ciberataques comienza con un email de phishing?",
      opts: ["45%", "67%", "91%", "30%"],
      correct: 2,
      fb: "Según el Verizon Data Breach Investigations Report 2023, el 91% de los ciberataques inicia con un email de phishing. Es la amenaza más común.",
    },
    en: {
      q: "What percentage of cyberattacks start with a phishing email?",
      opts: ["45%", "67%", "91%", "30%"],
      correct: 2,
      fb: "According to Verizon DBIR 2023, 91% of cyberattacks start with a phishing email. It is the most common threat.",
    },
  },
  {
    es: {
      q: "¿Cuánto tarda el cerebro en recuperarse de una interrupción digital?",
      opts: ["5 minutos", "10 minutos", "23 minutos", "2 minutos"],
      correct: 2,
      fb: "Gloria Mark de la Universidad de California (Irvine) encontró que después de una interrupción digital, el cerebro tarda en promedio 23 minutos en recuperar el foco.",
    },
    en: {
      q: "How long does it take the brain to recover from a digital interruption?",
      opts: ["5 minutes", "10 minutes", "23 minutes", "2 minutes"],
      correct: 2,
      fb: "Gloria Mark from UC Irvine found that after a digital interruption, the brain takes an average of 23 minutes to regain focus.",
    },
  },
  {
    es: {
      q: "¿Qué significa el acrónimo FOMO?",
      opts: [
        "Fear Of Missing Out",
        "Focus On My Objectives",
        "Free Online Media Options",
        "Fatigue Of Mobile Operations",
      ],
      correct: 0,
      fb: "FOMO (Fear Of Missing Out) es el miedo a perderse eventos, oportunidades o experiencias sociales. El 73% de los universitarios lo experimenta en relación con las redes sociales.",
    },
    en: {
      q: "What does the acronym FOMO stand for?",
      opts: [
        "Fear Of Missing Out",
        "Focus On My Objectives",
        "Free Online Media Options",
        "Fatigue Of Mobile Operations",
      ],
      correct: 0,
      fb: "FOMO (Fear Of Missing Out) is the fear of missing events, opportunities, or social experiences. 73% of university students experience it in relation to social media.",
    },
  },
  {
    es: {
      q: "¿Cuánto tiempo antes de dormir recomienda la NSF evitar pantallas?",
      opts: ["30 minutos", "60 minutos", "90 minutos", "15 minutos"],
      correct: 2,
      fb: "La National Sleep Foundation recomienda evitar pantallas al menos 90 minutos antes de dormir para permitir la producción natural de melatonina.",
    },
    en: {
      q: "How long before sleeping does NSF recommend avoiding screens?",
      opts: ["30 minutes", "60 minutes", "90 minutes", "15 minutes"],
      correct: 2,
      fb: "The National Sleep Foundation recommends avoiding screens at least 90 minutes before sleep to allow natural melatonin production.",
    },
  },
  {
    es: {
      q: "¿Qué porcentaje de empleadores revisa redes sociales de candidatos?",
      opts: ["30%", "50%", "70%", "90%"],
      correct: 2,
      fb: "Según CareerBuilder 2023, el 70% de los empleadores revisan las redes sociales de candidatos antes de contratarlos. Tu huella digital importa.",
    },
    en: {
      q: "What percentage of employers check candidates social media?",
      opts: ["30%", "50%", "70%", "90%"],
      correct: 2,
      fb: "According to CareerBuilder 2023, 70% of employers review candidates social media before hiring. Your digital footprint matters.",
    },
  },
  {
    es: {
      q: "¿Cuántos minutos en la naturaleza reducen el cortisol significativamente?",
      opts: ["5 minutos", "10 minutos", "20 minutos", "45 minutos"],
      correct: 2,
      fb: "La Universidad de Michigan encontró que 20 minutos en la naturaleza reduce significativamente el cortisol, la hormona del estrés.",
    },
    en: {
      q: "How many minutes in nature significantly reduce cortisol?",
      opts: ["5 minutes", "10 minutes", "20 minutes", "45 minutes"],
      correct: 2,
      fb: "The University of Michigan found that 20 minutes in nature significantly reduces cortisol, the stress hormone.",
    },
  },
  {
    es: {
      q: "¿Qué es el método SIFT para verificar información?",
      opts: [
        "Un motor de búsqueda académico",
        "Stop, Investigate, Find, Trace",
        "Un filtro de spam digital",
        "Social, Interactive, Fun, Tech",
      ],
      correct: 1,
      fb: "SIFT es un método de verificación: Stop (detente), Investigate (investiga la fuente), Find (encuentra otras fuentes), Trace (rastrea el origen). Es una herramienta clave de alfabetización mediática.",
    },
    en: {
      q: "What is the SIFT method for fact-checking?",
      opts: [
        "An academic search engine",
        "Stop, Investigate, Find, Trace",
        "A digital spam filter",
        "Social, Interactive, Fun, Tech",
      ],
      correct: 1,
      fb: "SIFT is a verification method: Stop, Investigate the source, Find better coverage, Trace the original claim. It is a key media literacy tool.",
    },
  },
  {
    es: {
      q: "¿Cuánto suprime la luz azul la producción de melatonina?",
      opts: ["5%", "10%", "23%", "50%"],
      correct: 2,
      fb: "Estudios demuestran que la luz azul de las pantallas puede suprimir la producción de melatonina hasta en un 23%, retrasando el inicio del sueño.",
    },
    en: {
      q: "By how much does blue light suppress melatonin production?",
      opts: ["5%", "10%", "23%", "50%"],
      correct: 2,
      fb: "Studies show that blue light from screens can suppress melatonin production by up to 23%, delaying sleep onset.",
    },
  },
];

let currentQ = 0;
let answered = false;
let score = 0;
const letters = ["A", "B", "C", "D"];

function renderQuiz() {
  const container = document.getElementById("quiz-content");
  const progressBar = document.getElementById("quiz-progress");

  if (currentQ >= questions.length) {
    progressBar.style.width = "100%";
    const pct = Math.round((score / questions.length) * 100);
    let emoji = pct >= 80 ? "🎉" : pct >= 50 ? "👏" : "📚";
    let msgEs =
      pct >= 80
        ? "¡Excelente! Dominas el bienestar digital."
        : pct >= 50
          ? "¡Bien hecho! Sigue aprendiendo."
          : "Hay mucho por aprender. ¡Revisa los módulos!";
    let msgEn =
      pct >= 80
        ? "Excellent! You master digital wellness."
        : pct >= 50
          ? "Well done! Keep learning."
          : "There is much to learn. Review the modules!";
    container.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-score-circle"><strong>${score}/${questions.length}</strong><span>${pct}%</span></div>
        <div style="font-size:3rem;margin-bottom:12px">${emoji}</div>
        <h3 class="subtitle mb-8">${currentLang === "es" ? msgEs : msgEn}</h3>
        <p class="body-lg" style="max-width:400px;margin:0 auto 28px" data-lang-es="Completaste el quiz de Bienestar Digital" data-lang-en="You completed the Digital Wellness quiz">${currentLang === "es" ? "Completaste el quiz de Bienestar Digital" : "You completed the Digital Wellness quiz"}</p>
        <button class="btn btn-primary" onclick="restartQuiz()">${currentLang === "es" ? "🔄 Repetir quiz" : "🔄 Restart quiz"}</button>
      </div>`;
    return;
  }

  const q = questions[currentQ][currentLang];
  progressBar.style.width = `${((currentQ + 1) / questions.length) * 100}%`;
  answered = false;

  container.innerHTML = `
    <div class="quiz-q-num">${currentLang === "es" ? "Pregunta" : "Question"} ${currentQ + 1} / ${questions.length}</div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options">
      ${q.opts
        .map(
          (opt, i) => `
        <button class="quiz-option" onclick="selectOption(this,${i},${q.correct})">
          <span class="quiz-opt-letter">${letters[i]}</span>
          ${opt}
        </button>`,
        )
        .join("")}
    </div>
    <div class="quiz-feedback" id="quiz-feedback"></div>
    <div class="quiz-nav">
      <span style="font-size:.85rem;color:var(--fog)">${currentLang === "es" ? "Selecciona una respuesta" : "Select an answer"}</span>
      <button class="btn btn-primary btn-sm" id="quiz-next" onclick="nextQuestion()" style="display:none">${currentLang === "es" ? "Siguiente →" : "Next →"}</button>
    </div>`;
}

function selectOption(btn, idx, correct) {
  if (answered) return;
  answered = true;

  const options = document.querySelectorAll(".quiz-option");
  options.forEach((o, i) => {
    o.classList.remove("selected");
    if (i === correct) o.classList.add("correct");
    if (i === idx && i !== correct) o.classList.add("wrong");
  });
  if (idx === correct) {
    score++;
    btn.classList.add("correct");
  } else btn.classList.add("wrong");

  const fb = document.getElementById("quiz-feedback");
  const q = questions[currentQ][currentLang];
  const isCorrect = idx === correct;
  fb.textContent =
    (isCorrect
      ? currentLang === "es"
        ? "✅ ¡Correcto! "
        : "✅ Correct! "
      : currentLang === "es"
        ? "❌ Incorrecto. "
        : "❌ Incorrect. ") + q.fb;
  fb.className = `quiz-feedback show ${isCorrect ? "correct-fb" : "wrong-fb"}`;
  document.getElementById("quiz-next").style.display = "inline-flex";
}

function nextQuestion() {
  currentQ++;
  renderQuiz();
}

function restartQuiz() {
  currentQ = 0;
  score = 0;
  answered = false;
  renderQuiz();
}

/* ── INIT ── */
document.addEventListener("DOMContentLoaded", () => {
  renderQuiz();
});
