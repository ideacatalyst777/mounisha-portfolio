(function () {
    emailjs.init({
        publicKey: "mBY2neNOa5GFYIa66"
    });
})();

function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {
    link.addEventListener("click", function () {
        document.getElementById("navLinks").classList.remove("active");
    });
});

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || subject === "" || message === "") {
        alert("Please fill in all the fields.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
}

    const adminParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    };

    const visitorParams = {
        to_name: name,
        to_email: email
    };

    const submitButton = contactForm.querySelector("button[type='submit']");

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

 emailjs.send(
    "service_1fh9w4l",
    "template_mvo67re",
    adminParams
)
.then(function () {
    return emailjs.send(
        "service_1fh9w4l",
        "template_08pqqv3",
        visitorParams
    );
})
    .then(function () {
        alert("Message sent successfully! Thank you for contacting me.");
        contactForm.reset();
    })
    .catch(function (error) {
        console.log("Email Error:", error);
        alert("Unable to send your message. Please try again.");
    })
    .finally(function () {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    });
});

