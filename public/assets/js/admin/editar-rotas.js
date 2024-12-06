// Muda para adicionar uma variação em uma rota já existente
const btn_AddRota_AddVariacao = document.getElementById('addRota-addVariacao');
const div_addVariacao = document.querySelector('.addVariacao');
const div_addRota = document.querySelector('.addRota')

btn_AddRota_AddVariacao.addEventListener('change', () => {
    if (btn_AddRota_AddVariacao.checked) {
        div_addRota.hidden = true; 
        div_addVariacao.hidden = false; 
    } else {
        div_addRota.hidden = false; 
        div_addVariacao.hidden = true; 
    }
});



