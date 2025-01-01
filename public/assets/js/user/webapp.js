const installContainer = document.getElementById('install-container');
const installButton = document.getElementById('install-button');
const installMessage = document.getElementById('install-message');
let deferredPrompt;

// Detecta dispositivos iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Detecta dispositivos Android
const isAndroid = /Android/.test(navigator.userAgent);

// Função para mostrar banner de instalação
function showInstallBanner() {
    // Verifica se o aplicativo está no modo standalone (instalado)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (isStandalone) {
        // Não exibe o banner se o app já está instalado
        return;
    }

    // Verifica se o dispositivo é iOS ou Android
    if (isIOS || isAndroid) {
        installContainer.style.display = 'block';
    }

    if (isIOS) {
        // Instruções específicas para iOS
        installMessage.innerHTML = 'Para instalar, toque no botão de compartilhamento e selecione "Adicionar à Tela de Início"';
    }
}

// Evento para Android (beforeinstallprompt)
window.addEventListener('beforeinstallprompt', (e) => {
    // Previne comportamento padrão
    e.preventDefault();
    
    // Armazena o evento
    deferredPrompt = e;
    
    // Mostra banner de instalação
    showInstallBanner();
});

// Listener para botão de instalação
installButton.addEventListener('click', async () => {
    if (isAndroid && deferredPrompt) {
        try {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === 'accepted') {
                console.log('Usuário aceitou a instalação');
            } else {
                console.log('Usuário rejeitou a instalação');
            }

            // Limpa o deferredPrompt e esconde o banner
            deferredPrompt = null;
            installContainer.style.display = 'none';
        } catch (error) {
            console.error('Erro ao mostrar prompt de instalação:', error);
        }
    }
});


// Evento quando app é instalado
window.addEventListener('appinstalled', () => {
    console.log('App instalado com sucesso');
    // Esconde o banner
    installContainer.style.display = 'none';

    // Opcional: Limpa o deferredPrompt
    deferredPrompt = null;
});

// Chama função ao carregar a página
window.addEventListener('load', showInstallBanner);