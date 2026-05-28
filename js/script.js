(function () {
  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealIO = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach(function (el) {
      revealIO.observe(el);
    });
  }

  var navTrigger = document.querySelector("[data-mobile-nav-trigger]");
  var navDrawer = document.querySelector("[data-mobile-nav]");
  var navBackdrop = document.querySelector("[data-mobile-nav-backdrop]");
  var navClose = document.querySelector("[data-mobile-nav-close]");
  function openNav() {
    if (!navDrawer) return;
    navDrawer.classList.add("is-open");
    navDrawer.setAttribute("aria-hidden", "false");
    if (navBackdrop) {
      navBackdrop.removeAttribute("hidden");
      requestAnimationFrame(function () {
        navBackdrop.classList.add("is-open");
      });
    }
    navTrigger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    var first = navDrawer.querySelector("a, button");
    if (first) first.focus();
  }
  function closeNav() {
    if (!navDrawer) return;
    navDrawer.classList.remove("is-open");
    navDrawer.setAttribute("aria-hidden", "true");
    if (navBackdrop) {
      navBackdrop.classList.remove("is-open");
      setTimeout(function () {
        navBackdrop.setAttribute("hidden", "");
      }, 300);
    }
    if (navTrigger) {
      navTrigger.setAttribute("aria-expanded", "false");
      navTrigger.focus();
    }
    document.body.style.overflow = "";
  }
  if (navTrigger) navTrigger.addEventListener("click", openNav);
  if (navClose) navClose.addEventListener("click", closeNav);
  if (navBackdrop) navBackdrop.addEventListener("click", closeNav);
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      navDrawer &&
      navDrawer.classList.contains("is-open")
    )
      closeNav();
  });
  if (navDrawer) {
    navDrawer.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = navDrawer.querySelectorAll("a, button");
      if (!f.length) return;
      var first = f[0],
        last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
    navDrawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  var heroCta = document.querySelector("[data-hero-cta]");
  var stickyBar = document.querySelector("[data-sticky-cta]");
  if (heroCta && stickyBar && "IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          stickyBar.classList.toggle("is-visible", !e.isIntersecting);
        });
      },
      { threshold: 0 },
    ).observe(heroCta);
  }
})();

// Sticky Header Scroll State
(function () {
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 20) {
          header.classList.add("is-scrolled");
        } else {
          header.classList.remove("is-scrolled");
        }
      },
      { passive: true },
    );

    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    }
  }

  var dropdowns = document.querySelectorAll(".section--hero__nav-dropdown");
  dropdowns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var expanded = this.getAttribute("aria-expanded") === "true" || false;
      this.setAttribute("aria-expanded", !expanded);
    });
  });
})();

(function () {
  // start :: pricing
  const toggleBtn = document.querySelector(
    ".section--pricing:not(.section--pricing-plans__toggle) .section--pricing__toggle-switch",
  );
  if (toggleBtn) {
    const labels = toggleBtn
      .closest(".section--pricing__toggle")
      .querySelectorAll(".section--pricing__toggle-label");
    toggleBtn.addEventListener("click", () => {
      toggleBtn.classList.toggle("is-yearly");
      const showYearly = toggleBtn.classList.contains("is-yearly");

      if (labels.length >= 2) {
        if (showYearly) {
          labels[0].classList.add("section--pricing__toggle-label--inactive");
          labels[1].classList.remove(
            "section--pricing__toggle-label--inactive",
          );
        } else {
          labels[0].classList.remove(
            "section--pricing__toggle-label--inactive",
          );
          labels[1].classList.add("section--pricing__toggle-label--inactive");
        }
      }

      document
        .querySelectorAll(".section--pricing__card-price")
        .forEach((card) => {
          card.querySelector(
            ".section--pricing__price-wrapper--monthly",
          ).style.display = showYearly ? "none" : "inline-flex";
          card.querySelector(
            ".section--pricing__price-wrapper--yearly",
          ).style.display = showYearly ? "inline-flex" : "none";
        });
    });
  }
  // end :: pricing
})();

(function () {
  //marquee duplicate
  var marqueeContainer = document.querySelector(
    ".section--hero__integrations-marquee",
  );
  if (marqueeContainer) {
    var rowToClone = marqueeContainer.querySelector(
      ".section--hero__integrations-row",
    );
    if (rowToClone) {
      var clone = rowToClone.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      marqueeContainer.appendChild(clone);
    }
  }

  // Starter section step active on scroll
  var steps = document.querySelectorAll(".section--starter__step");
  if (steps.length > 0) {
    var updateSteps = function () {
      var vh = window.innerHeight;
      var threshold = vh * 0.6;
      var activeIndex = -1;

      steps.forEach(function (step, index) {
        var rect = step.getBoundingClientRect();
        if (rect.top < threshold) {
          activeIndex = index;
        }
      });

      steps.forEach(function (step, index) {
        var content = step.querySelector(".section--starter__step-content");
        if (index <= activeIndex) {
          step.classList.add("is-active");
          if (content) content.classList.add("is-active");
        } else {
          step.classList.remove("is-active");
          if (content) content.classList.remove("is-active");
        }
      });
    };

    window.addEventListener(
      "scroll",
      function () {
        requestAnimationFrame(updateSteps);
      },
      { passive: true },
    );

    updateSteps();
  }

  // Live Demo Tabs and Cards
  var demoTabs = document.querySelectorAll(".section--live-demo__tab");
  var demoBodies = document.querySelectorAll(".section--live-demo__body");
  var demoInterval;

  function startDemoCycle() {
    clearInterval(demoInterval);
    demoInterval = setInterval(function () {
      var activeTab = document.querySelector(
        ".section--live-demo__tab.is-active",
      );
      if (!activeTab) return;
      var targetBody = activeTab.getAttribute("data-demo-tab");

      var activeBody = null;
      demoBodies.forEach(function (body) {
        if (body.getAttribute("data-demo-body") === targetBody) {
          activeBody = body;
        }
      });

      if (!activeBody) return;

      var cards = Array.from(
        activeBody.querySelectorAll(".section--live-demo__card"),
      );
      if (cards.length === 0) return;

      var activeIndex = -1;
      cards.forEach(function (card, index) {
        if (card.classList.contains("section--live-demo__card--active")) {
          activeIndex = index;
        }
      });

      var nextIndex = (activeIndex + 1) % cards.length;

      cards.forEach(function (c, i) {
        if (i === nextIndex) {
          c.classList.add("section--live-demo__card--active");
        } else {
          c.classList.remove("section--live-demo__card--active");
        }
      });
    }, 3000);
  }

  if (demoTabs.length > 0) {
    demoTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-demo-tab");

        // Update tabs
        demoTabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");

        // Update bodies
        demoBodies.forEach(function (body) {
          if (body.getAttribute("data-demo-body") === target) {
            body.classList.add("is-active");
            // Make sure the first card is active when switching tabs
            var bodyCards = body.querySelectorAll(".section--live-demo__card");
            bodyCards.forEach(function (c, i) {
              if (i === 0) {
                c.classList.add("section--live-demo__card--active");
              } else {
                c.classList.remove("section--live-demo__card--active");
              }
            });
          } else {
            body.classList.remove("is-active");
          }
        });

        // Restart cycle
        startDemoCycle();
      });
    });

    // Start initial cycle
    startDemoCycle();
  }

  // Sticky Cards Dynamic Offset
  var stickyCards = document.querySelectorAll(".sticky-card");
  if (stickyCards.length > 0) {
    var baseTop = 100;
    var offsetStep = 30;
    stickyCards.forEach(function (card, index) {
      card.style.top = baseTop + index * offsetStep + "px";
      card.style.zIndex = index + 1;
    });
  }

  // Why Corvexa Accordion Interactivity
  var whyCorvexaRows = document.querySelectorAll(".section--why-corvexa__row");
  if (whyCorvexaRows.length > 0) {
    whyCorvexaRows.forEach(function (row) {
      row.addEventListener("click", function () {
        var isActive = this.classList.contains(
          "section--why-corvexa__row--active",
        );

        whyCorvexaRows.forEach(function (r) {
          r.classList.remove("section--why-corvexa__row--active");
        });

        if (!isActive) {
          this.classList.add("section--why-corvexa__row--active");
        }
      });
    });
  }

  // Integrations Hover Persistence
  var integrationCards = document.querySelectorAll(
    ".section--integrations__card",
  );
  if (integrationCards.length > 0) {
    integrationCards.forEach(function (card) {
      card.addEventListener("mouseenter", function () {
        if (window.innerWidth > 1024) {
          integrationCards.forEach(function (c) {
            c.classList.remove("section--integrations__card--featured");
          });
          this.classList.add("section--integrations__card--featured");
        }
      });
    });
  }

  // Integrations Mobile Pagination and Auto-scroll (infinite loop)
  var integrationsGrid = document.querySelector(".section--integrations__grid");
  var paginationContainer = document.querySelector(
    ".section--integrations__pagination",
  );
  if (integrationsGrid && paginationContainer && integrationCards.length > 0) {
    var realCardCount = integrationCards.length;
    var isMobileLoop = window.innerWidth <= 1024;

    // Clone ALL cards and append them for seamless forward-only loop
    if (isMobileLoop) {
      integrationCards.forEach(function (card) {
        var clone = card.cloneNode(true);
        clone.setAttribute("data-clone", "true");
        clone.classList.remove("section--integrations__card--featured");
        integrationsGrid.appendChild(clone);
      });
    }

    // Generate dots (only for real cards)
    integrationCards.forEach(function (_, index) {
      var dot = document.createElement("div");
      dot.className =
        "section--integrations__dot" +
        (index === 0 ? " section--integrations__dot--active" : "");
      dot.addEventListener("click", function () {
        var card = integrationCards[index];
        var paddingLeft = parseFloat(
          window.getComputedStyle(integrationsGrid).paddingLeft,
        );
        var scrollPos =
          card.offsetLeft - integrationsGrid.offsetLeft - paddingLeft;
        integrationsGrid.scrollTo({
          left: scrollPos,
          behavior: "smooth",
        });
      });
      paginationContainer.appendChild(dot);
    });

    var dots = Array.from(
      paginationContainer.querySelectorAll(".section--integrations__dot"),
    );

    function updateDots(activeIdx) {
      dots.forEach(function (dot, i) {
        if (i === activeIdx) {
          dot.classList.add("section--integrations__dot--active");
        } else {
          dot.classList.remove("section--integrations__dot--active");
        }
      });
    }

    var integrationsAutoScroll;

    function startIntegrationsAutoScroll() {
      clearInterval(integrationsAutoScroll);
      integrationsAutoScroll = setInterval(function () {
        if (window.innerWidth <= 1024) {
          // Always scroll forward by one card width
          var cardWidth = integrationsGrid.clientWidth;
          integrationsGrid.scrollTo({
            left: integrationsGrid.scrollLeft + cardWidth,
            behavior: "smooth",
          });
        }
      }, 3000);
    }

    startIntegrationsAutoScroll();

    // Reposition when landing on a cloned card
    var scrollEndTimer;
    var isRepositioning = false;

    integrationsGrid.addEventListener(
      "scroll",
      function () {
        if (isRepositioning) return;

        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(function () {
          var scrollLeft = integrationsGrid.scrollLeft;
          var cardWidth = integrationsGrid.clientWidth;
          var currentIndex = Math.round(scrollLeft / cardWidth);

          if (isMobileLoop && currentIndex >= realCardCount) {
            // Landed on a cloned card — silently jump to the matching real card
            var realIndex = currentIndex - realCardCount;
            isRepositioning = true;
            integrationsGrid.scrollTo({
              left: realIndex * cardWidth,
              behavior: "instant",
            });
            updateDots(realIndex);
            requestAnimationFrame(function () {
              isRepositioning = false;
            });
          } else {
            // On a real card — just update dots
            var dotIndex = isMobileLoop ? currentIndex : currentIndex;
            dotIndex = Math.max(0, Math.min(dotIndex, dots.length - 1));
            updateDots(dotIndex);
          }

          startIntegrationsAutoScroll();
        }, 80);
      },
      { passive: true },
    );
  }

  // FAQ Accordion Interactivity
  var faqItems = document.querySelectorAll(".section--faq__item");
  if (faqItems.length > 0) {
    faqItems.forEach(function (item) {
      item.addEventListener("toggle", function (e) {
        if (e.target.open) {
          faqItems.forEach(function (otherItem) {
            if (otherItem !== e.target && otherItem.open) {
              otherItem.removeAttribute("open");
            }
          });
        }
      });
    });
  }
})();

// Promise Stacking Cards Scroll Animation
(function () {
  var section = document.querySelector(".section--about-promise");
  var stack = document.querySelector(".section--about-promise__stack");
  var cards = document.querySelectorAll(".section--about-promise__main");

  if (!section || !stack || !cards.length) return;

  let targetProgress = 0;
  let currentProgress = 0;
  const ease = 0.1; // Smooth damping lerp factor
  let isAnimating = false;

  // Base front and back colors
  const cFront = [11, 109, 255]; // rgb(11, 109, 255)
  const cBack = [194, 219, 255]; // rgb(194, 219, 255)

  function renderPromiseCards(progress) {
    const N = cards.length;
    if (N <= 1) {
      cards.forEach((c) => {
        c.style.transform =
          c.style.backgroundColor =
          c.style.zIndex =
          c.style.opacity =
            "";
      });
      return;
    }

    const s = Math.min(N - 2, Math.floor(progress * (N - 1)));
    const segProgress = progress * (N - 1) - s;

    cards.forEach((card, idx) => {
      const posStart = (idx - s + N) % N;
      const posEnd = (idx - (s + 1) + N) % N;

      // Linear interpolation of stack position index
      const pos = posStart + segProgress * (posEnd - posStart);
      const translateY = pos * (70 / (N - 1));
      const scale = 1.0 - pos * (0.12 / (N - 1));

      // Direct color interpolation based on position
      const f = pos / (N - 1);
      const r = Math.round(cFront[0] + f * (cBack[0] - cFront[0]));
      const g = Math.round(cFront[1] + f * (cBack[1] - cFront[1]));
      const b = Math.round(cFront[2] + f * (cBack[2] - cFront[2]));

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      card.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      card.style.zIndex = segProgress < 0.5 ? N - posStart : N - posEnd;
      card.style.opacity = "1.0";
    });
  }

  function animate() {
    if (window.innerWidth <= 1024) {
      isAnimating = false;
      return;
    }

    const diff = targetProgress - currentProgress;

    if (Math.abs(diff) < 0.0001) {
      currentProgress = targetProgress;
      isAnimating = false;
    } else {
      currentProgress += diff * ease;
      requestAnimationFrame(animate);
    }

    renderPromiseCards(currentProgress);
  }

  function updatePromiseScales() {
    if (window.innerWidth <= 1024) {
      targetProgress = 0;
      currentProgress = 0;
      isAnimating = false;
      cards.forEach((card) => {
        card.style.transform = "";
        card.style.opacity = "";
        card.style.zIndex = "";
      });
      return;
    }

    const sectionRect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Total scrollable height of the Promise section
    const scrollDistance = sectionRect.height - viewportHeight;

    // Progress goes from 0 to 1
    let progress = -sectionRect.top / (scrollDistance || 1);
    targetProgress = Math.max(0, Math.min(1, progress));

    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(animate);
    }
  }

  // Initial call
  updatePromiseScales();

  window.addEventListener("scroll", updatePromiseScales, { passive: true });
  window.addEventListener("resize", updatePromiseScales, { passive: true });
})();

// Case Studies Tab Filter
(function () {
  var tabs = document.querySelectorAll(".section--case-studies__tab");
  var cards = document.querySelectorAll(".section--case-studies__card");
  var empty = document.querySelector(".section--case-studies__empty");
  var grid = document.querySelector(".section--case-studies__grid");
  if (tabs.length > 0) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("active");
        });
        tab.classList.add("active");
        var f = tab.dataset.filter,
          count = 0;
        cards.forEach(function (c) {
          var show = f === "all" || c.dataset.category === f;
          c.style.display = show ? "" : "none";
          count += show ? 1 : 0;
        });
        if (empty) {
          empty.style.display = count ? "none" : "flex";
          if (grid) grid.style.display = count ? "" : "none";
        }
      });
    });
  }
})();

// Back to Top Button
(function () {
  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 300) {
          backToTop.classList.add("is-visible");
        } else {
          backToTop.classList.remove("is-visible");
        }
      },
      { passive: true },
    );

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
})();

// how it works js

(function () {
  const cards = document.querySelectorAll(".how-it-works__card"),
    stage = document.querySelector(".section--how-it-works__stage");
  if (!cards.length || !stage) return;

  let targetProgress = 0,
    currentProgress = 0,
    isAnimating = false;
  const ease = 0.1;

  function renderScales(p) {
    cards.forEach((card, idx) => {
      const act = idx * 0.3;
      const iEnd = Math.max(0, act - 0.1),
        aStart = Math.max(0, act - 0.02);
      const fStart = idx === 3 ? 2 : act + 0.15,
        fEnd = idx === 3 ? 2 : act + 0.25;

      const tIn =
        aStart === iEnd
          ? 1
          : Math.min(1, Math.max(0, (p - iEnd) / (aStart - iEnd)));
      const tOut = Math.min(
        1,
        Math.max(0, (p - fStart) / (fEnd - fStart || 1)),
      );

      card.style.transform = `scale(${p < fStart ? 0.4 + tIn * 0.6 : 1 + tOut * 0.3})`;
      card.style.opacity = p < fStart ? 0.5 + tIn * 0.5 : 1 - tOut;
      const blur = p < fStart ? (1 - tIn) * 1.5 : 0;
      card.style.filter = blur > 0 ? `blur(${blur}px)` : "";
      card.style.pointerEvents =
        p >= aStart - 0.04 && p < fStart ? "auto" : "none";
    });
  }

  function animate() {
    if (window.innerWidth <= 1024) return (isAnimating = false);
    const diff = targetProgress - currentProgress;
    if (Math.abs(diff) < 0.0001) {
      currentProgress = targetProgress;
      isAnimating = false;
    } else {
      currentProgress += diff * ease;
      requestAnimationFrame(animate);
    }
    renderScales(currentProgress);
  }

  function updateScales() {
    if (window.innerWidth <= 1024) {
      targetProgress = currentProgress = 0;
      isAnimating = false;
      cards.forEach(
        (c) =>
          (c.style.transform =
            c.style.opacity =
            c.style.filter =
            c.style.pointerEvents =
              ""),
      );
      return;
    }
    const rect = stage.getBoundingClientRect();
    targetProgress = Math.max(
      0,
      Math.min(1, -rect.top / (rect.height - window.innerHeight || 1)),
    );
    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(animate);
    }
  }

  updateScales();
  window.addEventListener("scroll", updateScales, { passive: true });
  window.addEventListener("resize", updateScales, { passive: true });
})();

(function () {
  var footerCols = document.querySelectorAll("[data-footer-col]");
  function syncFooterCols() {
    var isMobile = window.matchMedia("(max-width: 767px)").matches;
    footerCols.forEach(function (col) {
      if (isMobile) col.removeAttribute("open");
      else col.setAttribute("open", "");
    });
  }
  if (footerCols.length) {
    syncFooterCols();
    window.addEventListener("resize", syncFooterCols);

    // Disable click on desktop to prevent collapsing
    footerCols.forEach(function (col) {
      var summary = col.querySelector("summary");
      if (summary) {
        summary.addEventListener("click", function (e) {
          if (!window.matchMedia("(max-width: 767px)").matches) {
            e.preventDefault();
          }
        });
      }
    });
  }
})();

// pricing comparision table js
document.addEventListener("DOMContentLoaded", function () {
  const billingEls = document.querySelectorAll(
    ".section--pricing-comparison__billing",
  );
  const headerEls = document.querySelectorAll(
    ".section--pricing-comparison__plan-header",
  );
  const stickyItems = [...Array.from(billingEls), ...Array.from(headerEls)];

  const wrapper = document.querySelector(".section--pricing-comparison");

  const setPricingPlansBilling = function (isYearly) {
    document
      .querySelectorAll(".section--pricing-plans__toggle")
      .forEach(function (parent) {
        const toggle = parent.querySelector(
          ".section--pricing-plans__toggle-switch",
        );
        const monthly = parent.querySelector(
          ".section--pricing-plans__toggle-monthly",
        );
        const yearly = parent.querySelector(
          ".section--pricing-plans__toggle-yearly",
        );

        parent.classList.toggle("is-yearly", isYearly);
        parent.classList.toggle("is-monthly", !isYearly);

        if (toggle) {
          toggle.classList.toggle("is-yearly", isYearly);
          toggle.setAttribute("aria-pressed", String(isYearly));
        }

        if (monthly) {
          monthly.classList.toggle("active", !isYearly);
          monthly.classList.toggle(
            "section--pricing__toggle-label--inactive",
            isYearly,
          );
        }

        if (yearly) {
          yearly.classList.toggle("active", isYearly);
          yearly.classList.toggle(
            "section--pricing__toggle-label--inactive",
            !isYearly,
          );
        }
      });

    document
      .querySelectorAll(".section--pricing-plans .section--pricing__card-price")
      .forEach(function (card) {
        const monthly = card.querySelector(
          ".section--pricing__price-wrapper--monthly",
        );
        const yearly = card.querySelector(
          ".section--pricing__price-wrapper--yearly",
        );

        if (monthly) monthly.style.display = isYearly ? "none" : "inline-flex";
        if (yearly) yearly.style.display = isYearly ? "inline-flex" : "none";
      });

    document.querySelectorAll("[data-monthly]").forEach(function (el) {
      el.textContent = el.getAttribute(
        isYearly ? "data-yearly" : "data-monthly",
      );
    });
  };

  setPricingPlansBilling(true);

  // Billing Toggle Sync
  document.addEventListener("click", function (e) {
    const target = e.target.closest(
      ".section--pricing-plans__toggle-switch, .section--pricing-plans__toggle-monthly, .section--pricing-plans__toggle-yearly",
    );

    if (!target) return;

    const parent = target.closest(".section--pricing-plans__toggle");
    if (!parent) return;

    const toggle = parent.querySelector(
      ".section--pricing-plans__toggle-switch",
    );
    if (!toggle) return;

    let isYearly;

    if (target.classList.contains("section--pricing-plans__toggle-monthly")) {
      isYearly = false;
    } else if (
      target.classList.contains("section--pricing-plans__toggle-yearly")
    ) {
      isYearly = true;
    } else {
      isYearly = !toggle.classList.contains("is-yearly");
    }

    setPricingPlansBilling(isYearly);
  });

  if (wrapper && stickyItems.length > 0) {
    const updateStickyState = function () {
      if (window.innerWidth >= 991) {
        const header = document.querySelector(".site-header");

        const offset = header ? header.offsetHeight : 0;

        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        const wrapperRect = wrapper.getBoundingClientRect();

        const triggerTop = wrapperRect.top + scrollTop;

        const tableBottom = triggerTop + wrapper.offsetHeight;

        const billingEl = billingEls.length > 0 ? billingEls[0] : null;

        const stickyHeight = billingEl ? billingEl.offsetHeight : 0;

        const isSticky =
          scrollTop > triggerTop - offset &&
          scrollTop + offset + stickyHeight < tableBottom;

        stickyItems.forEach(function (item) {
          item.classList.toggle("is-sticky", isSticky);

          if (isSticky) {
            item.style.top = offset + "px";
          } else {
            item.style.top = "";
          }
        });

        if (isSticky && window.innerWidth <= 991) {
          const leftPos = wrapperRect.left - wrapper.scrollLeft;

          stickyItems.forEach(function (item) {
            item.style.left = leftPos + "px";
          });
        } else {
          stickyItems.forEach(function (item) {
            item.style.left = "";
          });
        }
      }
    };

    window.addEventListener("scroll", updateStickyState);

    window.addEventListener("resize", updateStickyState);

    wrapper.addEventListener("scroll", function () {
      if (window.innerWidth <= 991) {
        const scrollLeft = wrapper.scrollLeft;

        stickyItems.forEach(function (item) {
          item.style.transform = `translateX(-${scrollLeft}px)`;
        });
      }
    });
  }
});
