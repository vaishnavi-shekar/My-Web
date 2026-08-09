/* =========================================================
   WebCraft V2
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE HAMBURGER NAVIGATION
     ======================================================= */

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");


  if (hamburger && navMenu) {

    hamburger.addEventListener("click", () => {

      const isOpen =
        hamburger.classList.toggle("active");

      navMenu.classList.toggle("active");

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );

      hamburger.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      hamburger.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );

    });


    /* Close menu after clicking a navigation link */

    navLinks.forEach((link) => {

      link.addEventListener("click", () => {

        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

        document.body.classList.remove(
          "menu-open"
        );

        hamburger.setAttribute(
          "aria-expanded",
          "false"
        );

        hamburger.setAttribute(
          "aria-label",
          "Open navigation"
        );

      });

    });


    /* Close menu with Escape */

    document.addEventListener("keydown", (event) => {

      if (
        event.key === "Escape" &&
        navMenu.classList.contains("active")
      ) {

        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

        document.body.classList.remove(
          "menu-open"
        );

        hamburger.setAttribute(
          "aria-expanded",
          "false"
        );

        hamburger.setAttribute(
          "aria-label",
          "Open navigation"
        );

        hamburger.focus();

      }

    });

  }


  /* =======================================================
     PRICE CALCULATOR
     ======================================================= */

  const siteType =
    document.getElementById("siteType");

  const featureCheckboxes =
    document.querySelectorAll(".feature-check");

  const totalPrice =
    document.getElementById("totalPrice");

  const sendEstimateBtn =
    document.getElementById("sendEstimateBtn");


  /*
     This function calculates the estimate.

     Base price comes from the selected
     business type.

     Each checked feature adds its
     corresponding value.
  */

  function calculatePrice() {

    if (
      !siteType ||
      !totalPrice
    ) {
      return 0;
    }


    let basePrice =
      Number(siteType.value) || 0;


    let additionalPrice = 0;


    featureCheckboxes.forEach((checkbox) => {

      if (checkbox.checked) {

        additionalPrice +=
          Number(checkbox.value) || 0;

      }

    });


    const finalPrice =
      basePrice + additionalPrice;


    totalPrice.textContent =
      `₹${finalPrice.toLocaleString("en-IN")}`;


    return finalPrice;

  }


  /* Calculate when business type changes */

  if (siteType) {

    siteType.addEventListener(
      "change",
      calculatePrice
    );

  }


  /* Calculate when features change */

  featureCheckboxes.forEach((checkbox) => {

    checkbox.addEventListener(
      "change",
      calculatePrice
    );

  });


  /* Initial calculation */

  calculatePrice();


  /* =======================================================
     WHATSAPP ESTIMATE BUTTON
     ======================================================= */

  if (sendEstimateBtn) {

    sendEstimateBtn.addEventListener(
      "click",
      () => {

        const price =
          calculatePrice();


        const selectedBusiness =
          siteType
            ? siteType.options[
                siteType.selectedIndex
              ].text
            : "Website";


        const selectedFeatures = [];


        featureCheckboxes.forEach(
          (checkbox) => {

            if (checkbox.checked) {

              const label =
                checkbox.closest("label");

              if (label) {

                const text =
                  label.querySelector("span");

                if (text) {

                  /*
                    Remove the price text
                    from the feature name.
                  */

                  const featureName =
                    text.textContent
                      .replace(
                        /\+\s*₹[\d,]+/g,
                        ""
                      )
                      .trim();

                  selectedFeatures.push(
                    featureName
                  );

                }

              }

            }

          }
        );


        let message =
          "Hi, I'm interested in building a website with WebCraft.%0A%0A";


        message +=
          `Business Type: ${selectedBusiness}%0A`;


        if (
          selectedFeatures.length > 0
        ) {

          message +=
            `Features: ${selectedFeatures.join(", ")}%0A`;

        } else {

          message +=
            "Additional Features: None%0A";

        }


        message +=
          `%0AEstimated Price: ₹${price.toLocaleString("en-IN")}`;


        message +=
          "%0A%0AI'd like to discuss the project further.";


        const whatsappURL =
          `https://wa.me/918951675099?text=${message}`;


        window.open(
          whatsappURL,
          "_blank",
          "noopener,noreferrer"
        );

      }
    );

  }


  /* =======================================================
     CONTACT FORM → WHATSAPP
     ======================================================= */

  const contactForm =
    document.getElementById("contactForm");


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const name =
          document
            .getElementById("clientName")
            ?.value
            .trim();


        const phone =
          document
            .getElementById("clientPhone")
            ?.value
            .trim();


        const message =
          document
            .getElementById("clientMsg")
            ?.value
            .trim();


        if (
          !name ||
          !phone ||
          !message
        ) {

          return;

        }


        /*
          encodeURIComponent makes sure
          spaces and special characters
          work correctly inside WhatsApp.
        */

        const whatsappMessage =
          `Hi, I'm ${name}.%0A%0A` +
          `Phone: ${phone}%0A%0A` +
          `Website Requirement:%0A${message}`;


        const whatsappURL =
          `https://wa.me/918951675099?text=${whatsappMessage}`;


        window.open(
          whatsappURL,
          "_blank",
          "noopener,noreferrer"
        );

      }
    );

  }


  /* =======================================================
     FAQ
     ======================================================= */

  const faqItems =
    document.querySelectorAll(".faq-item");


  faqItems.forEach((item) => {

    item.addEventListener(
      "toggle",
      () => {

        /*
          Optional accordion behaviour:
          when one FAQ opens, close the others.
        */

        if (item.open) {

          faqItems.forEach((otherItem) => {

            if (otherItem !== item) {

              otherItem.removeAttribute(
                "open"
              );

            }

          });

        }

      }
    );

  });


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  const year =
    document.getElementById("year");


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     CLOSE MOBILE MENU WHEN RESIZING
     ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 850 &&
        navMenu &&
        hamburger
      ) {

        navMenu.classList.remove(
          "active"
        );

        hamburger.classList.remove(
          "active"
        );

        document.body.classList.remove(
          "menu-open"
        );

        hamburger.setAttribute(
          "aria-expanded",
          "false"
        );

        hamburger.setAttribute(
          "aria-label",
          "Open navigation"
        );

      }

    }
  );

});