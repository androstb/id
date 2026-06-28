(function () {
  "use strict";

  const body = document.body;
  const header = document.querySelector("#header");

  initScrolled();
  initMobileNav();
  initPreloader();
  initScrollTop();
  initAOS();
  initCountdown();
  initCopyButton();
  initScrollSpy();

})();

function initScrolled() {

  function toggleScrolled() {

    if (!header) return;

    if (
      !header.classList.contains('scroll-up-sticky') &&
      !header.classList.contains('sticky-top') &&
      !header.classList.contains('fixed-top')
    ) return;

    body.classList.toggle("scrolled", window.scrollY > 100);

  }

  window.addEventListener("load", toggleScrolled);
  document.addEventListener("scroll", toggleScrolled);

}

function initMobileNav() {

  const mobileBtn = document.querySelector(".mobile-nav-toggle");

  if (!mobileBtn) return;

  function toggleMobile() {

    body.classList.toggle("mobile-nav-active");

    mobileBtn.classList.toggle("bi-list");
    mobileBtn.classList.toggle("bi-x");

  }

  mobileBtn.addEventListener("click", toggleMobile);

  document.querySelectorAll("#navmenu a").forEach(link => {

    link.addEventListener("click", () => {

      if (body.classList.contains("mobile-nav-active")) {
        toggleMobile();
      }

    });

  });

}

function initPreloader() {

  const preloader = document.querySelector("#preloader");

  if (!preloader) return;

  window.addEventListener("load", () => {
    preloader.remove();
  });

}

function initScrollTop() {

  const btn = document.querySelector(".scroll-top");

  if (!btn) return;

  function toggle() {
    btn.classList.toggle("active", window.scrollY > 100);
  }

  btn.addEventListener("click", e => {

    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

  window.addEventListener("load", toggle);
  window.addEventListener("scroll", toggle);

}

function initScrollTop() {

  const btn = document.querySelector(".scroll-top");

  if (!btn) return;

  function toggle() {
    btn.classList.toggle("active", window.scrollY > 100);
  }

  btn.addEventListener("click", e => {

    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

  window.addEventListener("load", toggle);
  window.addEventListener("scroll", toggle);

}

function initAOS() {

  window.addEventListener("load", () => {

    AOS.init({
      duration:600,
      easing:"ease-in-out",
      once:true,
      mirror:false
    });

  });

}

function initCountdown() {

  document.querySelectorAll(".countdown").forEach(item => {

    function update() {

      const timeleft =
        new Date(item.dataset.count).getTime() - Date.now();

      item.querySelector(".count-days").textContent =
        Math.floor(timeleft / 86400000);

      item.querySelector(".count-hours").textContent =
        Math.floor((timeleft % 86400000) / 3600000);

      item.querySelector(".count-minutes").textContent =
        Math.floor((timeleft % 3600000) / 60000);

      item.querySelector(".count-seconds").textContent =
        Math.floor((timeleft % 60000) / 1000);

    }

    update();

    setInterval(update,1000);

  });

}

function initCopyButton() {

  const button = document.getElementById("copyButton");

  if (!button) return;

  const text = document.getElementById("copyText");
  const msg = document.getElementById("copyMessage");

  button.addEventListener("click", () => {

    navigator.clipboard.writeText(text.value).then(() => {

      msg.textContent = "✓ Berhasil disalin";
      msg.classList.add("show");

      clearTimeout(msg.timer);

      msg.timer = setTimeout(() => {

        msg.classList.remove("show");

        setTimeout(() => {

          msg.textContent = "";

        },300);

      },3000);

    });

  });

}

function initScrollSpy() {

  const links = document.querySelectorAll("#navmenu a");
  const sections = document.querySelectorAll("section[id]");

  function update() {

    const offset = header ? header.offsetHeight + 20 : 100;

    let current = "";

    sections.forEach(section => {

      const top = section.offsetTop - offset;
      const height = section.offsetHeight;

      if (
        window.scrollY >= top &&
        window.scrollY < top + height
      ) {
        current = section.id;
      }

    });

    links.forEach(link => {

      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current
      );

    });

  }

  window.addEventListener("load", update);
  window.addEventListener("scroll", update);

}
