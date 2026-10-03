// نسيم الظل — شريط الصور المتحركة أعلى كل صفحة: تبديل تلقائي كل 4 ثوانٍ
// مع نقاط تنقّل يدوية.
(function () {
  "use strict";
  var carousel = document.querySelector(".hero-carousel");
  if (!carousel) return;
  var slides = Array.prototype.slice.call(carousel.querySelectorAll(".hc-slide"));
  var dotsWrap = carousel.querySelector(".hc-dots");
  if (slides.length < 2) return;
  var i = 0;
  var timer;

  slides.forEach(function (s, idx) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "الصورة " + (idx + 1));
    if (idx === 0) dot.className = "active";
    dot.addEventListener("click", function () {
      go(idx);
      restart();
    });
    if (dotsWrap) dotsWrap.appendChild(dot);
  });
  var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];

  function go(n) {
    slides[i].classList.remove("active");
    if (dots[i]) dots[i].classList.remove("active");
    i = n;
    slides[i].classList.add("active");
    if (dots[i]) dots[i].classList.add("active");
  }

  function next() {
    go((i + 1) % slides.length);
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 4500);
  }

  restart();
})();

// نسيم الظل — صندوق عرض الصور: يجمع كل صور الصفحة الحاملة لصنف lb-img
// في مجموعة واحدة، ويتيح التنقل بينها بالسهمين أو بلوحة المفاتيح.
(function () {
  "use strict";

  var images = Array.prototype.slice.call(document.querySelectorAll("img.lb-img"));
  if (!images.length) return;

  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var btnClose = lightbox.querySelector(".lb-close");
  var btnPrev = lightbox.querySelector(".lb-prev");
  var btnNext = lightbox.querySelector(".lb-next");

  var current = 0;

  function open(index) {
    current = index;
    show();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    btnClose.focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  function show() {
    var img = images[current];
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || "";
  }

  function next() {
    current = (current + 1) % images.length;
    show();
  }

  function prev() {
    current = (current - 1 + images.length) % images.length;
    show();
  }

  images.forEach(function (img, i) {
    img.addEventListener("click", function () {
      open(i);
    });
  });

  btnClose.addEventListener("click", close);
  btnNext.addEventListener("click", next);
  btnPrev.addEventListener("click", prev);

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
})();
