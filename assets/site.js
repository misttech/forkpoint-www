// Copyright 2026 Mist Tecnologia LTDA. All rights reserved.

(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Section reveal
  const reveals = document.querySelectorAll(".reveal");
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.14 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  // SDK language tabs
  document.querySelectorAll("[data-sdk-tabs]").forEach((root) => {
    const tabs = root.querySelectorAll(".sdk-tab");
    const panels = root.querySelectorAll("[data-sdk-panel]");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const lang = tab.getAttribute("data-sdk-lang");
        tabs.forEach((t) => {
          const on = t === tab;
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
        });
        panels.forEach((panel) => {
          const on = panel.getAttribute("data-sdk-panel") === lang;
          panel.classList.toggle("is-active", on);
          panel.hidden = !on;
        });
      });
    });
  });

  // Replay scrub mock
  const events = [
    { t: "0 µs", text: "boot · reset vector" },
    { t: "120 µs", text: "UART ready · console attach" },
    { t: "840 µs", text: "timer IRQ · scheduler tick" },
    { t: "1.40 ms", text: "DMA complete · buffer handoff" },
    { t: "2.10 ms", text: "I²C NACK · retry path" },
    { t: "2.85 ms", text: "property fail · double-free probe" },
  ];

  const list = document.getElementById("replay-events");
  const scrub = document.getElementById("replay-scrub");
  const timeLabel = document.getElementById("replay-time");
  const playBtn = document.getElementById("replay-play");
  const stepBtn = document.getElementById("replay-step");
  if (!list || !scrub || !timeLabel || !playBtn || !stepBtn) return;

  events.forEach((ev, i) => {
    const row = document.createElement("div");
    row.className = "event" + (i === 0 ? " is-active" : "");
    row.dataset.index = String(i);
    row.innerHTML = `<time>${ev.t}</time><span>${ev.text}</span>`;
    list.appendChild(row);
  });

  let index = 0;
  let playing = false;
  let timer = null;

  function setIndex(next) {
    index = Math.max(0, Math.min(events.length - 1, next));
    scrub.value = String(index);
    timeLabel.textContent = events[index].t;
    list.querySelectorAll(".event").forEach((el, i) => {
      el.classList.toggle("is-active", i === index);
    });
  }

  function stop() {
    playing = false;
    playBtn.textContent = "Play";
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  scrub.max = String(events.length - 1);
  scrub.value = "0";
  scrub.addEventListener("input", () => {
    stop();
    setIndex(Number(scrub.value));
  });

  stepBtn.addEventListener("click", () => {
    stop();
    setIndex(index + 1 >= events.length ? 0 : index + 1);
  });

  playBtn.addEventListener("click", () => {
    if (playing) {
      stop();
      return;
    }
    playing = true;
    playBtn.textContent = "Pause";
    timer = setInterval(() => {
      if (index >= events.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, reduce ? 900 : 700);
  });
})();
