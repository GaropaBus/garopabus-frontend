import * as apiGet from '../api/get.js';

document.addEventListener('DOMContentLoaded', async () => {
    const lista_aviso = document.getElementById('lista-avisos');
    if (!lista_aviso) {
        console.error("Elemento 'lista-avisos' não encontrado.");
        return;
    }

    lista_aviso.textContent = '';

    const avisos = await apiGet.getAvisos().catch((error) => {
        console.error("Erro ao buscar avisos:", error);
        return [];
    });

    for (const aviso_element of avisos) {
        const aviso = document.createElement('div');
        aviso.classList.add('aviso');

        const info_circle = document.createElement('div');
        const i_fainfo = document.createElement('i');
        i_fainfo.classList.add('fa-solid', 'fa-info', 'fa-fw');
        info_circle.appendChild(i_fainfo);
        info_circle.classList.add('info-circle');

        aviso.appendChild(info_circle);

        const aviso_information = document.createElement('div');
        aviso_information.classList.add('aviso-information');
        const h3_title = document.createElement('h3');
        h3_title.textContent = aviso_element.title;
        const p_desc = document.createElement('p');
        p_desc.textContent = aviso_element.desc;

        aviso_information.appendChild(h3_title);
        aviso_information.appendChild(p_desc);

        aviso.appendChild(aviso_information);

        lista_aviso.appendChild(aviso);
    }
});
