import * as util from './util.js';
import * as apiPost from '../api/moldes_back/post.js'


const getCoordenadas = async () => {
    const inp_coordenada = document.getElementById('coordenada');
    let coord = inp_coordenada.value;

    if (await util.isCoordinate(coord)) {
        let latitude = parseFloat(coord.split(',')[0].replace(/\s+/g, '')).toFixed(14);
        let longitude = parseFloat(coord.split(',')[1].replace(/\s+/g, '')).toFixed(14);

        return { longitude: longitude, latitude: latitude };
    }
    alert('Coordenada inválida');
    return false;
};


const clear = () => {
    const inp_coordenada = document.getElementById('coordenada')
    inp_coordenada.value = ''
    const link = document.getElementById('link-open-street')
    link.value = ''
}

const add_parada = async () => {
    const coords = await getCoordenadas()
    let link
    if (document.getElementById('link-open-street').value === '') {
        link = null  
    } else {
        link = document.getElementById('link-open-street').value
    }
    
    const enviar = {
        longitude: coords.longitude,
        latitude: coords.latitude,
        link_maps: link,
    }

    await apiPost.postPontoOnibus(enviar)
    clear()
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('submit').addEventListener('click', async event => {
        event.preventDefault()
        await add_parada()
    })
})