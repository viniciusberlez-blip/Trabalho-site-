document.addEventListener("DOMContentLoaded", () => {
    
    // --- ALTERNADOR DE MODO CLARO / ESCURO ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    themeToggleBtn.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
            body.classList.replace("dark-mode", "light-mode");
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            body.classList.replace("light-mode", "dark-mode");
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    });

    // --- ANIMAÇÃO DE SCROLL (REVEAL ANIMATIONS) ---
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add("active");
                
                // Dispara animação especial de barras de gráfico se for a seção de dados
                if(el.id === 'stats' || el.querySelector('.bar')) {
                    animateCharts();
                }
                // Dispara contadores se contiver contadores
                if(el.querySelector('.counter')) {
                    animateCounters();
                }
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Início imediato caso haja elementos na tela inicial

    // --- ANIMAÇÃO DAS BARRAS DE GRÁFICO ---
    function animateCharts() {
        const bars = document.querySelectorAll(".bar");
        bars.forEach(bar => {
            const progress = bar.style.getPropertyValue('--progress');
            bar.style.width = progress;
        });
    }

    // --- CONTADORES NUMÉRICOS ANIMADOS ---
    function animateCounters() {
        const counters = document.querySelectorAll(".counter");
        counters.forEach(counter => {
            if(counter.classList.contains('counted')) return; // Evita re-animar
            
            counter.innerText = "0";
            const updateCounter = () => {
                const target = +counter.getAttribute("data-target");
                const current = +counter.innerText;
                const increment = target / 50; // Velocidade da contagem

                if (current < target) {
                    counter.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 25);
                } else {
                    counter.innerText = target;
                    counter.classList.add('counted');
                }
            };
            updateCounter();
        });
    }

    // --- BOTÃO VOLTAR AO TOPO ---
    const backToTopBtn = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.style.display = "flex";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// --- CALCULADORA DE ENERGIA (JOULES) ---
function calcularEnergia() {
    const fps = parseFloat(document.getElementById("calc-fps").value);
    const weight = parseFloat(document.getElementById("calc-weight").value);
    const resultBox = document.getElementById("calc-result");

    if (!fps || fps <= 0) {
        resultBox.innerText = "Por favor, insira um FPS válido.";
        return;
    }

    // Conversão de FPS para Metros por Segundo (m/s)
    const mps = fps * 0.3048;
    // Cálculo da Energia Cinética: E = 0.5 * m * v^2 (Massa em Kg)
    const massKg = weight / 1000;
    const joules = 0.5 * massKg * Math.pow(mps, 2);

    resultBox.innerHTML = `Energia Resultante: <strong>${joules.toFixed(2)} Joules</strong> (${mps.toFixed(1)} m/s)`;
}

// --- COMPARADOR DINÂMICO (NOVO VS USADO) ---
function compararEquipamentos() {
    const select = document.getElementById("compare-select");
    const resultBox = document.getElementById("compare-result");

    const dados = {
        novo: `
            <h5 style="color: #556B2F; margin-bottom: 8px;"><i class="fa-solid fa-star"></i> Vantagens do Equipamento Novo</h5>
            <ul>
                <li>Garantia de fábrica inclusa de até 3 ou 6 meses.</li>
                <li>Internas sem nenhum tipo de desgaste mecânico prematuro.</li>
                <li><strong>Investimento:</strong> Alto custo inicial, sem depreciação de uso prévio.</li>
            </ul>
        `,
        usado: `
            <h5 style="color: #556B2F; margin-bottom: 8px;"><i class="fa-solid fa-handshake"></i> Vantagens do Equipamento Usado</h5>
            <ul>
                <li>Economia real que varia de <strong>30% a 50%</strong> do valor de mercado.</li>
                <li>Frequentemente já acompanham upgrades montados (Ex: Cano de precisão, Bucking).</li>
                <li><strong>Investimento:</strong> Baixo custo, excelente para quem está iniciando no esporte.</li>
            </ul>
        `
    };

    if (select.value && dados[select.value]) {
        resultBox.innerHTML = dados[select.value];
    } else {
        resultBox.innerHTML = '<p class="placeholder-text">Selecione uma opção acima para visualizar o comparativo dinâmico.</p>';
    }
}
