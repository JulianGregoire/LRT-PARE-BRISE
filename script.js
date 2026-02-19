// Sticky Header Logic
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 50);
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('.service-row, .about-text, .about-image');

const revealOnScroll = () => {
    for (let i = 0; i < revealElements.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = revealElements[i].getBoundingClientRect().top;
        let elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add('active');
        }
    }
};

window.addEventListener('scroll', revealOnScroll);

// Multi-step Form Logic
const form = document.getElementById('appointment-form');
const steps = document.querySelectorAll('.form-step');
const stepIndicators = document.querySelectorAll('.step');
let currentStep = 0;

function updateForm() {
    steps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
    });

    stepIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index <= currentStep);
    });

    window.scrollTo({
        top: document.querySelector('.contact').offsetTop - 100,
        behavior: 'smooth'
    });
}

document.querySelectorAll('.next-step').forEach(button => {
    button.addEventListener('click', () => {
        const currentFields = steps[currentStep].querySelectorAll('[required]');
        let valid = true;

        currentFields.forEach(field => {
            if (field.type === 'radio') {
                const name = field.name;
                if (!form.querySelector(`input[name="${name}"]:checked`)) {
                    valid = false;
                }
            } else if (!field.value) {
                valid = false;
            }
        });

        if (valid) {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateForm();
            }
        } else {
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    });
});

document.querySelectorAll('.prev-step').forEach(button => {
    button.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateForm();
        }
    });
});

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Votre demande de rendez-vous a bien été envoyée ! Un expert LRT Parebrise va vous contacter dans les plus brefs délais.');
        currentStep = 0;
        form.reset();
        updateForm();
    });
}
