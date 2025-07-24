document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // prevent form submission for demo

    let errors = [];

    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form['confirm_password'].value;
    const phone = form.phone.value.trim();
    const agreement1 = form.agreement1.checked;
    const agreement2 = form.agreement2.checked;

    // Email validation
    if (!email) {
      errors.push("Email is required.");
    } else if (!validateEmail(email)) {
      errors.push("Please enter a valid email address.");
    }

    // Password validation (min 8 chars, uppercase, lowercase, number, special char)
    if (!password) {
      errors.push("Password is required.");
    } else if (!validatePassword(password)) {
      errors.push(
        "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character."
      );
    }

    if (!confirmPassword) {
      errors.push("Please confirm your password.");
    } else if (password !== confirmPassword) {
      errors.push("Passwords do not match.");
    }

    // Phone validation (basic international format)
    if (!phone) {
      errors.push("Phone number is required.");
    } else if (!validatePhone(phone)) {
      errors.push("Please enter a valid phone number.");
    }

    if (!agreement1) {
      errors.push(
        "You must agree to the Cross-border Merchants Unified Workbench Service Agreement."
      );
    }
    if (!agreement2) {
      errors.push(
        "You must agree to the Consent Letter for Cross-border Transmission of Personal Information by Chinese Seller."
      );
    }

    if (errors.length > 0) {
      alert("Please fix the following errors:\n\n" + errors.join("\n"));
      return false;
    }

    alert("Registration successful! Thank you.");
    form.reset();
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return re.test(password);
  }

  function validatePhone(phone) {
    const re = /^[+\d]?(?:[\d\s-]{7,})$/;
    return re.test(phone);
  }
});
