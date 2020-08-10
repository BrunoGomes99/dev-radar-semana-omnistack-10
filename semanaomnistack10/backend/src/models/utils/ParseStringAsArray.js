// Segue os ensinamentos do DRY (Dont Repeat Yourself), que visa não repetir trechos de código que são usados em várias partes do projeto

module.exports = function parseStringAsArray(arrayAsString) {
     // Percorre a string de tecnologias, separando por vírgula e removendo o espaçamento antes ou depois de cada string (trim)
    return arrayAsString.split(',').map(tech => tech.trim());
}