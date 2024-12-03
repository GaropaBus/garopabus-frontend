import * as apiGet from '../api/moldes_back/get.js';
import * as util from './util.js';


const rotas = apiGet.getRotasList()



const getCoordenadas = () => {
    const inp_coordenada = document.getElementById('coordenada')
    let coord = inp_coordenada.value

    if(util.isCoordinate(coord)){
        
    }
}