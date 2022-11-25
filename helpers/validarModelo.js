const existeModelo = async (valor, campo, Modelo,) => {
    let obj = {}
    Object.defineProperty(obj, campo, {
        value: valor,
        writable: true,
        enumerable: true,
        configurable: true
    });

    const existeModelo = await Modelo.findOne(obj)
    if (existeModelo) {
        throw new Error(`El campo ${campo} : ${valor} , existe en la base de datos`);
    }

}
const noexisteModelo = async (valor, campo, Modelo) => {
    let obj = {}
    Object.defineProperty(obj, campo, {
        value: valor,
        writable: true,
        enumerable: true,
        configurable: true
    });
    const modeloDB = await Modelo.findOne(obj)
    if (!modeloDB) {
        throw new Error(`El valor ${campo} : ${valor} , no existe en la base de datos`);
    }
}
module.exports = {
    existeModelo,
    noexisteModelo
}