const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    class Firework {
        constructor(x, y) {
            this.particles = [];
            const colors = ["#ff0043", "#14fc56", "#1e90ff", "#f4d03f", "#9b59b6"];

            for (let i = 0; i < 80; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5 + 1;
                this.particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    alpha: 1,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        }

        update() {
            this.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.02;
                p.alpha -= 0.015;
            });
        }

        draw() {
            this.particles.forEach(p => {
                if (p.alpha <= 0) return;
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        }

        finished() {
            return this.particles.every(p => p.alpha <= 0);
        }
    }

    const fireworks = [];

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.05) {
            fireworks.push(
                new Firework(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height * 0.6
                )
            );
        }

        fireworks.forEach((fw, i) => {
            fw.update();
            fw.draw();
            if (fw.finished()) fireworks.splice(i, 1);
        });

        requestAnimationFrame(loop);
    }

    loop();

    const trigger = document.getElementById("trigger");
    const egg = document.getElementById("easterEgg");
    const mensajeSecreto = document.getElementById("mensajeSecreto");

    const musica = document.getElementById("music");
    let musicaIniciada = false;
    let mostrado = false;

    trigger.addEventListener("click", () => {
        mostrado = !mostrado;
        egg.classList.toggle("visible", mostrado);

        if (mostrado && !musicaIniciada) {
            musica.volume = 0.5;
            musica.play().catch(() => {});
            musicaIniciada = true;
        }

        if (!mostrado) {
            mensajeSecreto.classList.remove("visible");
            claveBox.classList.remove("visible");
            cartaBtn.classList.remove("visible");
        }
    });

    const cartaBtn = document.getElementById("cartaBtn");
    const claveBox = document.getElementById("claveBox");

    egg.addEventListener("click", () => {
    const visible = mensajeSecreto.classList.toggle("visible");
    cartaBtn.classList.toggle("visible", visible);

    if (!visible) {
        claveBox.classList.remove("visible");
    }
    });

    cartaBtn.addEventListener("click", () => {
    claveBox.classList.toggle("visible");
    });

    // Validar clave
    claveEnviar.addEventListener("click", () => {
        if (claveInput.value === "2026") {
            window.location.href = "Flowers.html";
        } else {
            claveInput.value = "";
            claveInput.placeholder = "Clave incorrecta";
        }
    });

    // Enter también valida
    claveInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            claveEnviar.click();
        }
    });


