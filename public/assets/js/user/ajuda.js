import * as apiGet from '../api/get.js';

const avisos = await apiGet.getAvisos()

document.addEventListener('DOMContentLoaded', () => {
    const lista_aviso = document.getElementById('lista-avisos')
    lista_aviso.textContent = ''
    for (const aviso_element of avisos) {
        const aviso = document.createElement('div')
        aviso.classList.add('aviso')

        const info_circle = document.createElement('div')
        const i_fainfo = document.createElement('i')
        i_fainfo.classList.add('fa-solid', 'fa-info', 'fa-fw')
        info_circle.appendChild(i_fainfo)
        info_circle.classList.add('info-circle')

        aviso.appendChild(info_circle);

        const aviso_information = document.createElement('div')
        aviso_information.classList.add('aviso-information')
        const h3_title = document.createElement('h3')
        h3_title.textContent = aviso_element.title
        const p_desc = document.createElement('p')
        p_desc.textContent = aviso_element.desc

        aviso_information.appendChild(h3_title)
        aviso_information.appendChild(p_desc)

        aviso.appendChild(aviso_information)

        lista_aviso.appendChild(aviso)
    }
})