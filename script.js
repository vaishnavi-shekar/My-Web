document.addEventListener("DOMContentLoaded", () => {
    const siteType = document.getElementById("siteType");
    const featureChecks = document.querySelectorAll(".feature-check");
    const totalPrice = document.getElementById("totalPrice");
    const sendEstimateBtn = document.getElementById("sendEstimateBtn");

    function calculateTotal() {
        let total = Number(siteType.value);

        featureChecks.forEach((checkbox) => {
            if (checkbox.checked) {
                total += Number(checkbox.value);
            }
        });

        totalPrice.textContent = `₹${total.toLocaleString("en-IN")}`;

        return total;
    }

    // Update price whenever business type changes
    siteType.addEventListener("change", calculateTotal);

    // Update price whenever a feature is selected/deselected
    featureChecks.forEach((checkbox) => {
        checkbox.addEventListener("change", calculateTotal);
    });

    // WhatsApp booking button
    sendEstimateBtn.addEventListener("click", () => {
        const total = calculateTotal();

        const businessType =
            siteType.options[siteType.selectedIndex].text;

        const selectedFeatures = [];

        featureChecks.forEach((checkbox) => {
            if (checkbox.checked) {
                selectedFeatures.push(
                    checkbox.parentElement.textContent.trim()
                );
            }
        });

        let message =
            `Hi! I'd like to build a website.%0A%0A` +
            `Business Type: ${encodeURIComponent(businessType)}%0A`;

        if (selectedFeatures.length > 0) {
            message += `%0AFeatures:%0A`;

            selectedFeatures.forEach((feature) => {
                message += `• ${encodeURIComponent(feature)}%0A`;
            });
        }

        message +=
            `%0AEstimated Price: ₹${total.toLocaleString("en-IN")}` +
            `%0A%0AI'd like to discuss the project.`;

        const whatsappURL =
            `https://wa.me/918951675099?text=${message}`;

        window.open(whatsappURL, "_blank");
    });

    // Initial calculation
    calculateTotal();

    // Current year in footer
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }
});