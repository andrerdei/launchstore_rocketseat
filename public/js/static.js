// Funções Criadas Para Manipular Elementos do HTML Dinamicamente

function changeTextAreaSpanText(textArea, textAreaSpan, maxAcceptableChars){
    const targetTextArea = document.querySelector(`.${textArea}`)
    const targetSpan = document.querySelector(`.${textAreaSpan}`)
    const charCount = targetTextArea.value.length

    charCount <= maxAcceptableChars
        ? targetSpan.innerHTML = `Restam ${maxAcceptableChars - charCount} do total de ${maxAcceptableChars} caracteres`
        : targetSpan.innerHTML = `Você ultrapassou o limite de ${maxAcceptableChars} caracteres`
 
    if (charCount <= 0) {
        targetSpan.innerHTML = "A descrição do produto é opcional"
    }
}

function monetaryBRLMask(selectedInputClass){
    const targetInput = document.querySelector(`.${selectedInputClass}`)
    const regex = new RegExp("^[\\d]{1,6}([,][\\d]{0,2})?$", "g")

    if(regex.test(targetInput.value)){
        const rawPrice = targetInput.value.replace(",", ".")

        const formattedPrice = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }).format(rawPrice)
        
        targetInput.value = formattedPrice

        return
    }

    targetInput.value = ""
}

function textToNumberMask(selectedInputClass){
    const targetInput = document.querySelector(`.${selectedInputClass}`)
    const regex = new RegExp("^[\\d]{1,6}$", "g")

    if(regex.test(targetInput.value)){

        return
    }

    targetInput.value = ""
}

function toggleDeleteModalClasses() {
    const modal = document.querySelector('#modal-delete')
    const confirmationText = document.querySelector('.confirmation-text p')
    const buttons = document.querySelectorAll('.buttons-div button')

    modal.classList.toggle('show-modal')
    confirmationText.classList.toggle('show-modal-confirmation-text')

    buttons.forEach((button) => {
        button.classList.toggle('show-modal-buttons')
    })
}