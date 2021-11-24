export function formatarCep(cep){
    cep = cep.replace(/\D/g, '');
    if (cep.length > 8) {
      cep = cep.substring(0, 8);
    }

    switch(cep.length){
        case 6:
        case 7:
        case 8:
            cep = cep.replace(/(\d{5})(.*)/, '$1-$2')
            break;
        default:
            break;
    }
    return cep;
}