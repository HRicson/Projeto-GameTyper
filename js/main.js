let tempoInicial = $("#tempo-digitacao").text()
let campo = $(".campo-digitacao")

$(function () {
    atualizaTamanhoFrase()
    inicializaContadores()
    inicializaCronometro()
    inicializaMarcadores()
    $("#botao-reiniciar").click(reiniciaJogo)
})

function atualizaTamanhoFrase() {
    let frase = $(".frase").text()
    let numeroPalavras = frase.split(" ").length
    let tamanhoFrase = $("#tamanho-frase")
    tamanhoFrase.text(numeroPalavras)
}

function inicializaContadores() {
    campo.on("input", function () {
        let conteudo = campo.val()
        let qtdPalavras = conteudo.split(/\S+/).length - 1
        $("#contador-palavras").text(qtdPalavras)
        let qtdCaracteres = conteudo.length
        $("#contador-caracteres").text(qtdCaracteres)
    })
}

function inicializaCronometro() {
    let tempoRestante = $("#tempo-digitacao").text()
    $("#botao-reiniciar").hide()
    campo.one("focus", function () {
        let cronometroID = setInterval(function () {
            if (tempoRestante > 0) {
                tempoRestante--
                $("#tempo-digitacao").text(tempoRestante)
            } else if (tempoRestante == 0) {
                clearInterval(cronometroID)
                finalizaJogo()
            }
        }, tempoInicial * 100)
    })
}


function finalizaJogo() {
    $("#botao-reiniciar").show()
    campo.attr("disabled", true)
    campo.toggleClass("campo-desativado")
    inserePlacar()
}

function inicializaMarcadores() {
    let frase = $(".frase").text()
    campo.on("input", function () {
        let digitado = campo.val()
        let comparavel = frase.substr(0, digitado.length)
        if (digitado == comparavel) {
            campo.addClass("borda-correto")
            campo.removeClass("borda-errado")
        } else {
            campo.addClass("borda-errado")
            campo.removeClass("borda-correto")
        }
    })
}

function reiniciaJogo() {
    campo.attr("disabled", false)
    campo.val("")
    $("#contador-palavras").text("0")
    $("#contador-caracteres").text("0")
    $("#tempo-digitacao").text(tempoInicial)
    inicializaCronometro()
    inicializaContadores()
    campo.toggleClass("campo-desativado")
    campo.removeClass("borda-errado borda-correto")
}