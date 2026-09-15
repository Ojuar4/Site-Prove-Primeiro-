/* =========================================
   PROVE PRIMEIRO — script.js
   ========================================= */

/* -----------------------------------------
   CONFIGURAÇÃO DA LOJINHA
   ⚠️ TROQUE OS VALORES ABAIXO PELOS REAIS DO BLOCO
   ----------------------------------------- */

const LOJA_CONFIG = {
  chavePix: "proveprimeiro@financeiro.com.br", // TROQUE pela chave Pix real do bloco (e-mail, CPF/CNPJ, telefone ou chave aleatória)
  nomeRecebedor: "PROVE PRIMEIRO",              // nome do recebedor (sem acento, até 25 caracteres)
  cidade: "BELO HORIZONTE",                     // cidade do recebedor (sem acento, até 15 caracteres)
  whatsapp: "5531999999999",                    // TROQUE pelo WhatsApp real, com DDI 55 + DDD + número, só números
  precos: {
    abada: 90.0,
    kit: 130.0,
  },
  tamanhos: ["PP", "P", "M", "G", "GG", "XG"],
  fotos: [
    "imagens/abada1.jpg",
    "imagens/abada2.jpg",
    "imagens/abada3.jpg",
    "imagens/kit.jpg",
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  criarConfetes();
  configurarMenuMobile();
  configurarDestaqueDeSecao();
  configurarContagemRegressiva();
  configurarBotaoTopo();
  configurarRevelacaoDeSecoes();
  configurarLojinha();
});


/* -----------------------------------------
   CONFETES CAINDO NO FUNDO
   ----------------------------------------- */

function criarConfetes() {
  const container = document.getElementById("confetes");
  if (!container) return;

  const cores = ["#f2c14e", "#c75c3c", "#90a955", "#4f772d", "#f4e8c1"];
  const total = window.innerWidth < 600 ? 18 : 32;

  for (let i = 0; i < total; i++) {
    const confete = document.createElement("span");
    confete.className = "confete";

    confete.style.left = Math.random() * 100 + "vw";
    confete.style.backgroundColor = cores[i % cores.length];
    confete.style.animationDuration = 6 + Math.random() * 6 + "s";
    confete.style.animationDelay = Math.random() * 8 + "s";
    confete.style.opacity = 0.6 + Math.random() * 0.3;

    // metade dos confetes fica arredondada, como uma "bolinha" de papel picado
    if (i % 2 === 0) {
      confete.style.borderRadius = "50%";
    }

    container.appendChild(confete);
  }
}


/* -----------------------------------------
   MENU MOBILE (HAMBÚRGUER)
   ----------------------------------------- */

function configurarMenuMobile() {
  const botao = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!botao || !links) return;

  botao.addEventListener("click", () => {
    const aberto = links.classList.toggle("aberto");
    botao.classList.toggle("aberto", aberto);
    botao.setAttribute("aria-expanded", aberto);
  });

  // fecha o menu ao clicar em um link (útil no celular)
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("aberto");
      botao.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
    });
  });
}


/* -----------------------------------------
   DESTACA O LINK DA SEÇÃO VISÍVEL NO MENU
   ----------------------------------------- */

function configurarDestaqueDeSecao() {
  const secoes = ["cortejo", "abadas", "sobre"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const linksNav = document.querySelectorAll("[data-nav]");
  if (!secoes.length || !linksNav.length) return;

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          linksNav.forEach((link) => {
            link.classList.toggle(
              "ativo",
              link.getAttribute("href") === "#" + entrada.target.id
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );

  secoes.forEach((secao) => observador.observe(secao));
}


/* -----------------------------------------
   CONTAGEM REGRESSIVA PARA O CORTEJO
   ----------------------------------------- */

function configurarContagemRegressiva() {
  const grade = document.getElementById("contagem");
  if (!grade) return;

  const dataAlvo = new Date(grade.dataset.data).getTime();

  const elDias = document.getElementById("dias");
  const elHoras = document.getElementById("horas");
  const elMinutos = document.getElementById("minutos");
  const elSegundos = document.getElementById("segundos");

  function atualizar() {
    const agora = Date.now();
    const restante = dataAlvo - agora;

    if (restante <= 0) {
      elDias.textContent = "00";
      elHoras.textContent = "00";
      elMinutos.textContent = "00";
      elSegundos.textContent = "00";
      document.querySelector(".contagem-legenda").textContent =
        "A folia já começou! 🎉";
      clearInterval(intervalo);
      return;
    }

    const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((restante / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((restante / (1000 * 60)) % 60);
    const segundos = Math.floor((restante / 1000) % 60);

    elDias.textContent = String(dias).padStart(2, "0");
    elHoras.textContent = String(horas).padStart(2, "0");
    elMinutos.textContent = String(minutos).padStart(2, "0");
    elSegundos.textContent = String(segundos).padStart(2, "0");
  }

  atualizar();
  const intervalo = setInterval(atualizar, 1000);
}


/* -----------------------------------------
   BOTÃO "VOLTAR AO TOPO"
   ----------------------------------------- */

function configurarBotaoTopo() {
  const botao = document.getElementById("topoBtn");
  if (!botao) return;

  window.addEventListener("scroll", () => {
    botao.classList.toggle("visivel", window.scrollY > 500);
  });

  botao.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* -----------------------------------------
   REVELA AS SEÇÕES SUAVEMENTE AO ROLAR
   ----------------------------------------- */

function configurarRevelacaoDeSecoes() {
  const secoes = document.querySelectorAll("main section");
  if (!secoes.length) return;

  secoes.forEach((secao) => secao.classList.add("revelar"));

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  secoes.forEach((secao) => observador.observe(secao));
}


/* -----------------------------------------
   LOJINHA DE ABADÁS
   ----------------------------------------- */

function configurarLojinha() {
  const overlay = document.getElementById("lojaOverlay");
  const abrir = document.getElementById("abrirLoja");
  const fechar = document.getElementById("lojaFechar");
  if (!overlay || !abrir) return;

  const passo1 = document.getElementById("lojaPasso1");
  const passo2 = document.getElementById("lojaPasso2");
  const selectTamanho = document.getElementById("lojaTamanho");
  const inputQuantidade = document.getElementById("lojaQuantidade");
  const inputNome = document.getElementById("lojaNomeComprador");
  const totalTexto = document.getElementById("lojaTotal");
  const totalPagamentoTexto = document.getElementById("lojaTotalPagamento");
  const botaoIrPagamento = document.getElementById("lojaIrPagamento");
  const botaoVoltar = document.getElementById("lojaVoltar");
  const botaoCopiar = document.getElementById("lojaCopiarPix");
  const inputPixCodigo = document.getElementById("lojaPixCodigo");
  const imgQr = document.getElementById("lojaQrCode");
  const linkWhatsapp = document.getElementById("lojaWhatsapp");

  // preenche os preços exibidos ao lado de cada opção
  document.querySelectorAll("[data-preco-de]").forEach((el) => {
    const tipo = el.dataset.precoDe;
    el.textContent = formatarMoeda(LOJA_CONFIG.precos[tipo]);
  });

  // preenche o select de tamanhos
  LOJA_CONFIG.tamanhos.forEach((tamanho) => {
    const opcao = document.createElement("option");
    opcao.value = tamanho;
    opcao.textContent = tamanho;
    selectTamanho.appendChild(opcao);
  });

  // -------- abrir / fechar --------

  function abrirLojinha() {
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    passo1.hidden = false;
    passo2.hidden = true;
    atualizarTotal();
  }

  function fecharLojinha() {
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  abrir.addEventListener("click", abrirLojinha);
  fechar.addEventListener("click", fecharLojinha);
  overlay.addEventListener("click", (evento) => {
    if (evento.target === overlay) fecharLojinha();
  });
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !overlay.hidden) fecharLojinha();
  });

  // -------- cálculo do total --------

  function tipoSelecionado() {
    return document.querySelector('input[name="tipo"]:checked').value;
  }

  function atualizarTotal() {
    const preco = LOJA_CONFIG.precos[tipoSelecionado()];
    const quantidade = Math.max(1, parseInt(inputQuantidade.value) || 1);
    const total = preco * quantidade;
    totalTexto.textContent = formatarMoeda(total);
  }

  document
    .querySelectorAll('input[name="tipo"]')
    .forEach((r) => r.addEventListener("change", atualizarTotal));
  inputQuantidade.addEventListener("input", atualizarTotal);

  // -------- galeria de fotos --------

  configurarGaleria();

  // -------- ir para pagamento --------

  botaoIrPagamento.addEventListener("click", () => {
    const preco = LOJA_CONFIG.precos[tipoSelecionado()];
    const quantidade = Math.max(1, parseInt(inputQuantidade.value) || 1);
    const total = preco * quantidade;

    const payload = montarPayloadPix({
      chave: LOJA_CONFIG.chavePix,
      valor: total,
      nome: LOJA_CONFIG.nomeRecebedor,
      cidade: LOJA_CONFIG.cidade,
      txid: "PROVEPRIM",
    });

    inputPixCodigo.value = payload;
    totalPagamentoTexto.textContent = formatarMoeda(total);
    imgQr.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
      encodeURIComponent(payload);

    const nomeComprador = inputNome.value.trim() || "sem nome informado";
    const tamanho = selectTamanho.value;
    const tipoLegivel = tipoSelecionado() === "kit" ? "Kit abadá + copo" : "Abadá avulso";

    const mensagem =
      `Olá! Acabei de fazer o Pix do meu pedido no Prove Primeiro:\n` +
      `Nome: ${nomeComprador}\n` +
      `Item: ${tipoLegivel}\n` +
      `Tamanho: ${tamanho}\n` +
      `Quantidade: ${quantidade}\n` +
      `Total pago: ${formatarMoeda(total)}\n` +
      `Segue o comprovante em anexo.`;

    linkWhatsapp.href =
      `https://wa.me/${LOJA_CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;

    passo1.hidden = true;
    passo2.hidden = false;
  });

  botaoVoltar.addEventListener("click", () => {
    passo2.hidden = true;
    passo1.hidden = false;
  });

  // -------- copiar código Pix --------

  botaoCopiar.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(inputPixCodigo.value);
      const textoOriginal = botaoCopiar.textContent;
      botaoCopiar.textContent = "Copiado!";
      setTimeout(() => (botaoCopiar.textContent = textoOriginal), 1800);
    } catch (erro) {
      inputPixCodigo.select();
      document.execCommand("copy");
    }
  });
}


function configurarGaleria() {
  const imagem = document.getElementById("lojaFotoAtual");
  const pontosContainer = document.getElementById("lojaGaleriaPontos");
  const botaoAnterior = document.getElementById("lojaFotoAnterior");
  const botaoProxima = document.getElementById("lojaFotoProxima");
  if (!imagem || !pontosContainer) return;

  let indiceAtual = 0;

  LOJA_CONFIG.fotos.forEach((_, i) => {
    const ponto = document.createElement("span");
    if (i === 0) ponto.classList.add("ativo");
    pontosContainer.appendChild(ponto);
  });

  function mostrarFoto(indice) {
    indiceAtual = (indice + LOJA_CONFIG.fotos.length) % LOJA_CONFIG.fotos.length;
    imagem.src = LOJA_CONFIG.fotos[indiceAtual];

    pontosContainer.querySelectorAll("span").forEach((ponto, i) => {
      ponto.classList.toggle("ativo", i === indiceAtual);
    });
  }

  botaoAnterior.addEventListener("click", () => mostrarFoto(indiceAtual - 1));
  botaoProxima.addEventListener("click", () => mostrarFoto(indiceAtual + 1));
}


/* -----------------------------------------
   GERAÇÃO DO CÓDIGO PIX (PADRÃO BR CODE / EMV)
   ----------------------------------------- */

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function campoTlv(id, valor) {
  const tamanho = String(valor.length).padStart(2, "0");
  return id + tamanho + valor;
}

function montarPayloadPix({ chave, valor, nome, cidade, txid }) {
  const gui = campoTlv("00", "br.gov.bcb.pix");
  const chaveCampo = campoTlv("01", chave);
  const infoConta = campoTlv("26", gui + chaveCampo);

  const indicador = campoTlv("00", "01");
  const categoria = campoTlv("52", "0000");
  const moeda = campoTlv("53", "986");
  const valorCampo = valor ? campoTlv("54", valor.toFixed(2)) : "";
  const pais = campoTlv("58", "BR");
  const nomeCampo = campoTlv("59", removerAcentos(nome).substring(0, 25));
  const cidadeCampo = campoTlv("60", removerAcentos(cidade).substring(0, 15));
  const referencia = campoTlv("05", txid || "***");
  const dadosAdicionais = campoTlv("62", referencia);

  const payloadSemCrc =
    indicador +
    infoConta +
    categoria +
    moeda +
    valorCampo +
    pais +
    nomeCampo +
    cidadeCampo +
    dadosAdicionais +
    "6304";

  return payloadSemCrc + calcularCrc16(payloadSemCrc);
}

function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function calcularCrc16(payload) {
  let crc = 0xffff;

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;

    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}
