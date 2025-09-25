document.addEventListener("DOMContentLoaded", () => {
  // Fade-in on page load
  document.body.classList.add("fade-in");

  // Inject navbar
  fetch("/components/navbar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      // Delay binding to ensure DOM is ready
      setTimeout(() => {
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".navbar-links");

        if (hamburger && navLinks) {
          hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("show");
          });
        }

        // Scrollspy: highlight active nav link
        const sections = document.querySelectorAll("section[id]");
        const navItems = document.querySelectorAll(".navbar-links a[href^='#']");

        const activateNav = () => {
          let scrollY = window.pageYOffset;

          sections.forEach((section) => {
            const offsetTop = section.offsetTop - 100;
            const offsetBottom = offsetTop + section.offsetHeight;

            if (scrollY >= offsetTop && scrollY < offsetBottom) {
              navItems.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${section.id}`) {
                  link.classList.add("active");
                }
              });
            }
          });
        };

        window.addEventListener("scroll", activateNav);
        activateNav(); // Initial check
      }, 100);
    });

  // Inject footer
  fetch("/components/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Overlay slide transition between pages
  document.querySelectorAll("a[href]").forEach((link) => {
    const url = link.getAttribute("href");

    // Only apply to internal links (not anchors or external)
    if (url && !url.startsWith("#") && !url.startsWith("http")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.add("transitioning");
        setTimeout(() => {
          window.location.href = url;
        }, 800); // Match CSS transition duration
      });
    }
  });
});

// Clean up transition class on page show
window.addEventListener("pageshow", () => {
  document.body.classList.remove("transitioning");
});
