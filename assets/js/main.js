//dar load a biblioteca das particulas no home page
particlesJS.load("particles-js", "/assets/js/particle.js/particles_config.json");

//Animação da barra de progresso ao abrir a página
const bar = document.querySelector('.progress-bar');
const value = bar.getAttribute('aria-valuenow');
bar.style.setProperty('--target-width', value + '%');
bar.style.width = 0;
bar.classList.add('animate-progress');

//Submissão do formulário de contacto com validação do captcha da cloudflare, o request é enviado via Fetch API
const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {

    e.preventDefault(); //Evita o envio do formulário da forma tradicionar, para evitar recarregar a página
    const formData = new FormData(form);
    const turnstileResponse = document.querySelector('input[name="cf-turnstile-response"]')?.value;
    if (!turnstileResponse) {
        alert("Captcha não resolvido. Por favor tente novamente.");
        return;
    }
    formData.set("cf_turnstile_response", turnstileResponse);
    try {
        const response = await fetch("https://api.miguelvasconcelos.com/contact-site", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.detail || "Erro ao submeter o formulário.");
        }

        alert(result.message || "Mensagem enviada com sucesso!");
        form.reset();
        turnstile.reset();
    } catch (err) {
        console.error(err);
        alert("Erro: " + err.message);
    }
});

// Animação dos botões dos tabs com a bilbioteca Animate.css
const tabs = document.querySelectorAll('.nav-link');
let index = 0;

function animateTab() {
    tabs.forEach(tab => {
        tab.classList.remove('animate__animated', 'animate__heartBeat', 'animate__slow');
    });

    const current = tabs[index];
    current.classList.add('animate__animated', 'animate__heartBeat', 'animate__slow');

    index = (index + 1) % tabs.length;

    setTimeout(animateTab, 4000);
}

animateTab();