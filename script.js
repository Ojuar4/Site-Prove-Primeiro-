// ============================================================
// PROVE PRIMEIRO - SCRIPT PRINCIPAL
// ============================================================

// ============================================================
// CONFIGURAÇÕES DA LOJA
// ============================================================

const LOJA_CONFIG = {
  chavePix: "31998360024",
  nomeRecebedor: "Gabriel S Araujo",
  cidade: "BELO HORIZONTE",

  whatsapp: "5531998360024",

  // COLE AQUI A URL DO SEU GOOGLE APPS SCRIPT /exec
  planilhaWebhookUrl: "https://script.google.com/macros/s/AKfycbwWgk1JS7NF2LNVoPhqWRcn24uBem4IXWkL2GLmApIlipldESD6BcZK_TOkwMQ8AM7dKA/exec",

  precos: {
    abada: 35.0,
    kit: 55.0,
    copo: 30.0,
  },

  tamanhos: ["PP", "P", "M", "G", "GG", "XG"],

  fotos: [
    "imagens/abada1.jpg",
    "imagens/abada2.jpg",
    "imagens/abada3.jpg",
    "imagens/kit.jpg",
  ],
};


// ============================================================
// QUANDO A PÁGINA CARREGAR
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  criarConfetes();
  configurarMenuMobile();
  configurarDestaqueDeSecao();
  configurarContagemRegressiva();
  configurarBotaoTopo();
  configurarRevelacaoDeSecoes();
  configurarAbasRecordacoes();
  configurarLojinha();
});


// ============================================================
// CONFETES
// ============================================================

function criarConfetes() {
  const container = document.querySelector("#confetes");

  if (!container) return;

  const cores = [
    "#F2C14E",
    "#C75C3C",
    "#90A955",
    "#2EC4B6",
    "#E8577A",
    "#F2843A",
  ];

  const quantidade = 35;

  for (let i = 0; i < quantidade; i++) {
    const confete = document.createElement("span");

    confete.className = "confete";

    confete.style.left = `${Math.random() * 100}%`;
    confete.style.backgroundColor =
      cores[Math.floor(Math.random() * cores.length)];

    confete.style.animationDuration =
      `${5 + Math.random() * 7}s`;

    confete.style.animationDelay =
      `${Math.random() * 5}s`;

    confete.style.opacity =
      `${0.4 + Math.random() * 0.6}`;

    confete.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    if (i % 2 === 0) {
      confete.style.borderRadius = "50%";
    }

    container.appendChild(confete);
  }
}


// ============================================================
// MENU MOBILE
// ============================================================

function configurarMenuMobile() {
  const botao = document.querySelector("#navToggle");
  const menu = document.querySelector("#navLinks");

  if (!botao || !menu) return;

  botao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");

    botao.setAttribute("aria-expanded", aberto);
  });

  const links = menu.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
    });
  });
}


// ============================================================
// DESTAQUE DO MENU CONFORME A SEÇÃO
// ============================================================

function configurarDestaqueDeSecao() {
  const secoes = document.querySelectorAll(
    "#cortejo, #abadas, #sobre"
  );

  const links = document.querySelectorAll("[data-nav]");

  if (!secoes.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => {
          link.classList.remove("ativo");
        });

        const linkAtivo = document.querySelector(
          `[data-nav="${entry.target.id}"]`
        );

        if (linkAtivo) {
          linkAtivo.classList.add("ativo");
        }
      });
    },
    {
      threshold: 0.35,
    }
  );

  secoes.forEach((secao) => observer.observe(secao));
}


// ============================================================
// CONTAGEM REGRESSIVA
// ============================================================

function configurarContagemRegressiva() {
  const contador = document.querySelector("#contagem");

  if (!contador) return;

  const dataTexto = contador.dataset.data;

  if (!dataTexto) return;

  const dataFinal = new Date(dataTexto).getTime();

  if (Number.isNaN(dataFinal)) {
    console.warn("Data da contagem regressiva inválida.");
    return;
  }

  const dias = document.querySelector("#dias");
  const horas = document.querySelector("#horas");
  const minutos = document.querySelector("#minutos");
  const segundos = document.querySelector("#segundos");

  const legenda = document.querySelector(".contagem-legenda");

  if (!dias || !horas || !minutos || !segundos) return;

  let intervalo = null;

  function atualizar() {
    const agora = Date.now();
    const restante = dataFinal - agora;

    if (restante <= 0) {
      dias.textContent = "00";
      horas.textContent = "00";
      minutos.textContent = "00";
      segundos.textContent = "00";

      if (legenda) {
        legenda.textContent = "O Carnaval começou!";
      }

      if (intervalo) {
        clearInterval(intervalo);
      }

      return;
    }

    const totalSegundos = Math.floor(restante / 1000);

    const quantidadeDias = Math.floor(
      totalSegundos / 86400
    );

    const quantidadeHoras = Math.floor(
      (totalSegundos % 86400) / 3600
    );

    const quantidadeMinutos = Math.floor(
      (totalSegundos % 3600) / 60
    );

    const quantidadeSegundos =
      totalSegundos % 60;

    dias.textContent =
      String(quantidadeDias).padStart(2, "0");

    horas.textContent =
      String(quantidadeHoras).padStart(2, "0");

    minutos.textContent =
      String(quantidadeMinutos).padStart(2, "0");

    segundos.textContent =
      String(quantidadeSegundos).padStart(2, "0");
  }

  atualizar();

  intervalo = setInterval(atualizar, 1000);
}


// ============================================================
// BOTÃO VOLTAR AO TOPO
// ============================================================

function configurarBotaoTopo() {
  const botao = document.querySelector("#topoBtn");

  if (!botao) return;

  function verificarScroll() {
    if (window.scrollY > 500) {
      botao.classList.add("visivel");
    } else {
      botao.classList.remove("visivel");
    }
  }

  window.addEventListener("scroll", verificarScroll);

  verificarScroll();

  botao.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}


// ============================================================
// REVELAÇÃO DAS SEÇÕES
// ============================================================

function configurarRevelacaoDeSecoes() {
  const secoes = document.querySelectorAll("main section");

  if (!secoes.length) return;

  secoes.forEach((secao) => {
    secao.classList.add("revelar");
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visivel");

        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
    }
  );

  secoes.forEach((secao) => observer.observe(secao));
}


// ============================================================
// ABAS DE RECORDAÇÕES
// ============================================================

function configurarAbasRecordacoes() {
  const abas = document.querySelectorAll(".recordacoes-aba");
  const paineis = document.querySelectorAll(
    ".recordacoes-painel"
  );

  if (!abas.length || !paineis.length) return;

  function ativarAba(aba) {
    const ano = aba.dataset.ano;

    if (!ano) return;

    abas.forEach((item) => {
      const ativa = item === aba;

      item.classList.toggle("ativa", ativa);
      item.setAttribute("aria-selected", ativa);
      item.tabIndex = ativa ? 0 : -1;
    });

    paineis.forEach((painel) => {
      painel.hidden =
        painel.id !== `painel-${ano}`;
    });
  }

  abas.forEach((aba) => {
    aba.addEventListener("click", () => {
      ativarAba(aba);
    });

    aba.addEventListener("keydown", (evento) => {
      if (
        evento.key !== "ArrowLeft" &&
        evento.key !== "ArrowRight"
      ) {
        return;
      }

      evento.preventDefault();

      const listaAbas = [...abas];

      const indiceAtual =
        listaAbas.indexOf(aba);

      let novoIndice;

      if (evento.key === "ArrowRight") {
        novoIndice =
          (indiceAtual + 1) % listaAbas.length;
      } else {
        novoIndice =
          (indiceAtual - 1 + listaAbas.length) %
          listaAbas.length;
      }

      listaAbas[novoIndice].focus();

      ativarAba(listaAbas[novoIndice]);
    });
  });
}


// ============================================================
// LOJINHA
// ============================================================

function configurarLojinha() {
  const overlay =
    document.querySelector("#lojaOverlay");

  const botaoAbrir =
    document.querySelector("#abrirLoja");

  const botaoFechar =
    document.querySelector("#lojaFechar");

  const passo1 =
    document.querySelector("#lojaPasso1");

  const passo2 =
    document.querySelector("#lojaPasso2");

  const tamanhos =
    document.querySelector("#lojaTamanhos");

  const quantidade =
    document.querySelector("#lojaQuantidade");

  const nomeComprador =
    document.querySelector("#lojaNomeComprador");

  const total =
    document.querySelector("#lojaTotal");

  const totalPagamento =
    document.querySelector("#lojaTotalPagamento");

  const botaoPagamento =
    document.querySelector("#lojaIrPagamento");

  const botaoVoltar =
    document.querySelector("#lojaVoltar");

  const botaoCopiarPix =
    document.querySelector("#lojaCopiarPix");

  const pixCodigo =
    document.querySelector("#lojaPixCodigo");

  const qrCode =
    document.querySelector("#lojaQrCode");

  const whatsapp =
    document.querySelector("#lojaWhatsapp");

  if (!overlay || !botaoAbrir) return;

  let idPedidoAtual = null;

  // ----------------------------------------------------------
  // PREÇOS
  // ----------------------------------------------------------

  document
    .querySelectorAll("[data-preco-de]")
    .forEach((elemento) => {
      const tipo = elemento.dataset.precoDe;

      if (LOJA_CONFIG.precos[tipo] !== undefined) {
        elemento.textContent =
          formatarMoeda(LOJA_CONFIG.precos[tipo]);
      }
    });

  // ----------------------------------------------------------
  // ABRIR LOJA
  // ----------------------------------------------------------

  function abrirLoja() {
    overlay.hidden = false;

    document.body.style.overflow = "hidden";

    atualizarTotal();
    renderizarTamanhos();
  }

  // ----------------------------------------------------------
  // FECHAR LOJA
  // ----------------------------------------------------------

  function fecharLoja() {
    overlay.hidden = true;

    document.body.style.overflow = "";

    if (passo1) passo1.hidden = false;
    if (passo2) passo2.hidden = true;
  }

  botaoAbrir.addEventListener("click", abrirLoja);

  if (botaoFechar) {
    botaoFechar.addEventListener(
      "click",
      fecharLoja
    );
  }

  overlay.addEventListener("click", (evento) => {
    if (evento.target === overlay) {
      fecharLoja();
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (
      evento.key === "Escape" &&
      !overlay.hidden
    ) {
      fecharLoja();
    }
  });

  // ----------------------------------------------------------
  // TIPO DO PRODUTO
  // ----------------------------------------------------------

  function tipoSelecionado() {
    const selecionado =
      document.querySelector(
        'input[name="tipo"]:checked'
      );

    return selecionado
      ? selecionado.value
      : "abada";
  }

  // ----------------------------------------------------------
  // TOTAL
  // ----------------------------------------------------------

  function atualizarTotal() {
    const tipo = tipoSelecionado();

    const qtd = quantidade
      ? Math.max(
          1,
          parseInt(quantidade.value, 10) || 1
        )
      : 1;

    const preco =
      LOJA_CONFIG.precos[tipo] || 0;

    const valorTotal = preco * qtd;

    if (total) {
      total.textContent =
        formatarMoeda(valorTotal);
    }

    if (totalPagamento) {
      totalPagamento.textContent =
        formatarMoeda(valorTotal);
    }

    renderizarTamanhos();
  }

  document
    .querySelectorAll('input[name="tipo"]')
    .forEach((radio) => {
      radio.addEventListener(
        "change",
        atualizarTotal
      );
    });

  if (quantidade) {
    quantidade.addEventListener(
      "input",
      atualizarTotal
    );

    quantidade.addEventListener(
      "change",
      atualizarTotal
    );
  }

  // ----------------------------------------------------------
  // TAMANHOS
  // ----------------------------------------------------------

  function renderizarTamanhos() {
    if (!tamanhos) return;

    const qtd = quantidade
      ? Math.max(
          1,
          parseInt(quantidade.value, 10) || 1
        )
      : 1;

    const valoresAntigos =
      obterTamanhosEscolhidos();

    tamanhos.innerHTML = "";

    for (let i = 0; i < qtd; i++) {
      const grupo =
        document.createElement("div");

      grupo.className =
        "loja-tamanho-item";

      const label =
        document.createElement("label");

      label.textContent =
        `Tamanho ${i + 1}`;

      const select =
        document.createElement("select");

      select.name =
        `tamanho-${i + 1}`;

      select.required = true;

      const opcaoInicial =
        document.createElement("option");

      opcaoInicial.value = "";
      opcaoInicial.textContent =
        "Selecione";

      select.appendChild(opcaoInicial);

      LOJA_CONFIG.tamanhos.forEach(
        (tamanho) => {
          const opcao =
            document.createElement("option");

          opcao.value = tamanho;
          opcao.textContent = tamanho;

          select.appendChild(opcao);
        }
      );

      if (valoresAntigos[i]) {
        select.value =
          valoresAntigos[i];
      }

      grupo.appendChild(label);
      grupo.appendChild(select);

      tamanhos.appendChild(grupo);
    }
  }

  function obterTamanhosEscolhidos() {
    if (!tamanhos) return [];

    return [
      ...tamanhos.querySelectorAll("select"),
    ].map((select) => select.value);
  }

  // ----------------------------------------------------------
  // PAGAMENTO
  // ----------------------------------------------------------

  if (botaoPagamento) {
    botaoPagamento.addEventListener(
      "click",
      () => {
        const tipo = tipoSelecionado();

        const qtd = quantidade
          ? Math.max(
              1,
              parseInt(
                quantidade.value,
                10
              ) || 1
            )
          : 1;

        const nome = nomeComprador
          ? nomeComprador.value.trim()
          : "";

        const tamanhosEscolhidos =
          obterTamanhosEscolhidos();

        if (!nome) {
          alert(
            "Digite o nome do comprador."
          );

          if (nomeComprador) {
            nomeComprador.focus();
          }

          return;
        }

        if (
          tamanhosEscolhidos.some(
            (tamanho) => !tamanho
          )
        ) {
          alert(
            "Selecione o tamanho de todos os itens."
          );

          return;
        }

        const preco =
          LOJA_CONFIG.precos[tipo] || 0;

        const valorTotal = preco * qtd;

        idPedidoAtual =
          "PP" + Date.now();

        const payloadPix =
          montarPayloadPix({
            chave: LOJA_CONFIG.chavePix,
            nome: LOJA_CONFIG.nomeRecebedor,
            cidade: LOJA_CONFIG.cidade,
            valor: valorTotal,
            txid: "PROVEPRIM",
          });

        if (pixCodigo) {
          pixCodigo.value = payloadPix;
        }

        if (qrCode) {
          qrCode.src =
            "https://api.qrserver.com/v1/create-qr-code/" +
            `?size=220x220&data=${encodeURIComponent(
              payloadPix
            )}`;

          qrCode.alt =
            "QR Code para pagamento Pix";
        }

        if (passo1) {
          passo1.hidden = true;
        }

        if (passo2) {
          passo2.hidden = false;
        }

        const dadosPedido = {
          idPedido: idPedidoAtual,
          data: new Date().toLocaleString(
            "pt-BR"
          ),
          nome: nome,
          produto:
            tipo === "kit"
              ? "Kit"
              : "Abadá",
          quantidade: qtd,
          tamanhos:
            tamanhosEscolhidos.join(", "),
          valor: valorTotal,
          status: "Pix gerado",
        };

        enviarPedidoParaPlanilha(
          dadosPedido
        );

        if (whatsapp) {
          const mensagem =
            criarMensagemWhatsApp({
              idPedido: idPedidoAtual,
              nome,
              tipo,
              quantidade: qtd,
              tamanhos:
                tamanhosEscolhidos,
              valor: valorTotal,
            });

          whatsapp.href =
            `https://wa.me/${LOJA_CONFIG.whatsapp}` +
            `?text=${encodeURIComponent(
              mensagem
            )}`;
        }
      }
    );
  }

  // ----------------------------------------------------------
  // VOLTAR
  // ----------------------------------------------------------

  if (botaoVoltar) {
    botaoVoltar.addEventListener(
      "click",
      () => {
        if (passo1) {
          passo1.hidden = false;
        }

        if (passo2) {
          passo2.hidden = true;
        }
      }
    );
  }

  // ----------------------------------------------------------
  // COPIAR PIX
  // ----------------------------------------------------------

  if (botaoCopiarPix) {
    botaoCopiarPix.addEventListener(
      "click",
      async () => {
        const codigo =
          pixCodigo?.value || "";

        if (!codigo) return;

        try {
          await navigator.clipboard.writeText(
            codigo
          );

          botaoCopiarPix.textContent =
            "Pix copiado!";

          setTimeout(() => {
            botaoCopiarPix.textContent =
              "Copiar código Pix";
          }, 2000);
        } catch {
          pixCodigo.select();

          document.execCommand(
            "copy"
          );

          botaoCopiarPix.textContent =
            "Pix copiado!";

          setTimeout(() => {
            botaoCopiarPix.textContent =
              "Copiar código Pix";
          }, 2000);
        }
      }
    );
  }

  // ----------------------------------------------------------
  // WHATSAPP
  // ----------------------------------------------------------

  if (whatsapp) {
    whatsapp.addEventListener(
      "click",
      () => {
        if (!idPedidoAtual) return;

        enviarPedidoParaPlanilha({
          idPedido: idPedidoAtual,
          status:
            "Comprovante enviado no WhatsApp",
        });
      }
    );
  }

  // ----------------------------------------------------------
  // GALERIA
  // ----------------------------------------------------------

  configurarGaleria();
}


// ============================================================
// GALERIA
// ============================================================

function configurarGaleria() {
  const imagem =
    document.querySelector("#lojaFotoAtual");

  const pontos =
    document.querySelector("#lojaGaleriaPontos");

  const botaoAnterior =
    document.querySelector(
      "#lojaFotoAnterior"
    );

  const botaoProxima =
    document.querySelector(
      "#lojaFotoProxima"
    );

  if (
    !imagem ||
    !pontos ||
    !botaoAnterior ||
    !botaoProxima
  ) {
    return;
  }

  if (!LOJA_CONFIG.fotos.length) {
    return;
  }

  let indiceAtual = 0;

  function renderizarGaleria() {
    imagem.src =
      LOJA_CONFIG.fotos[indiceAtual];

    imagem.alt =
      `Produto Prove Primeiro ${indiceAtual + 1}`;

    pontos.innerHTML = "";

    LOJA_CONFIG.fotos.forEach(
      (_, indice) => {
        const ponto =
          document.createElement("button");

        ponto.type = "button";
        ponto.className =
          "loja-galeria-ponto";

        ponto.setAttribute(
          "aria-label",
          `Ver foto ${indice + 1}`
        );

        if (indice === indiceAtual) {
          ponto.classList.add("ativo");
        }

        ponto.addEventListener(
          "click",
          () => {
            indiceAtual = indice;

            renderizarGaleria();
          }
        );

        pontos.appendChild(ponto);
      }
    );
  }

  botaoAnterior.addEventListener(
    "click",
    () => {
      indiceAtual =
        (indiceAtual -
          1 +
          LOJA_CONFIG.fotos.length) %
        LOJA_CONFIG.fotos.length;

      renderizarGaleria();
    }
  );

  botaoProxima.addEventListener(
    "click",
    () => {
      indiceAtual =
        (indiceAtual + 1) %
        LOJA_CONFIG.fotos.length;

      renderizarGaleria();
    }
  );

  renderizarGaleria();
}


// ============================================================
// ENVIAR PEDIDO PARA GOOGLE SHEETS
// ============================================================

function enviarPedidoParaPlanilha(dados) {
  const url =
    LOJA_CONFIG.planilhaWebhookUrl;

  // Não tenta enviar enquanto a URL não for configurada.
  if (
    !url ||
    url ===
      "https://script.google.com/macros/s/AKfycbwWgk1JS7NF2LNVoPhqWRcn24uBem4IXWkL2GLmApIlipldESD6BcZK_TOkwMQ8AM7dKA/exec"
  ) {
    return;
  }

  fetch(url, {
    method: "POST",
    mode: "no-cors",

    headers: {
      "Content-Type":
        "text/plain;charset=utf-8",
    },

    body: JSON.stringify(dados),
  }).catch((erro) => {
    console.warn(
      "Não foi possível enviar o pedido para a planilha.",
      erro
    );
  });
}


// ============================================================
// MENSAGEM DO WHATSAPP
// ============================================================

function criarMensagemWhatsApp({
  idPedido,
  nome,
  tipo,
  quantidade,
  tamanhos,
  valor,
}) {
  const produto =
    tipo === "kit"
      ? "Kit"
      : "Abadá";

  return `
Olá! Quero confirmar meu pedido do Prove Primeiro.

Pedido: ${idPedido}
Nome: ${nome}
Produto: ${produto}
Quantidade: ${quantidade}
Tamanhos: ${tamanhos.join(", ")}
Valor: ${formatarMoeda(valor)}

Estou enviando o comprovante do pagamento.
`.trim();
}


// ============================================================
// FORMATAÇÃO DE MOEDA
// ============================================================

function formatarMoeda(valor) {
  return Number(valor).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );
}


// ============================================================
// PIX - TLV
// ============================================================

function campoTlv(id, valor) {
  const tamanho =
    String(valor).length
      .toString()
      .padStart(2, "0");

  return `${id}${tamanho}${valor}`;
}


// ============================================================
// MONTAR PIX
// ============================================================

function montarPayloadPix({
  chave,
  nome,
  cidade,
  valor,
  txid,
}) {
  const merchantAccount =
    campoTlv(
      "00",
      "BR.GOV.BCB.PIX"
    ) +
    campoTlv("01", chave);

  const payloadSemCrc =
    campoTlv(
      "00",
      "01"
    ) +

    campoTlv(
      "26",
      merchantAccount
    ) +

    campoTlv(
      "52",
      "0000"
    ) +

    campoTlv(
      "53",
      "986"
    ) +

    campoTlv(
      "54",
      Number(valor).toFixed(2)
    ) +

    campoTlv(
      "58",
      "BR"
    ) +

    campoTlv(
      "59",
      removerAcentos(nome)
        .substring(0, 25)
    ) +

    campoTlv(
      "60",
      removerAcentos(cidade)
        .substring(0, 15)
    ) +

    campoTlv(
      "62",
      campoTlv(
        "05",
        txid
      )
    );

  const crc =
    calcularCrc16(
      payloadSemCrc + "6304"
    );

  return (
    payloadSemCrc +
    "6304" +
    crc
  );
}


// ============================================================
// REMOVER ACENTOS
// ============================================================

function removerAcentos(texto) {
  return String(texto)
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toUpperCase();
}


// ============================================================
// CRC16
// ============================================================

function calcularCrc16(texto) {
  let crc = 0xffff;

  for (
    let i = 0;
    i < texto.length;
    i++
  ) {
    crc ^= texto.charCodeAt(i) << 8;

    for (
      let bit = 0;
      bit < 8;
      bit++
    ) {
      if (crc & 0x8000) {
        crc =
          (crc << 1) ^
          0x1021;
      } else {
        crc <<= 1;
      }

      crc &= 0xffff;
    }
  }

  return crc
    .toString(16)
    .toUpperCase()
    .padStart(4, "0");
}