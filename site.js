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
