var swal = document.createElement('script');
swal.setAttribute('src', '//cdn.jsdelivr.net/npm/sweetalert2@11');
document.head.appendChild(swal);

var url = () => window.location;

var regex = target => {
    return "https:\/\/.*\.jusbrasil.com.br\/" + target + "\/[0-9]*\/.*"
};

var modalAlerts = {
    success: {
        title: "<strong>Copiado com sucesso!</strong>",
        imageUrl: 'https://raw.githubusercontent.com/heraclitothiago/juscopy/main/assets/download.png',
        imageWidth: 180,
        width: 600,
        showConfirmButton: false,
        html: `Fortaleça nossa causa 💪
<br> Doe-nos 💸 qualquer quantia ☕ e incentive o desenvolvimento de facilidades que o beneficiarão sempre 🤩
<br><b>Pix</b> dradvloper@gmail.com`
    },
    fail: {
        title: "<strong>Ooops!</strong>",
        icon: 'error',
        showConfirmButton: false,
        html: `Parece que você não está no ambiente correto
<br>Tente acessar as páginas de Jurisprudência ou de Modelos de Peças no Jusbrasil
<br>Acesse a página da documentação <a href="https://github.com/heraclitothiago/juscopy">Juscopy</a>`
    }
}

var commonSel = {
    modeloPecas: "#app-root > div > div.WithMetricsDispatcher > div > div > div.DocumentPage-card > div > div.DocumentPage-navbar-wrapper > div > div > div > div.DocumentActionsCard-actions",
    jurisprudencia: "#app-root > div > div.portal-container > div > span > div > div.modal-dialog.modal-dialog-full > div > div.modal-",
    processos: "#app-root > div > div.WithMetricsDispatcher > div > div.MotionPage-card.card > div > div > div."
}

function juscopyBtn(father) {
    //Cria um botão novo
    var btnJuscopy = document.createElement('a')
    btnJuscopy.classList.add('btn')
    btnJuscopy.classList.add('btn--orange')
    btnJuscopy.setAttribute("onclick", "disableModal()")
    btnJuscopy.innerText = "Copiar com Juscopy"
    //adiciona o ícone ao botão
    var icon = document.createElement('span');
    icon.classList.add('icon');
    icon.classList.add('icon-content-copy');
    btnJuscopy.appendChild(icon)
    divToAppend = document.querySelector(father)
    divToAppend.appendChild(btnJuscopy)
}

if (url().href.match(regex('modelos-pecas'))) {
    //Remove os botões download e copiar da jurisprudência
    var removeBtn = id => {
        var btn = document.querySelector(commonSel.modeloPecas + ` > div:nth-child(${id})`)
        btn.remove()
    }
    removeBtn(1)
    removeBtn(1)

    juscopyBtn(commonSel.modeloPecas);

    function data() {
        return {
            selector: '#app-root > div > div.WithMetricsDispatcher > div > div > div.DocumentPage-card > div > div.unprintable',
            alert: modalAlerts.success
        }
    }

} else if (url().href.match(regex('processos'))) {
    var btnRemove = document.querySelector(commonSel.processos + "MotionPage-toolBar > div > div > div > div > div.ToolBarBase-leftActions > button");
    btnRemove.remove();
    juscopyBtn(commonSel.processos + "MotionPage-toolBar > div > div > div > div > div.ToolBarBase-leftActions");

    function data() {
        return {
            selector: commonSel.processos + 'unprintable'
        }
    }
} else if (url().href.match(regex('jurisprudencia'))) {
    try {
        var btn = document.querySelector("#app-root > div > div.WithMetricsDispatcher > div > div > div.DocumentPage-main.col-md-8.card > div:nth-child(1) > div > div.DocumentPage-tools > div > div > div > div.ToolBarBase-leftActions > button");
        btn.click()
    } catch (e) { }

    var btnEmenta = document.querySelector(commonSel.jurisprudencia + "footer.CopyContentModal-footer > button.CopyContentModal-copyButton.btn.btn--md.btn--blue");
    btnEmenta.remove()


    juscopyBtn(commonSel.jurisprudencia + "footer.CopyContentModal-footer")

    function data() {
        return {
            selector: commonSel.jurisprudencia + "body > div"
        }
    }

} else {
    throw new console.error("Você não está no ambiente correto do jusbrasil");
}

var disableModal = () => {
    var peticao = document.querySelector(data().selector).innerText
    //Copia para a área de transferência
    navigator.clipboard.writeText(peticao)
    Swal.fire(modalAlerts.success)
    scroll(0, 0)
    try {
        //fecha a modal no caso de jurisprudência
        var btnFechar = document.querySelector(commonSel.jurisprudencia + "footer.CopyContentModal-footer > button");
        btnFechar.click()
    } catch (e) { }
}
