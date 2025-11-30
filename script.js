const video = document.getElementById("camera");

// Função para preencher o quadrado com animação
function preencherPosicao(pos, char) {
    const id = "s" + pos;
    const square = document.getElementById(id);
    if (square) {
        square.textContent = char;

        // Adiciona animação
        square.classList.add("filled");
        setTimeout(() => {
            square.classList.remove("filled");
        }, 500);
    }
}

// Inicia a câmera e o leitor de QR
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        video.srcObject = stream;

        const scanner = new QrScanner(video, result => {
            console.log("QR detectado:", result.data);

            // Espera QR no formato "1:D"
            if (result.data.includes(":")) {
                const [posStr, char] = result.data.split(":");
                const pos = parseInt(posStr);
                if (pos >= 1 && pos <= 5 && char.length > 0) {
                    preencherPosicao(pos, char);
                }
            }
        });

        scanner.start();

    } catch (error) {
        alert("Erro ao acessar câmera: " + error);
    }
}

startCamera();