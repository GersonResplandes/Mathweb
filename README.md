# 🧮 MathWeb PWA

Uma calculadora matemática completa e moderna desenvolvida como Progressive Web App (PWA) com React, TypeScript e Bootstrap.

## ✨ Características

### 🚀 **Funcionalidades Principais**

- **📐 Triângulo Retângulo**: Calcule lados e ângulos usando trigonometria
- **🔺 Lei dos Cossenos**: Resolva triângulos com dois casos diferentes
- **📏 Lei dos Senos**: Calcule lados usando a lei dos senos
- **🌡️ Conversor de Temperatura**: Converta entre Celsius, Fahrenheit e Kelvin
- **📊 Função do Segundo Grau**: Calcule raízes e vértice de funções quadráticas
- **🧮 Expressão Matemática**: Avalie expressões matemáticas complexas

### 🎨 **Design Moderno**

- Interface responsiva e intuitiva
- Design limpo com tema claro
- Animações suaves e transições
- Cards com efeitos hover
- Layout otimizado para mobile e desktop

### ⚡ **PWA Features**

- **Offline**: Funciona sem internet
- **Instalável**: Pode ser instalado como app
- **Atualizações automáticas**: Sempre a versão mais recente
- **Performance otimizada**: Carregamento rápido

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool rápida e moderna
- **Bootstrap 5** - Framework CSS responsivo
- **React Bootstrap** - Componentes Bootstrap para React
- **Chart.js** - Gráficos interativos
- **Service Workers** - Funcionalidade offline

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**

```bash
git clone [URL_DO_REPOSITORIO]
cd mathweb-pwa
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute em modo desenvolvimento**

```bash
npm run dev
```

4. **Acesse no navegador**

```
http://localhost:3000
```

### Scripts disponíveis

```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Visualiza build de produção
npm run lint         # Executa linter
```

## 🏗️ Estrutura do Projeto

```
mathweb-pwa/
├── public/
│   ├── manifest.json    # Configuração PWA
│   └── sw.js           # Service Worker
├── src/
│   ├── components/     # Componentes React
│   │   ├── TrianguloRetangulo.tsx
│   │   ├── LeiCossenos.tsx
│   │   ├── LeiSenos.tsx
│   │   ├── ConversorTemperatura.tsx
│   │   ├── FuncaoSegundoGrau.tsx
│   │   └── ExpressaoMatematica.tsx
│   ├── types/          # Definições TypeScript
│   │   └── index.ts
│   ├── utils/          # Funções utilitárias
│   │   └── mathUtils.ts
│   ├── App.tsx         # Componente principal
│   ├── App.css         # Estilos personalizados
│   └── main.tsx        # Ponto de entrada
├── index.html          # HTML principal
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração TypeScript
└── vite.config.ts      # Configuração Vite
```

## 🧮 Como Usar

### Triângulo Retângulo

1. Selecione "Triângulo Retângulo" no menu
2. Insira pelo menos dois valores (ângulo, cateto adjacente, cateto oposto ou hipotenusa)
3. Clique em "Calcular"
4. Veja o resultado com os passos detalhados

### Conversor de Temperatura

1. Selecione "Conversor de Temperatura"
2. Escolha o tipo de conversão desejada
3. Insira o valor da temperatura
4. Clique em "Converter"
5. Veja o resultado com a fórmula utilizada

### Função do Segundo Grau

1. Selecione "Função do Segundo Grau"
2. Insira os coeficientes a, b e c
3. Clique em "Calcular"
4. Veja as raízes e o vértice da função

## 🎯 Funcionalidades Planejadas

- [ ] Gráficos interativos para funções
- [ ] Mais tipos de funções matemáticas
- [ ] Histórico de cálculos
- [ ] Exportação de resultados
- [ ] Modo escuro (opcional)
- [ ] Temas personalizáveis
- [ ] Calculadora científica avançada

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**MathWeb PWA** - Uma evolução moderna do projeto original MathWeb

## 🙏 Agradecimentos

- Bootstrap pela interface responsiva
- React pela biblioteca incrível
- TypeScript pela tipagem estática
- Vite pela build tool rápida

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!**
