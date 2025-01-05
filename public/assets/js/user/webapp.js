const installContainer = document.getElementById('install-container');
const installButton = document.getElementById('install-button');
const installMessage = document.getElementById('install-message');

// Botão para fechar o banner
const closeButton = document.createElement('button');
closeButton.textContent = 'Fechar';
closeButton.style = 'background-color: #ccc; color: black; border: none; padding: 8px 15px; margin-left: 10px;';
installContainer.appendChild(closeButton);

let deferredPrompt;

// Detecta dispositivos iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Detecta dispositivos Android
const isAndroid = /Android/.test(navigator.userAgent);

// Função para mostrar banner de instalação
function showInstallBanner() {
    // Verifica se o app está rodando no modo standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    // Verifica se já foi instalado (ou rejeitado) anteriormente
    const isInstalled = localStorage.getItem('isAppInstalled') === 'true';

    if (isStandalone || isInstalled) {
        // Não exibe o banner se o app já está instalado ou rodando como PWA
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
    if (isIOS) {
        // Para iOS, apenas esconde o banner
        installContainer.style.display = 'none';
        localStorage.setItem('isAppInstalled', 'true');
    } else if (isAndroid && deferredPrompt) {
        try {
            // Mostra o prompt de instalação
            await deferredPrompt.prompt();

            // Espera a escolha do usuário
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === 'accepted') {
                console.log('Usuário aceitou a instalação');
                localStorage.setItem('isAppInstalled', 'true');
            } else {
                console.log('Usuário rejeitou a instalação');
                localStorage.setItem('isAppInstalled', 'false'); // Para evitar exibição constante
            }

            // Limpa o deferredPrompt e esconde o banner
            deferredPrompt = null;
            installContainer.style.display = 'none';
        } catch (error) {
            console.error('Erro ao mostrar prompt de instalação:', error);
        }
    }
});

// Listener para o botão de fechar
closeButton.addEventListener('click', () => {
    // Esconde o banner temporariamente
    installContainer.style.display = 'none';
    sessionStorage.setItem('installBannerHidden', 'true');
});

// Evento quando app é instalado
window.addEventListener('appinstalled', () => {
    console.log('App instalado com sucesso');
    localStorage.setItem('isAppInstalled', 'true');
    installContainer.style.display = 'none';
});

// Chama função ao carregar a página
window.addEventListener('load', showInstallBanner);