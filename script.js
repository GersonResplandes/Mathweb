$(function () {
  const opcoes = [
    "Triângulo retângulo",
    "Lei dos Cossenos",
    "Lei dos Senos",
    "Termometria",
    "Funções",
    "Expressão matemática"
  ];

  $("#opcoesInput").autocomplete({
    source: opcoes,
    select: function (event, ui) {
      mostrarFormulario(ui.item.value);
    }
  });
});

function mostrarFormulario(opcao) {
  const formularioTrianguloRetangulo = document.getElementById("formulario_trianguloRetangulo");
  const formularioLeiCossenos = document.getElementById("formulario_leiCossenos");
  const formularioLeiSenos = document.getElementById("formulario_leiSenos");
  const img = document.getElementById("img");
  const comladooposto = document.getElementById("comladooposto");
  const semladooposto = document.getElementById("semladooposto");
  const termometria = document.getElementById("formulario_termometria");
  const funcoes = document.getElementById("funcoes");
  const exMatematica = document.getElementById("expressaoMatematica");

  formularioTrianguloRetangulo.style.display = "none";
  formularioLeiCossenos.style.display = "none";
  formularioLeiSenos.style.display = "none";
  img.style.display = "block";
  comladooposto.style.display = "none";
  semladooposto.style.display = "none";
  funcoes.style.display = "none";
  exMatematica.style.display = "none";

  if (opcao === "Triângulo retângulo") {
    img.style.display = "none";
    formularioTrianguloRetangulo.style.display = "block";
  } else if (opcao === "Lei dos Cossenos") {
    img.style.display = "none";
    formularioLeiCossenos.style.display = "block";
    const ladoOposto = confirm("Você tem o valor do lado que está oposto ao ângulo?");
    comladooposto.style.display = ladoOposto ? "block" : "none";
    semladooposto.style.display = ladoOposto ? "none" : "block";
  } else if (opcao === "Lei dos Senos") {
    img.style.display = "none";
    formularioLeiSenos.style.display = "block";
  } else if (opcao === "Termometria") {
    img.style.display = "none";
    termometria.style.display = "block";
  } else if (opcao === "Funções") {
    funcoes.style.display = "block";
    img.style.display = "none";
  } else if (opcao === "Expressão matemática") {
    img.style.display = "none";
    exMatematica.style.display = "block";
  }
}

function identificarFormula() {
  const angulo = parseFloat(document.getElementById("angulo").value);
  const adjacente = parseFloat(document.getElementById("adjacente").value);
  const oposto = parseFloat(document.getElementById("oposto").value);
  const hipotenusa = parseFloat(document.getElementById("hipotenusa").value);
  const resultado = document.getElementById("resultadotriangulo");
  resultado.innerHTML = ""; // Limpar resultado anterior

  // Verificar quais valores foram fornecidos
  const fornecidos = {
    angulo: !isNaN(angulo),
    adjacente: !isNaN(adjacente),
    oposto: !isNaN(oposto),
    hipotenusa: !isNaN(hipotenusa),
  };

  // Identificar qual fórmula usar
  if (fornecidos.angulo && fornecidos.adjacente) {
    const tangente = Math.tan((angulo * Math.PI) / 180);
    resultado.innerHTML += `
      Usando Tangente:<br>
      tgθ = oposto / adjacente<br>
      tg${angulo} = x / ${adjacente}<br>
      ${formatarNumero(tangente)} = x / ${adjacente}<br>
      x = ${formatarNumero(tangente)} * ${adjacente}<br>
      x = ${formatarNumero(tangente * adjacente)}<br>
    `;
  } else if (fornecidos.angulo && fornecidos.hipotenusa) {
    const coseno = Math.cos((angulo * Math.PI) / 180);
    const seno = Math.sin((angulo * Math.PI) / 180);
    resultado.innerHTML += `
      Usando Cosseno e Seno:<br>
      cosθ = adjacente / hipotenusa<br>
      cos${angulo} = x / ${hipotenusa}<br>
      x = ${formatarNumero(coseno)} * ${hipotenusa}<br>
      x = ${formatarNumero(coseno * hipotenusa)}<br>
      sinθ = oposto / hipotenusa<br>
      sin${angulo} = x / ${hipotenusa}<br>
      x = ${formatarNumero(seno)} * ${hipotenusa}<br>
      x = ${formatarNumero(seno * hipotenusa)}
    `;
  } else if (fornecidos.angulo && fornecidos.oposto) {
    const seno = Math.sin((angulo * Math.PI) / 180);
    const tangente = Math.tan((angulo * Math.PI) / 180);
    const adjacente = parseFloat(document.getElementById("adjacente").value);
    resultado.innerHTML += `
      Usando Tangente e Seno:<br>
      tgθ = oposto / adjacente<br>
      tg${angulo} = x / ${adjacente}<br>
      x = ${formatarNumero(tangente)} * ${adjacente}<br>
      x = ${formatarNumero(tangente * adjacente)}<br>
      sinθ = oposto / hipotenusa<br>
      sin${angulo} = x / ${hipotenusa}<br>
      x = ${formatarNumero(seno)} * ${hipotenusa}<br>
      x = ${formatarNumero(seno * hipotenusa)}
    `;
  } else if (fornecidos.adjacente && fornecidos.oposto) {
    resultado.innerHTML = `
      Usando Pitágoras e Arcotangente:<br>
      adj² + op² = hip²<br>
      adj = ${adjacente}, op = ${oposto}<br>
      hip = √(${adjacente}² + ${oposto}²)<br>
      hip = √(${formatarNumero(adjacente ** 2)}) + (${formatarNumero(oposto ** 2)})<br>
      hip = √${formatarNumero(adjacente ** 2 + oposto ** 2)}<br>
      hip = ${formatarNumero(Math.sqrt(adjacente ** 2 + oposto ** 2))}<br>
      <hr>
      θ = tg<sup>−1</sup>(op / adj)<br>
      θ = tg<sup>−1</sup>(${oposto} / ${adjacente})<br>
      θ = tg<sup>−1</sup>(${formatarNumero(oposto / adjacente)})<br>
      θ = ${formatarNumero(Math.atan(oposto / adjacente) * (180 / Math.PI))}
    `;
  } else if (fornecidos.adjacente && fornecidos.hipotenusa) {
    resultado.innerHTML = `
      Usando Pitágoras e Arcocosseno:<br>
      adj² + op² = hip²<br>
      adj = ${adjacente}, hip = ${hipotenusa}<br>
      op = √(${formatarNumero(hipotenusa ** 2)}) - (${formatarNumero(adjacente ** 2)})<br>
      op = √${formatarNumero(hipotenusa ** 2 - adjacente ** 2)}<br>
      op = ${formatarNumero(Math.sqrt(hipotenusa ** 2 - adjacente ** 2))}<br>
      <hr>
      θ = cos<sup>−1</sup>(adj / hip)<br>
      θ = cos<sup>−1</sup>(${adjacente} / ${hipotenusa})<br>
      θ = cos<sup>−1</sup>(${formatarNumero(adjacente / hipotenusa)})<br>
      θ = ${formatarNumero(Math.acos(adjacente / hipotenusa) * (180 / Math.PI))}
    `;
  } else if (fornecidos.oposto && fornecidos.hipotenusa) {
    resultado.innerHTML = `
      Usando Pitágoras e Arcoseno:<br>
      adj² + op² = hip²<br>
      op = ${oposto}, hip = ${hipotenusa}<br>
      adj = √(${formatarNumero(hipotenusa ** 2)} - ${formatarNumero(oposto ** 2)})<br>
      adj = ${formatarNumero(Math.sqrt(hipotenusa ** 2 - oposto ** 2))}<br>
      <hr>
      θ = sin<sup>−1</sup>(op / hip)<br>
      θ = sin<sup>−1</sup>(${oposto} / ${hipotenusa})<br>
      θ = sin<sup>−1</sup>(${formatarNumero(oposto / hipotenusa)})<br>
      θ = ${formatarNumero(Math.asin(oposto / hipotenusa) * (180 / Math.PI))}
    `;
  } else {
    resultado.innerHTML = "Por favor, forneça pelo menos dois valores.";
  }
}

function calcularComLadoOposto() {
  const ladoa = parseFloat(document.getElementById("ladoa_oposto").value);
  const ladob = parseFloat(document.getElementById("ladob_oposto").value);
  const angulo = parseFloat(document.getElementById("angulo_oposto_graus").value);
  const resultado = document.getElementById("resultado_oposto");

  if (isNaN(ladoa) || isNaN(ladob) || isNaN(angulo)) {
    alert("Por favor, insira valores válidos.");
    return;
  }

  const coseno = cosseno_negativo(angulo);
  const ladoa2 = ladoa ** 2;
  const ladob2 = ladob ** 2;
  const cosTerm = 2 * ladoa * ladob * coseno;
  const x2 = ladoa2 + ladob2 - cosTerm;
  const x = Math.sqrt(x2);

  resultado.innerHTML = `
    x² = a² + b² - 2*a*b*cos(θ)<br>
    x² = ${ladoa}² + ${ladob}² - 2*${ladoa}*${ladob}*cos(${angulo})<br>
    x² = ${formatarNumero(ladoa2)} + ${formatarNumero(ladob2)} - ${formatarNumero(2 * ladoa * ladob)}*cos(${angulo}°)<br>
    x² = ${formatarNumero(ladoa2 + ladob2)} - ${formatarNumero(2 * ladoa * ladob)}*${formatarNumero(coseno)}<br>
    x² = ${formatarNumero(x2)}<br>
    x = √${formatarNumero(x2)}<br>
    x = ${formatarNumero(x)}
  `;
}

function calcularSemLadoOposto() {
  const ladoa = parseFloat(document.getElementById("ladoa").value);
  const ladob = parseFloat(document.getElementById("ladob").value);
  const angulo = parseFloat(document.getElementById("angulo_graus").value);
  const resultado = document.getElementById("resultado");

  if (isNaN(ladoa) || isNaN(ladob) || isNaN(angulo)) {
    alert("Por favor, insira valores válidos.");
    return;
  }

  const coseno = cosseno_negativo(angulo);
  const ladoa2 = ladoa ** 2;
  const ladob2 = ladob ** 2;
  const cosTerm = 2 * ladoa * ladob * coseno;
  const discriminante = Math.sqrt(
    4 * ladoa2 * coseno ** 2 + 4 * ladoa2 - 4 * ladob2
  );
  const x1 = ladoa * coseno + discriminante / 2;
  const x2 = ladoa * coseno - discriminante / 2;

  resultado.innerHTML = `
    x = 2b * cos(θ) ± √(4b² * cos²(θ) + 4a² - 4b²) / 2<br>
    x = 2*${ladob} * cos(${angulo}) ± √(4*${ladob}² * cos²(${angulo}) + 4*${ladoa}² - 4*${ladob}²) / 2<br>
    x = ${formatarNumero(2 * ladob)} * ${formatarNumero(
    coseno
  )} ± √(4 * ${formatarNumero(ladob2)} * ${formatarNumero(
    coseno ** 2
  )} + 4 * ${formatarNumero(ladoa2)} - 4 * ${formatarNumero(ladob2)}) / 2<br>
    x = ${formatarNumero(2 * ladob * coseno)} ± ${formatarNumero(
    discriminante
  )} / 2<br>
    x1 = ${formatarNumero(x1)}<br>
    x2 = ${formatarNumero(x2)}
  `;
}

function formatarNumero(numero) {
  if (Number.isInteger(numero)) {
    return numero.toString();
  } else {
    return numero.toFixed(4).replace(/\.?0+$/, "");
  }
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function seno(angulo1, angulo2, angulo3, angulox1) {
  const angulo_radianos1 = degreesToRadians(angulo1);
  const angulo_radianos2 = degreesToRadians(angulo2);
  const angulo_radianos3 = degreesToRadians(angulo3);
  const angulo_radianos4 = degreesToRadians(angulox1);
  const seno1 = Math.sin(angulo_radianos1);
  const seno2 = Math.sin(angulo_radianos2);
  const seno3 = Math.sin(angulo_radianos3);
  const senoangulox1 = Math.sin(angulo_radianos4);
  return [seno1, seno2, seno3, senoangulox1];
}

function terceirolado() {
  const angulo1 = parseFloat(document.getElementById("anguloA").value);
  const angulo2 = parseFloat(document.getElementById("anguloB").value);
  const enviarSeno3Div = document.getElementById("enviarSeno3");
  const angulo3 = 180 - angulo1 - angulo2;
  enviarSeno3Div.innerHTML = `Terceiro ângulo vale: ${angulo3}°`;
  document.getElementById("restoformulario").style.display = "block";
}

function calcularSeno() {
  const angulo1 = parseFloat(document.getElementById("anguloA").value);
  const angulo2 = parseFloat(document.getElementById("anguloB").value);
  const ladoConhecido = parseFloat(document.getElementById("lado_conhecido").value);
  const angulox1 = parseFloat(document.getElementById("angulox1").value);
  const angulox2 = document.getElementById("anguloladofornecido").value;
  const resultado_SenoDiv = document.getElementById("resultado_Seno");
  const angulo3 = 180 - angulo1 - angulo2;

  const [seno1, seno2, seno3, senoangulox1] = seno(angulo1, angulo2, angulo3, angulox1);
  let senoSelecionado, anguloSelecionado, resultado;

  if (angulox2 === "angulo1") {
    senoSelecionado = seno1;
    anguloSelecionado = angulo1;
  } else if (angulox2 === "angulo2") {
    senoSelecionado = seno2;
    anguloSelecionado = angulo2;
  } else if (angulox2 === "terceiro_angulo") {
    senoSelecionado = seno3;
    anguloSelecionado = angulo3;
  }

  resultado = (senoSelecionado * ladoConhecido) / senoangulox1;

  resultado_SenoDiv.innerHTML = `
    x = 180 - (${angulo1} + ${angulo2}) = ${180 - (angulo1 + angulo2)}°<br>
    <hr>
    <span class="fraction"><sup>${ladoConhecido}</sup>-----<sub>sin(${angulox1}°)</sub></span> =
    <span class="fraction"><sup>x</sup>-----<sub>sin(${anguloSelecionado}°)</sub></span><br>
    <hr>
    x = <span class="fraction"><sup>${ladoConhecido} * sin(${anguloSelecionado})</sup>-----------<sub>sin(${angulox1}°)</sub></span>
    <hr>
    x = <span class="fraction"><sup>${ladoConhecido} * ${formatarNumero(senoSelecionado)}</sup>-------<sub>${formatarNumero(senoangulox1)}</sub></span> =
    <span class="fraction"><sup>${formatarNumero(ladoConhecido * senoSelecionado)}</sup>-----<sub>${formatarNumero(senoangulox1)}</sub></span> = ${formatarNumero(senoSelecionado * ladoConhecido / senoangulox1)}
    <hr>
    <br>O lado x é aproximadamente ${formatarNumero(senoSelecionado * ladoConhecido / senoangulox1)}
  `;
}
function selecionarConversao() {
  const select = document.getElementById("conversor");
  const opcaoSelecionada = select.value;
  const formulario = document.getElementById("formulario");

  if (opcaoSelecionada === "celsiusToKelvin") {
    formulario.style.display = "block";
    document.getElementById("inputs").innerHTML = `
      <label for="celsiusInput">Temperatura em Celsius (°C):</label>
      <input type="number" id="celsiusInput" step="any" required>
    `;
  } else if (opcaoSelecionada === "kelvinToCelsius") {
    formulario.style.display = "block";
    document.getElementById("inputs").innerHTML = `
      <label for="kelvinInput">Temperatura em Kelvin (K):</label>
      <input type="number" id="kelvinInput" step="any" required>
    `;
  } else if (opcaoSelecionada === "celsiusToFahrenheit") {
    formulario.style.display = "block";
    document.getElementById("inputs").innerHTML = `
      <label for="celsiusInput">Temperatura em Celsius (°C):</label>
      <input type="number" id="celsiusInput" step="any" required>
    `;
  } else if (opcaoSelecionada === "fahrenheitToCelsius") {
    formulario.style.display = "block";
    document.getElementById("inputs").innerHTML = `
      <label for="fahrenheitInput">Temperatura em Fahrenheit (°F):</label>
      <input type="number" id="fahrenheitInput" step="any" required>
    `;
  } else if (opcaoSelecionada === "kelvinToFahrenheit") {
    formulario.style.display = "block";
    document.getElementById("inputs").innerHTML = `
      <label for="kelvinInput">Temperatura em Kelvin (K):</label>
      <input type="number" id="kelvinInput" step="any" required>
    `;
  } else if (opcaoSelecionada === "fahrenheitToKelvin") {
    formulario.style.display = "block";
    document.getElementById("inputs").innerHTML = `
      <label for="fahrenheitInput">Temperatura em Fahrenheit (°F):</label>
      <input type="number" id="fahrenheitInput" step="any" required>
    `;
  } else {
    formulario.style.display = "none";
  }
}

function converterTemperatura() {
  const select = document.getElementById("conversor");
  const opcaoSelecionada = select.value;
  let resultado = "";

  if (opcaoSelecionada === "celsiusToKelvin") {
    const celsius = parseFloat(document.getElementById("celsiusInput").value);
    if (!isNaN(celsius)) {
      const kelvin = celsius + 273.15;
      resultado = `
        T(K) = T(°C) + 273.15<br>
        T(K) = ${celsius} + 273.15<br>
        T(K) = ${formatarNumero(kelvin)}`;
    }
  } else if (opcaoSelecionada === "kelvinToCelsius") {
    const kelvin = parseFloat(document.getElementById("kelvinInput").value);
    if (!isNaN(kelvin)) {
      const celsius = kelvin - 273.15;
      resultado = `
        T(°C) = T(K) - 273.15<br>
        T(°C) = ${kelvin} - 273.15<br>
        T(°C) = ${formatarNumero(celsius)}`;
    }
  } else if (opcaoSelecionada === "celsiusToFahrenheit") {
    const celsius = parseFloat(document.getElementById("celsiusInput").value);
    if (!isNaN(celsius)) {
      resultado = `
        <span class="fraction"><sup>Tc</sup>-----<sub>5</sub></span>  =
        <span class="fraction"><sup>(F - 32)</sup>--------<sub>9</sub></span><br>
        <hr>
        <span class="fraction"><sup>${celsius}</sup>-----<sub>5</sub></span>  =
        <span class="fraction"><sup>(F - 32)</sup>--------<sub>9</sub></span><br>
        <hr>
        <span class="fraction"><sup>${celsius / 5}</sub></span>  =
        <span class="fraction"><sup>(F - 32)</sup>-----------<sub>9</sub></span><br>
        <hr>
        ${celsius / 5} * 9 = F - 32<br>
        ${formatarNumero((celsius / 5) * 9)} =  F - 32<br>
        F = ${formatarNumero((celsius / 5) * 9)} + 32<br>
        F = ${formatarNumero((celsius / 5) * 9 + 32)}<br>
      `;
    }
  } else if (opcaoSelecionada === "fahrenheitToCelsius") {
    const fahrenheit = parseFloat(document.getElementById("fahrenheitInput").value);
    if (!isNaN(fahrenheit)) {
      resultado = `<center><h3>Cálculo</h3></center>
      <span class="fraction"><sup>Tc</sup>-----<sub>5</sub></span>  =
      <span class="fraction"><sup>(Tf - 32)</sup>-------<sub>9</sub></span><br>
      <span class="fraction"><sup>Tc</sup>-----<sub>5</sub></span>  =
      <span class="fraction"><sup>(${fahrenheit} - 32)</sup>-----<sub>9</sub></span><br>
      <span class="fraction"><sup>Tc</sup>-------<sub>5</sub></span>  =
      <span class="fraction"><sup>${fahrenheit - 32}</sup>-----<sub>9</sub></span><br>
      <span class="fraction"><sup>Tc</sup>-----<sub>5</sub></span>  =
      <span class="fraction"><sup>${formatarNumero((fahrenheit - 32) / 9)}</sup></span><br>
      Tc = ${formatarNumero((fahrenheit - 32) / 9)} * 5<br>
      Tc = ${formatarNumero(((fahrenheit - 32) / 9) * 5)}°C
      `;
    }
  } else if (opcaoSelecionada === "kelvinToFahrenheit") {
    const kelvin = parseFloat(document.getElementById("kelvinInput").value);
    if (!isNaN(kelvin)) {
      const fahrenheit = (kelvin - 273.15) * 9 / 5 + 32;
      resultado = `
        T(°F) = (<span class="fraction"><sup>9</sup>----<sub>5</sub></span>) * (T(K) - 273.15) + 32<br>
        <hr>
        T(°F) = (<span class="fraction"><sup>9</sup>----<sub>5</sub></span>) * (${kelvin} - 273.15) + 32<br>
        <hr>
        T(°F) = ${formatarNumero(fahrenheit)}
      `;
    }
  } else if (opcaoSelecionada === "fahrenheitToKelvin") {
    const fahrenheit = parseFloat(document.getElementById("fahrenheitInput").value);
    if (!isNaN(fahrenheit)) {
      const kelvin = (fahrenheit - 32) * 5 / 9 + 273.15;
      resultado = `
        T(K) = (<span class="fraction"><sup>9</sup>----<sub>5</sub></span>) * (T(°F) - 32) + 273.15<br>
        <hr>
        T(K) = (<span class="fraction"><sup>9</sup>----<sub>5</sub></span>) * (${fahrenheit} - 32) + 273.15<br>
        <hr>
        T(K) = ${formatarNumero(kelvin)}
      `;
    }
  } else {
    resultado = "Escolha uma conversão válida.";
  }

  document.getElementById("resultado-termometria").innerHTML = resultado;
}
document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.getElementById('conversor');
  selectElement.addEventListener('change', handleSelectionChange);
});

function mostrarDiv() {
  var selectedValue = document.getElementById('seletorf').value;

  if (selectedValue == 'segundograu') {
    document.getElementById('segundograu').style.display = 'block';
  }
}
function segundograu() {
  const resultado = document.getElementById("resutfuncao");
  try {
    const a = parseInt(document.getElementById('a').value);
    const b = parseInt(document.getElementById('b').value);
    const c = parseInt(document.getElementById('c').value);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      throw new Error("Por favor, insira valores numéricos válidos para a, b e c.");
    }

    if (a === 0) {
      throw new Error("O valor de 'a' não pode ser zero.");
    }

    const delta = (b ** 2) - (4 * a * c);

    resultado.innerHTML += `Δ = b² - 4.a.c<br>`;
    resultado.innerHTML += `Δ = ${b}² - 4.${a}.${c}<br>`;
    if ((4 * a * c) < 0) {
      resultado.innerHTML += `Δ = ${b ** 2} - (${4 * a * c})<br>`;
      resultado.innerHTML += `Δ = ${delta}<br><hr>`;
    } else {
      resultado.innerHTML += `Δ = ${b ** 2} - ${4 * a * c}<br>`;
      resultado.innerHTML += `Δ = ${delta}<br><hr>`;
    }

    if (delta < 0) {
      resultado.innerHTML += "A equação não possui raízes reais.";
    } else {
      const raiz_delta = Math.sqrt(delta);
      const x1 = (-b + raiz_delta) / (2 * a);
      const x2 = (-b - raiz_delta) / (2 * a);

      resultado.innerHTML += `<span class="fraction"><sup>x = -${b} ± √${delta}</sup>--------------<sub>2.${a}</sub></span><br>`;
      resultado.innerHTML += `<span class="fraction"><sup>x = ${-b} ± ${formatarNumero(Math.sqrt(delta))}</sup>--------------<sub>${2 * a}</sub></span><br><hr>`;
      resultado.innerHTML += `x' = ${formatarNumero(x1)}<br>`;
      resultado.innerHTML += `x'' = ${formatarNumero(x2)}<br><hr>`;
    }

    const escolha = prompt("Você deseja ver o vértice? (S/N): ").toUpperCase();

    if (escolha === "S") {
      const Xv = -b / (2 * a);
      const Yv = -delta / (4 * a);

      resultado.innerHTML += `<span class="fraction"><sup>Xv = -b</sup>--------<sub>2.a</sub></span> | <span class="fraction"><sup>Yv = -Δ</sup>--------<sub>4.a</sub></span><br><br>`;
      resultado.innerHTML += `<span class="fraction"><sup>Xv = -${b}</sup>--------<sub>2*${a}</sub></span> | <span class="fraction"><sup>Yv = -${delta}</sup>--------<sub>4*${a}</sub></span><br><br><br>`;
      resultado.innerHTML += `Xv = ${formatarNumero(Xv)} | Yv = ${formatarNumero(Yv)}<br>`;
      resultado.innerHTML += `Resultado (xv = ${formatarNumero(Xv)}, Yv = ${formatarNumero(Yv)})`;
    } else {
      resultado.innerHTML += "Obrigado! Encerrando o programa";
    }
  } catch (error) {
    resultado.innerHTML = `Erro: ${error.message}`;
  }
}