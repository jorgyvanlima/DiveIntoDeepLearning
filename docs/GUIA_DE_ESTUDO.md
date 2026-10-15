# 📘 Guia de Estudo — Dive into Deep Learning (d2l.ai)

> Guia complementar ao **D2L Quest**. Para cada capítulo do livro [Dive into Deep Learning](https://d2l.ai): resumo em linguagem simples, analogia, conceitos-chave, fórmulas, perguntas de autoavaliação (com gabarito) e uma missão prática em PyTorch.

_Este arquivo é gerado automaticamente a partir de `js/data.js` por `scripts/gerar_guia.js`. Edite o conteúdo lá e gere de novo._

## Como usar este guia

1. **Antes** de ler o capítulo no livro, leia o resumo e a analogia aqui (5 min) para montar o mapa mental.
2. Leia o capítulo no d2l.ai com o notebook aberto e **rode o código**.
3. Cubra as definições dos conceitos e tente explicá-los em voz alta (recordação ativa + técnica Feynman).
4. Responda às perguntas de autoavaliação **sem olhar** o gabarito. Meta: ≥ 70% (igual ao chefão do app).
5. Faça a missão prática e **modifique** algo no código.
6. Revise no dia seguinte, depois em 3, 7 e 14 dias (repetição espaçada — a Arena de Revisão do app faz isso por você).

## Sumário

**🌱 Vale dos Fundamentos**

- [1. Introdução ao Machine Learning](#1-introdução-ao-machine-learning)
- [2. Preliminares: Tensores, Álgebra e Cálculo](#2-preliminares-tensores-álgebra-e-cálculo)
- [3. Redes Lineares para Regressão](#3-redes-lineares-para-regressão)
- [4. Redes Lineares para Classificação](#4-redes-lineares-para-classificação)
- [5. Perceptrons Multicamadas (MLP)](#5-perceptrons-multicamadas-mlp)
- [6. Guia do Construtor (Builders' Guide)](#6-guia-do-construtor-builders-guide)

**🏔️ Montanhas da Visão**

- [7. Redes Neurais Convolucionais (CNN)](#7-redes-neurais-convolucionais-cnn)
- [8. CNNs Modernas](#8-cnns-modernas)

**🌊 Rio das Sequências**

- [9. Redes Neurais Recorrentes (RNN)](#9-redes-neurais-recorrentes-rnn)
- [10. RNNs Modernas: LSTM, GRU e Seq2Seq](#10-rnns-modernas-lstm-gru-e-seq2seq)
- [11. Mecanismos de Atenção e Transformers](#11-mecanismos-de-atenção-e-transformers)

**⚒️ Forja do Treinamento**

- [12. Algoritmos de Otimização](#12-algoritmos-de-otimização)
- [13. Performance Computacional](#13-performance-computacional)

**🏙️ Cidade das Aplicações**

- [14. Visão Computacional](#14-visão-computacional)
- [15. PLN: Pré-treinamento](#15-pln-pré-treinamento)
- [16. PLN: Aplicações](#16-pln-aplicações)

**🚀 Fronteira Avançada**

- [17. Aprendizado por Reforço](#17-aprendizado-por-reforço)
- [18. Processos Gaussianos](#18-processos-gaussianos)
- [19. Otimização de Hiperparâmetros](#19-otimização-de-hiperparâmetros)
- [20. Redes Adversariais Generativas (GANs)](#20-redes-adversariais-generativas-gans)
- [21. Sistemas de Recomendação](#21-sistemas-de-recomendação)

**🗼 Torre da Matemática**

- [22. Apêndice: Matemática para Deep Learning](#22-apêndice-matemática-para-deep-learning)

---

## 1. Introdução ao Machine Learning

🚪 **Chefão:** O Guardião do Portal · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_introduction/index.html)

### Resumo

Programas tradicionais seguem **regras escritas à mão**. Em **Machine Learning**, o programa
**aprende as regras a partir de exemplos**. Todo problema de ML tem quatro peças:
**dados** (os exemplos), um **modelo** (a função que transforma entrada em saída),
uma **função objetivo** (que mede o quão ruim o modelo está) e um **algoritmo de otimização**
(que ajusta o modelo para errar menos).

Os grandes tipos de aprendizado são: **supervisionado** (temos a resposta certa — regressão, classificação,
marcação, busca, recomendação, sequências), **não supervisionado** (sem rótulos — agrupamento, compressão, modelos
generativos) e **por reforço** (um agente age num ambiente e recebe recompensas).

O **Deep Learning** explodiu na última década graças a três ingredientes: **muitos dados**,
**muito poder computacional (GPUs)** e **algoritmos melhores**.

> 💡 **Analogia:** Em vez de escrever um manual de 500 páginas explicando o que é um gato, você mostra 10.000 fotos de gatos e não-gatos para uma criança. Ela descobre sozinha o padrão. Isso é Machine Learning.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Machine Learning** | Área que estuda algoritmos que melhoram seu desempenho em uma tarefa a partir da experiência (dados). |
| **Modelo** | Função com parâmetros ajustáveis que mapeia entradas em saídas (previsões). |
| **Função objetivo (perda)** | Número que mede o quão ruim o modelo está. Treinar = minimizar esse número. |
| **Aprendizado supervisionado** | Aprender a prever rótulos a partir de exemplos (entrada, rótulo). Ex.: regressão e classificação. |
| **Aprendizado não supervisionado** | Encontrar estrutura em dados sem rótulos. Ex.: clustering, redução de dimensionalidade. |
| **Aprendizado por reforço** | Um agente interage com um ambiente, toma ações e aprende a maximizar recompensas acumuladas. |
| **Overfitting** | Quando o modelo decora o treino e vai mal em dados novos. |

### Fórmulas

```text
Treinar = encontrar parâmetros θ que minimizam L(θ) nos dados
```

### Autoavaliação

1. Quais são os 4 componentes centrais de um problema de ML segundo o D2L?
   - a) Dados, modelo, função objetivo e algoritmo de otimização
   - b) CPU, GPU, RAM e disco
   - c) Entrada, saída, loop e condição
   - d) Treino, teste, deploy e monitoramento
2. Prever o preço de venda de uma casa é um problema de…
   - a) Classificação
   - b) Regressão
   - c) Clustering
   - d) Aprendizado por reforço
3. Agrupar clientes por comportamento, sem nenhum rótulo, é…
   - a) Aprendizado supervisionado
   - b) Regressão
   - c) Aprendizado não supervisionado
   - d) Tradução automática
4. Para que serve a função objetivo (loss)?
   - a) Para desenhar a arquitetura
   - b) Para medir quão bom ou ruim o modelo está
   - c) Para carregar os dados
   - d) Para escolher a GPU
5. O que caracteriza overfitting?
   - a) Erro alto no treino e no teste
   - b) Erro baixo no treino e alto em dados novos
   - c) Erro baixo em tudo
   - d) Treino muito lento
6. Quais fatores impulsionaram o deep learning na última década?
   - a) Menos dados e CPUs mais simples
   - b) Grandes volumes de dados e computação barata (GPUs)
   - c) Regras escritas manualmente
   - d) Apenas novos teoremas matemáticos

**Verdadeiro ou falso?**

- Em aprendizado por reforço, o agente aprende interagindo com um ambiente e recebendo recompensas.
- Deep learning exige escrever manualmente as regras de cada decisão.
- Classificação multirrótulo (tagging) permite atribuir várias classes ao mesmo exemplo.

<details><summary>✅ Gabarito</summary>

1. **a)** Dados, modelo, função objetivo e algoritmo de otimização — Todo problema de ML combina dados + modelo + função objetivo + otimizador.
2. **b)** Regressão — A saída é um número contínuo → regressão.
3. **c)** Aprendizado não supervisionado — Sem rótulos, buscamos estrutura nos dados → não supervisionado.
4. **b)** Para medir quão bom ou ruim o modelo está — Ela quantifica o erro; o otimizador tenta reduzi-la.
5. **b)** Erro baixo no treino e alto em dados novos — O modelo decorou o treino e não generaliza.
6. **b)** Grandes volumes de dados e computação barata (GPUs) — Dados abundantes + GPUs + bons algoritmos.

- **V** — Exato: ação → ambiente → recompensa → aprendizado.
- **F** — A graça é justamente aprender as regras a partir dos dados.
- **V** — Uma foto pode ter 'praia', 'cachorro' e 'pôr do sol' ao mesmo tempo.

</details>

### 🧩 Charada

> Tenho um professor que me mostra a resposta certa em cada exemplo. Aprendo a ligar entradas a rótulos. Que tipo de aprendizado sou?

<details><summary>Resposta</summary>

**supervisionado** — Aprendizado supervisionado: cada exemplo vem com seu rótulo.

</details>

### 💻 Missão: Prepare seu laboratório

Instale o PyTorch e a biblioteca d2l. Depois confirme se há GPU disponível. Dica: o Google Colab já vem com tudo e tem GPU grátis.

```python
pip install torch torchvision
pip install d2l==1.0.3

python -c "import torch; print(torch.__version__, torch.cuda.is_available())"
```

---

## 2. Preliminares: Tensores, Álgebra e Cálculo

🧰 **Chefão:** A Hidra Tensorial · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_preliminaries/index.html)

### Resumo

Antes de construir redes, você precisa do **kit de sobrevivência**:

• **Tensores**: arrays n-dimensionais (escalar = 0D, vetor = 1D, matriz = 2D…). São a moeda do deep learning.

• **Broadcasting**: operar tensores de formatos diferentes expandindo dimensões de tamanho 1.

• **Pré-processamento** com pandas: ler CSV, tratar valores faltantes, converter categorias em números.

• **Álgebra linear**: produto escalar, multiplicação de matrizes, normas (L1, L2).

• **Cálculo**: derivadas, gradientes e a **regra da cadeia** — a base do backpropagation.

• **Diferenciação automática** (autograd): o PyTorch calcula gradientes para você com `.backward()`.

• **Probabilidade**: distribuições, esperança, regra de Bayes.

> 💡 **Analogia:** Tensores são como planilhas que podem ter quantas 'abas' e 'camadas' você quiser. O autograd é um contador que anota cada conta que você faz para depois refazer o caminho de trás para frente.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Tensor** | Array n-dimensional de números; com suporte a GPU e diferenciação automática. |
| **Broadcasting** | Mecanismo que expande dimensões de tamanho 1 para operar tensores de formatos diferentes. |
| **Norma L2** | Comprimento euclidiano de um vetor: raiz da soma dos quadrados. |
| **Gradiente** | Vetor de derivadas parciais; aponta para a direção de maior crescimento da função. |
| **Regra da cadeia** | Derivada de funções compostas: (f∘g)'(x) = f'(g(x))·g'(x). Base do backprop. |
| **Autograd** | Diferenciação automática: o framework registra o grafo computacional e calcula gradientes. |
| **Regra de Bayes** | P(A\|B) = P(B\|A)·P(A) / P(B). Atualiza crenças com evidências. |

### Fórmulas

```text
‖x‖₂ = √(Σ xᵢ²)
∂/∂x f(g(x)) = f'(g(x))·g'(x)
P(A|B) = P(B|A)P(A)/P(B)
```

### Autoavaliação

1. Qual o shape de torch.arange(12).reshape(3, 4)?
   - a) (12,)
   - b) (4, 3)
   - c) (3, 4)
   - d) (3, 4, 1)
2. Somar um tensor de shape (3, 1) com um de shape (1, 2) resulta em…
   - a) Erro
   - b) (3, 2)
   - c) (1, 1)
   - d) (3, 1)
3. Qual a norma L2 do vetor [3, 4]?
   - a) 7
   - b) 12
   - c) 5
   - d) 25
4. A derivada de f(g(x)) é…
   - a) f'(x)·g'(x)
   - b) f'(g(x))·g'(x)
   - c) f(g'(x))
   - d) f'(x) + g'(x)
5. Como calcular gradientes no PyTorch?
   - a) x.grad() direto
   - b) Marcar x.requires_grad_(True), computar y e chamar y.backward()
   - c) torch.derivative(y)
   - d) Não é possível
6. A regra de Bayes é…
   - a) P(A|B) = P(A)·P(B)
   - b) P(A|B) = P(B|A)·P(A) / P(B)
   - c) P(A|B) = P(B|A)
   - d) P(A|B) = 1 − P(B)

**Verdadeiro ou falso?**

- O gradiente aponta na direção de maior crescimento da função.
- No PyTorch, x.grad acumula gradientes por padrão; por isso zeramos com x.grad.zero_().
- O produto de Hadamard (A * B) é o mesmo que multiplicação de matrizes (A @ B).

<details><summary>✅ Gabarito</summary>

1. **c)** (3, 4) — reshape(3,4) cria 3 linhas e 4 colunas.
2. **b)** (3, 2) — Broadcasting expande ambos para (3, 2).
3. **c)** 5 — √(9 + 16) = √25 = 5.
4. **b)** f'(g(x))·g'(x) — Regra da cadeia.
5. **b)** Marcar x.requires_grad_(True), computar y e chamar y.backward() — Depois de y.backward(), o gradiente fica em x.grad.
6. **b)** P(A|B) = P(B|A)·P(A) / P(B) — Posterior = verossimilhança × prior / evidência.

- **V** — Por isso andamos na direção contrária para minimizar.
- **V** — Sem zerar, os gradientes de iterações diferentes se somam.
- **F** — Hadamard é elemento a elemento; @ é produto matricial.

</details>

### 🧩 Charada

> Sou uma caixa de números de muitas dimensões: com 0 eixos sou escalar, com 1 sou vetor, com 2 sou matriz. Quem sou?

<details><summary>Resposta</summary>

**tensor** — Tensor: a estrutura de dados fundamental do deep learning.

</details>

### 💻 Missão: Seu primeiro gradiente

Calcule o gradiente de y = 2·xᵀx e confirme que ele é igual a 4x.

```python
import torch

x = torch.arange(4.0, requires_grad=True)
y = 2 * torch.dot(x, x)
y.backward()

print(x.grad)              # tensor([ 0.,  4.,  8., 12.])
print(x.grad == 4 * x)     # tudo True!

# broadcasting
a = torch.arange(3).reshape(3, 1)
b = torch.arange(2).reshape(1, 2)
print((a + b).shape)       # torch.Size([3, 2])
```

---

## 3. Redes Lineares para Regressão

📈 **Chefão:** O Golem dos Mínimos Quadrados · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_linear-regression/index.html)

### Resumo

A **regressão linear** é a rede neural mais simples: uma única camada totalmente conectada.
O modelo prevê `ŷ = Xw + b`. Medimos o erro com a **perda quadrática** e ajustamos
`w` e `b` com **gradiente descendente estocástico em minibatches** (SGD).

Detalhes importantes: a **taxa de aprendizado** e o **tamanho do batch** são **hiperparâmetros** (você escolhe,
o modelo não aprende). Minimizar o erro quadrático equivale a fazer **máxima verossimilhança** supondo ruído gaussiano.

O capítulo também ensina **generalização**: erro de treino vs. erro de generalização, **underfitting** e
**overfitting**, conjunto de **validação**, **validação cruzada K-fold** e o **weight decay** (regularização L2),
que pune pesos grandes para deixar o modelo mais simples.

> 💡 **Analogia:** Imagine descer uma montanha no escuro: você sente a inclinação do chão sob os pés (gradiente) e dá um passo para baixo. A taxa de aprendizado é o tamanho do passo — grande demais você tropeça, pequeno demais nunca chega.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Regressão linear** | Modelo ŷ = Xw + b; prevê um valor contínuo como combinação linear das features. |
| **Perda quadrática** | l = ½(ŷ − y)². Penaliza muito os erros grandes. |
| **SGD em minibatch** | Atualiza parâmetros usando o gradiente médio de um pequeno lote aleatório de exemplos. |
| **Taxa de aprendizado (η)** | Hiperparâmetro que define o tamanho do passo na atualização dos parâmetros. |
| **Hiperparâmetro** | Configuração escolhida antes do treino (lr, batch size, nº de camadas), não aprendida pelo gradiente. |
| **Validação cruzada K-fold** | Divide os dados em K partes; treina K vezes usando cada parte como validação. Útil com poucos dados. |
| **Weight decay** | Regularização L2: soma λ/2·‖w‖² à perda para manter os pesos pequenos. |

### Fórmulas

```text
ŷ = Xw + b
L(w,b) = 1/n Σ ½(ŷ⁽ⁱ⁾ − y⁽ⁱ⁾)²
w ← w − (η/|B|) Σᵢ∈B ∇w l⁽ⁱ⁾
L_reg = L + (λ/2)‖w‖²
```

### Autoavaliação

1. Qual hiperparâmetro controla o tamanho do passo do gradiente descendente?
   - a) Batch size
   - b) Taxa de aprendizado
   - c) Número de épocas
   - d) Bias
2. Minimizar a perda quadrática equivale a máxima verossimilhança assumindo ruído…
   - a) Uniforme
   - b) Gaussiano
   - c) De Poisson
   - d) Nenhum ruído
3. O weight decay adiciona à perda…
   - a) λ/2·‖w‖²
   - b) λ·‖w‖₀
   - c) Ruído aleatório
   - d) Mais camadas
4. Por que usar minibatches em vez do dataset inteiro a cada passo?
   - a) Porque o gradiente fica exato
   - b) Equilíbrio entre custo computacional, paralelismo e estabilidade
   - c) Porque o dataset não cabe no disco
   - d) Não há motivo
5. Para que serve o conjunto de validação?
   - a) Treinar os pesos
   - b) Escolher hiperparâmetros/modelos sem tocar no teste
   - c) Substituir o teste
   - d) Aumentar os dados
6. Underfitting significa…
   - a) Erro baixo no treino, alto no teste
   - b) Erro alto no treino e na validação: modelo simples demais
   - c) Treino perfeito
   - d) Dados demais

**Verdadeiro ou falso?**

- Regressão linear pode ser vista como uma rede neural de uma única camada totalmente conectada.
- Aumentar λ no weight decay tende a deixar os pesos maiores.
- Validação cruzada K-fold é especialmente útil quando há poucos dados.

<details><summary>✅ Gabarito</summary>

1. **b)** Taxa de aprendizado — A learning rate η multiplica o gradiente.
2. **b)** Gaussiano — Ruído gaussiano → log-verossimilhança proporcional ao erro quadrático.
3. **a)** λ/2·‖w‖² — É a penalidade L2 sobre os pesos.
4. **b)** Equilíbrio entre custo computacional, paralelismo e estabilidade — Minibatches são baratos e aproveitam o paralelismo das GPUs.
5. **b)** Escolher hiperparâmetros/modelos sem tocar no teste — O teste deve ser usado só no final, uma vez.
6. **b)** Erro alto no treino e na validação: modelo simples demais — O modelo nem consegue capturar o padrão do treino.

- **V** — Cada saída depende de todas as entradas.
- **F** — Quanto maior λ, mais forte a punição → pesos menores.
- **V** — Aproveita todos os dados para treino e validação.

</details>

### 🧩 Charada

> Desço a montanha sem enxergar o vale; a cada passo sinto a inclinação e vou contra ela. Às vezes uso só um punhado de exemplos para sentir o chão. Quem sou?

<details><summary>Resposta</summary>

**sgd** — SGD — Stochastic Gradient Descent.

</details>

### 💻 Missão: Regressão linear do zero ao PyTorch

Gere dados sintéticos com w=[2, −3.4] e b=4.2 e veja o modelo recuperar esses valores.

```python
import torch
from torch import nn

X = torch.randn(1000, 2)
w_true, b_true = torch.tensor([2.0, -3.4]), 4.2
y = (X @ w_true + b_true + 0.01 * torch.randn(1000)).reshape(-1, 1)

net = nn.Linear(2, 1)
loss = nn.MSELoss()
opt = torch.optim.SGD(net.parameters(), lr=0.03, weight_decay=0.0)

for epoch in range(3):
    for i in range(0, 1000, 10):              # minibatches de 10
        l = loss(net(X[i:i+10]), y[i:i+10])
        opt.zero_grad(); l.backward(); opt.step()
    print(f"época {epoch+1}, perda {loss(net(X), y).item():.6f}")

print(net.weight.data, net.bias.data)        # ≈ [2, -3.4] e 4.2
```

---

## 4. Redes Lineares para Classificação

🎯 **Chefão:** A Esfinge Softmax · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_linear-classification/index.html)

### Resumo

Agora a saída é uma **categoria**. Representamos rótulos com **one-hot** e o modelo produz
**logits** `o = XW + b`. A **softmax** transforma logits em probabilidades (positivas e que somam 1).
A perda é a **entropia cruzada**, e seu gradiente é lindo: `softmax(o) − y`.

Na prática, usamos o truque **log-sum-exp** para evitar overflow numérico (o PyTorch já faz isso em
`nn.CrossEntropyLoss`, que recebe os **logits** crus). O dataset de treino é o **Fashion-MNIST**
(10 classes de roupas, imagens 28×28 em tons de cinza).

O capítulo fecha com **generalização em classificação** e **mudança de distribuição**: covariate shift (muda P(x)),
label shift (muda P(y)) e concept shift (muda o próprio significado dos rótulos).

> 💡 **Analogia:** A softmax é como uma eleição: cada candidato (classe) recebe uma 'força' (logit). A softmax converte essas forças em porcentagem de votos — todo mundo recebe algo, mas o mais forte leva a maior fatia.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **One-hot** | Vetor com 1 na posição da classe correta e 0 nas demais. Não impõe ordem entre classes. |
| **Logits** | Saídas cruas (não normalizadas) do modelo antes da softmax. |
| **Softmax** | ŷⱼ = exp(oⱼ)/Σₖ exp(oₖ). Transforma logits em distribuição de probabilidade. |
| **Entropia cruzada** | l = −Σⱼ yⱼ log ŷⱼ. Perda padrão para classificação. |
| **Log-sum-exp** | Truque numérico que subtrai o maior logit antes da exponencial, evitando overflow. |
| **Covariate shift** | A distribuição das entradas P(x) muda entre treino e teste, mas P(y\|x) não. |
| **Label shift** | A distribuição dos rótulos P(y) muda, mas P(x\|y) permanece. |

### Fórmulas

```text
ŷ = softmax(o),  ŷⱼ = exp(oⱼ) / Σₖ exp(oₖ)
l(y, ŷ) = −Σⱼ yⱼ log ŷⱼ
∂l/∂oⱼ = softmax(o)ⱼ − yⱼ
```

### Autoavaliação

1. O que a softmax faz com os logits?
   - a) Zera os negativos
   - b) Transforma em probabilidades positivas que somam 1
   - c) Ordena em ordem decrescente
   - d) Normaliza para média 0
2. Qual perda é usada tipicamente junto com softmax?
   - a) Erro quadrático
   - b) Entropia cruzada
   - c) Hinge
   - d) L1
3. Qual a derivada da entropia cruzada (com softmax) em relação ao logit oⱼ?
   - a) yⱼ
   - b) softmax(o)ⱼ − yⱼ
   - c) log(oⱼ)
   - d) 1/oⱼ
4. Por que as bibliotecas combinam softmax + log (log-sum-exp)?
   - a) Para deixar mais lento
   - b) Para evitar overflow/underflow numérico
   - c) Para mudar o resultado
   - d) Por estética
5. Covariate shift ocorre quando…
   - a) P(y|x) muda
   - b) P(x) muda mas P(y|x) permanece
   - c) Os rótulos estão errados
   - d) O modelo é grande demais
6. O Fashion-MNIST contém…
   - a) 1000 classes coloridas 224×224
   - b) 10 classes de roupas, imagens 28×28 em tons de cinza
   - c) Textos de notícias
   - d) Áudios

**Verdadeiro ou falso?**

- A softmax preserva a ordem dos logits: o maior logit vira a maior probabilidade.
- Usar one-hot implica que a classe 3 é 'maior' que a classe 1.
- nn.CrossEntropyLoss do PyTorch espera receber logits (sem softmax aplicada).

<details><summary>✅ Gabarito</summary>

1. **b)** Transforma em probabilidades positivas que somam 1 — Exponencia e divide pela soma.
2. **b)** Entropia cruzada — Entropia cruzada mede a distância entre distribuições.
3. **b)** softmax(o)ⱼ − yⱼ — Previsão menos o rótulo: elegante e estável.
4. **b)** Para evitar overflow/underflow numérico — exp de números grandes estoura; o truque resolve.
5. **b)** P(x) muda mas P(y|x) permanece — As entradas mudam (ex.: fotos de outra câmera), mas a relação não.
6. **b)** 10 classes de roupas, imagens 28×28 em tons de cinza — Substituto mais desafiador do MNIST clássico.

- **V** — exp é monotônica crescente.
- **F** — One-hot não cria ordem — essa é a vantagem.
- **V** — Ela aplica log-softmax internamente.

</details>

### 🧩 Charada

> Pego números quaisquer, positivos ou negativos, exponencio todos e divido pela soma. No fim ninguém passa de 1 e todos juntos somam exatamente 1. Quem sou?

<details><summary>Resposta</summary>

**softmax** — Softmax: o máximo 'macio' e diferenciável.

</details>

### 💻 Missão: Classificador softmax no Fashion-MNIST

Monte o modelo linear e treine por algumas épocas.

```python
import torch, torchvision
from torch import nn
from torchvision import transforms

tf = transforms.ToTensor()
train = torchvision.datasets.FashionMNIST("data", train=True, download=True, transform=tf)
loader = torch.utils.data.DataLoader(train, batch_size=256, shuffle=True)

net = nn.Sequential(nn.Flatten(), nn.Linear(784, 10))
loss = nn.CrossEntropyLoss()            # recebe logits!
opt = torch.optim.SGD(net.parameters(), lr=0.1)

for epoch in range(5):
    acc = n = 0
    for X, y in loader:
        out = net(X); l = loss(out, y)
        opt.zero_grad(); l.backward(); opt.step()
        acc += (out.argmax(1) == y).sum().item(); n += len(y)
    print(f"época {epoch+1}: acurácia treino {acc/n:.3f}")
```

---

## 5. Perceptrons Multicamadas (MLP)

🧠 **Chefão:** A Quimera das Camadas Ocultas · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_multilayer-perceptrons/index.html)

### Resumo

Modelos lineares são limitados. Adicionamos **camadas ocultas** com **funções de ativação não lineares**
(ReLU, sigmoid, tanh). Sem não-linearidade, empilhar camadas lineares continua sendo linear!

O treino usa **forward propagation** (calcula as saídas) e **backpropagation** (aplica a regra da cadeia de trás
para frente no **grafo computacional**). Redes profundas sofrem com **gradientes que desaparecem ou explodem**;
uma boa **inicialização** (Xavier/Glorot) ajuda a manter a variância estável.

Para generalizar melhor usamos **dropout**: durante o treino, zera neurônios aleatoriamente com probabilidade p e
reescala os restantes por 1/(1−p). Na inferência, o dropout é desligado. O capítulo também discute por que redes
enormes, capazes de decorar os dados, ainda assim **generalizam** (early stopping, viés indutivo). O capítulo termina com um projeto real:
**prever preços de casas no Kaggle**.

> 💡 **Analogia:** Um MLP é uma linha de montagem: cada camada transforma um pouco a peça. A ativação não linear é o 'toque artesanal' de cada estação — sem ela, toda a fábrica faria o mesmo que uma única máquina.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Camada oculta** | Camada entre entrada e saída: H = σ(XW⁽¹⁾ + b⁽¹⁾). |
| **ReLU** | ReLU(x) = max(0, x). Simples, rápida e reduz o problema de gradiente que desaparece. |
| **Sigmoid** | σ(x) = 1/(1+e⁻ˣ). Comprime para (0,1); satura nos extremos. |
| **Backpropagation** | Calcula gradientes aplicando a regra da cadeia de trás para frente, reaproveitando valores do forward. |
| **Gradiente que desaparece** | Gradientes ficam minúsculos ao atravessar muitas camadas; as primeiras camadas param de aprender. |
| **Inicialização Xavier** | Escolhe a variância dos pesos ≈ 2/(n_in + n_out) para manter sinais estáveis. |
| **Dropout** | Zera ativações aleatoriamente no treino (prob. p) e reescala por 1/(1−p). Regulariza a rede. |

### Fórmulas

```text
H = σ(XW⁽¹⁾ + b⁽¹⁾),  O = HW⁽²⁾ + b⁽²⁾
ReLU(x) = max(0, x)
h' = 0 com prob. p;  h/(1−p) caso contrário
```

### Autoavaliação

1. Sem ativação não linear, empilhar várias camadas lineares resulta em…
   - a) Um modelo muito mais poderoso
   - b) Ainda um modelo linear
   - c) Uma CNN
   - d) Um modelo que não treina
2. ReLU(x) é igual a…
   - a) 1/(1+e⁻ˣ)
   - b) max(0, x)
   - c) tanh(x)
   - d) x²
3. Qual problema a sigmoid causa em redes profundas?
   - a) Gradientes desaparecem quando ela satura
   - b) Gera números negativos
   - c) É impossível derivar
   - d) Consome muita memória
4. O dropout, durante o treino…
   - a) Remove camadas inteiras para sempre
   - b) Zera ativações aleatoriamente com prob. p e reescala por 1/(1−p)
   - c) Duplica neurônios
   - d) Diminui a learning rate
5. O backpropagation…
   - a) Calcula gradientes pela regra da cadeia, de trás para frente
   - b) Escolhe a arquitetura
   - c) Gera novos dados
   - d) Só funciona em CNNs
6. A inicialização Xavier busca…
   - a) Pesos todos iguais a zero
   - b) Manter estável a variância de ativações e gradientes entre camadas
   - c) Pesos muito grandes
   - d) Acelerar o carregamento de dados

**Verdadeiro ou falso?**

- Durante a inferência (teste), o dropout normalmente é desativado.
- Um MLP com uma camada oculta larga o suficiente pode aproximar qualquer função contínua em um domínio compacto.
- Inicializar todos os pesos com o mesmo valor é boa prática, pois garante simetria.

<details><summary>✅ Gabarito</summary>

1. **b)** Ainda um modelo linear — Composição de funções lineares é linear.
2. **b)** max(0, x) — Mantém positivos, zera negativos.
3. **a)** Gradientes desaparecem quando ela satura — Nos extremos a derivada é quase zero.
4. **b)** Zera ativações aleatoriamente com prob. p e reescala por 1/(1−p) — Isso é o 'inverted dropout'.
5. **a)** Calcula gradientes pela regra da cadeia, de trás para frente — Usa os valores intermediários guardados no forward.
6. **b)** Manter estável a variância de ativações e gradientes entre camadas — Variância ≈ 2/(n_in + n_out).

- **V** — Em PyTorch: net.eval().
- **V** — Teorema da aproximação universal (o que não diz que é fácil treinar!).
- **F** — Simetria é o problema! Neurônios iguais aprendem a mesma coisa.

</details>

### 🧩 Charada

> Sou a porta mais simples do mundo neural: se for negativo, digo zero; se for positivo, deixo passar igualzinho. Quem sou?

<details><summary>Resposta</summary>

**relu** — ReLU = max(0, x).

</details>

### 💻 Missão: MLP com dropout

Crie um MLP com duas camadas ocultas e dropout para o Fashion-MNIST. Compare treino com e sem dropout.

```python
import torch
from torch import nn

net = nn.Sequential(
    nn.Flatten(),
    nn.Linear(784, 256), nn.ReLU(), nn.Dropout(0.5),
    nn.Linear(256, 256), nn.ReLU(), nn.Dropout(0.5),
    nn.Linear(256, 10),
)

def init(m):
    if isinstance(m, nn.Linear):
        nn.init.xavier_uniform_(m.weight); nn.init.zeros_(m.bias)
net.apply(init)

net.train()   # dropout ligado
net.eval()    # dropout desligado (inferência)
```

---

## 6. Guia do Construtor (Builders' Guide)

🧱 **Chefão:** O Mestre de Obras · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_builders-guide/index.html)

### Resumo

Hora de dominar as **ferramentas do PyTorch**. Tudo é um **Module** (`nn.Module`): uma camada, um bloco
ou a rede inteira. Você define as partes no `__init__` e a computação no `forward`.

Você aprende a: acessar **parâmetros** (`named_parameters`, `state_dict`), aplicar
**inicializações** personalizadas, **compartilhar parâmetros** entre camadas, usar **inicialização preguiçosa**
(`nn.LazyLinear` descobre o tamanho da entrada no primeiro forward), criar **camadas customizadas**,
**salvar e carregar** modelos (`torch.save(net.state_dict())`) e usar **GPUs** (`.to("cuda")`).

Regra de ouro: tensores precisam estar no **mesmo dispositivo** para operar, e copiar dados entre CPU e GPU é caro.

> 💡 **Analogia:** nn.Module é uma peça de LEGO: peças pequenas se encaixam em peças maiores, que se encaixam no castelo inteiro. O state_dict é a foto de como cada peça está posicionada — com ela você remonta o castelo em qualquer lugar.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **nn.Module** | Classe base de camadas e modelos no PyTorch; define __init__ e forward. |
| **nn.Sequential** | Module que encadeia outros modules em ordem. |
| **state_dict** | Dicionário com todos os parâmetros e buffers de um modelo; usado para salvar/carregar. |
| **Lazy initialization** | Camadas como nn.LazyLinear inferem o formato da entrada no primeiro forward. |
| **Parâmetros compartilhados** | Reutilizar a mesma camada em vários pontos; os gradientes se somam. |
| **Device** | Onde o tensor vive (CPU ou GPU). Operações exigem tensores no mesmo device. |

### Fórmulas

```text
torch.save(net.state_dict(), 'mlp.params')
net.load_state_dict(torch.load('mlp.params'))
```

### Autoavaliação

1. Qual método define a computação de um Module customizado?
   - a) __call__
   - b) forward
   - c) compute
   - d) run
2. O que nn.LazyLinear faz de especial?
   - a) Treina mais devagar
   - b) Infere in_features no primeiro forward
   - c) Não tem bias
   - d) Só roda na CPU
3. Qual a forma recomendada de salvar apenas os parâmetros?
   - a) pickle do objeto inteiro
   - b) torch.save(net.state_dict(), 'arquivo')
   - c) print(net)
   - d) net.export()
4. Como mover um tensor X para a GPU?
   - a) X.gpu = True
   - b) X.to('cuda')
   - c) torch.gpu(X)
   - d) X.cuda_mode()
5. O que acontece ao somar um tensor na CPU com outro na GPU?
   - a) Funciona normalmente
   - b) Erro: os tensores precisam estar no mesmo device
   - c) O PyTorch copia automaticamente sem custo
   - d) Resultado é zero
6. Ao compartilhar uma camada em dois lugares da rede, seus gradientes…
   - a) São ignorados
   - b) São somados
   - c) São multiplicados
   - d) Só o primeiro conta

**Verdadeiro ou falso?**

- Transferir dados entre CPU e GPU com muita frequência pode deixar o treino lento.
- nn.Sequential só aceita camadas nativas do PyTorch, não Modules customizados.
- O state_dict guarda o código Python da arquitetura.

<details><summary>✅ Gabarito</summary>

1. **b)** forward — Você implementa forward; o __call__ do PyTorch chama ele.
2. **b)** Infere in_features no primeiro forward — Inicialização adiada até conhecer o shape da entrada.
3. **b)** torch.save(net.state_dict(), 'arquivo') — Depois recrie a arquitetura e carregue com load_state_dict.
4. **b)** X.to('cuda') — Ou X.cuda(), ou X.to(device).
5. **b)** Erro: os tensores precisam estar no mesmo device — O PyTorch não move silenciosamente; você precisa mover.
6. **b)** São somados — Mesmo parâmetro, contribuições somadas no backprop.

- **V** — A cópia tem custo e pode forçar sincronização.
- **F** — Qualquer nn.Module pode entrar.
- **F** — Guarda apenas tensores (parâmetros/buffers). A arquitetura vem do seu código.

</details>

### 🧩 Charada

> Sou a peça de LEGO do PyTorch: posso ser uma camada, um bloco ou a rede inteira. Tenho __init__ e forward. Quem sou?

<details><summary>Resposta</summary>

**module** — nn.Module, a base de tudo.

</details>

### 💻 Missão: Seu próprio bloco

Crie um Module customizado, inicialize, rode na GPU (se houver) e salve/carregue os pesos.

```python
import torch
from torch import nn

class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.hidden = nn.LazyLinear(256)
        self.out = nn.LazyLinear(10)
    def forward(self, X):
        return self.out(torch.relu(self.hidden(X)))

device = "cuda" if torch.cuda.is_available() else "cpu"
net = MLP().to(device)
X = torch.randn(2, 20, device=device)
print(net(X).shape)                      # lazy init aconteceu aqui

torch.save(net.state_dict(), "mlp.params")
clone = MLP().to(device); clone(X)       # inicializa shapes
clone.load_state_dict(torch.load("mlp.params"))
print(torch.equal(clone(X), net(X)))     # True
```

---

## 7. Redes Neurais Convolucionais (CNN)

🔍 **Chefão:** O Kraken Convolucional · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_convolutional-neural-networks/index.html)

### Resumo

Imagens têm estrutura espacial. As **CNNs** exploram dois princípios: **invariância à translação**
(um gato é gato em qualquer canto) e **localidade** (pixels próximos importam mais).

A camada convolucional desliza um **kernel** (filtro) pela imagem — tecnicamente uma **correlação cruzada**.
Controlamos o tamanho da saída com **padding** (bordas) e **stride** (passo). Imagens têm vários **canais**
(RGB); cada kernel tem pesos para todos os canais de entrada e gera um canal de saída. Convoluções **1×1** misturam
canais. O **pooling** (máximo ou média) reduz resolução sem ter parâmetros.

Tudo culmina na **LeNet**, a CNN pioneira para ler dígitos manuscritos.

> 💡 **Analogia:** Um kernel é como uma lupa com um 'padrão procurado' (ex.: uma borda vertical). Você passa a lupa por toda a foto e anota onde o padrão aparece. Cada canal de saída é uma lupa diferente.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Convolução (correlação cruzada)** | Desliza um kernel sobre a entrada calculando somas de produtos em cada posição. |
| **Kernel / filtro** | Pequena matriz de pesos compartilhada por todas as posições da imagem. |
| **Padding** | Adicionar bordas (geralmente zeros) para controlar o tamanho da saída. |
| **Stride** | Tamanho do passo com que o kernel se move; stride > 1 reduz a resolução. |
| **Convolução 1×1** | Combina canais em cada pixel; muda o número de canais com poucos parâmetros. |
| **Pooling** | Agrega (max ou média) regiões; reduz resolução, sem parâmetros treináveis. |
| **Campo receptivo** | Região da entrada que influencia um elemento da saída. |
| **LeNet** | CNN clássica (LeCun, anos 90) para reconhecimento de dígitos manuscritos. |

### Fórmulas

```text
saída = ⌊(n − k + 2p) / s⌋ + 1
parâmetros = k·k·C_in·C_out + C_out
```

### Autoavaliação

1. Entrada 32×32, kernel 5×5, padding 0, stride 1. Tamanho da saída?
   - a) 32×32
   - b) 28×28
   - c) 27×27
   - d) 30×30
2. Entrada 28×28, kernel 3×3, padding 1, stride 1. Tamanho da saída?
   - a) 26×26
   - b) 28×28
   - c) 30×30
   - d) 14×14
3. Entrada 224, kernel 7, padding 3, stride 2. Saída?
   - a) 112
   - b) 109
   - c) 224
   - d) 56
4. Conv 3×3 com 16 canais de entrada e 32 de saída (com bias). Quantos parâmetros?
   - a) 4.608
   - b) 4.640
   - c) 512
   - d) 9.248
5. Para que serve a convolução 1×1?
   - a) Detectar bordas grandes
   - b) Misturar canais / mudar o nº de canais por pixel
   - c) Aumentar a resolução
   - d) Nada, é identidade
6. Sobre o max pooling, é correto dizer que…
   - a) Tem muitos pesos treináveis
   - b) Reduz resolução e dá robustez a pequenas translações, sem parâmetros
   - c) Aumenta o número de canais
   - d) Só existe na LeNet

**Verdadeiro ou falso?**

- A 'convolução' das bibliotecas de deep learning é, tecnicamente, uma correlação cruzada.
- Camadas de pooling têm pesos aprendíveis.
- A LeNet foi usada para reconhecer dígitos manuscritos, como em cheques bancários.

<details><summary>✅ Gabarito</summary>

1. **b)** 28×28 — 32 − 5 + 1 = 28.
2. **b)** 28×28 — 28 − 3 + 2 + 1 = 28 (padding 'same').
3. **a)** 112 — ⌊(224 − 7 + 6)/2⌋ + 1 = 111 + 1 = 112.
4. **b)** 4.640 — 3·3·16·32 + 32 = 4.640.
5. **b)** Misturar canais / mudar o nº de canais por pixel — Funciona como uma camada densa aplicada a cada pixel.
6. **b)** Reduz resolução e dá robustez a pequenas translações, sem parâmetros — Pooling não aprende nada; apenas agrega.

- **V** — A diferença (inverter o kernel) não importa, pois o kernel é aprendido.
- **F** — Max/avg pooling são operações fixas.
- **V** — Um dos primeiros sucessos comerciais de redes neurais.

</details>

### 🧩 Charada

> Sou uma pequena janela que desliza pela imagem, multiplicando e somando por onde passo, com os mesmos pesos em todo lugar. Quem sou?

<details><summary>Resposta</summary>

**kernel** — O kernel (filtro) convolucional.

</details>

### 💻 Missão: Construa a LeNet

Monte a LeNet e verifique o shape da saída de cada camada.

```python
import torch
from torch import nn

lenet = nn.Sequential(
    nn.Conv2d(1, 6, kernel_size=5, padding=2), nn.Sigmoid(),
    nn.AvgPool2d(kernel_size=2, stride=2),
    nn.Conv2d(6, 16, kernel_size=5), nn.Sigmoid(),
    nn.AvgPool2d(kernel_size=2, stride=2),
    nn.Flatten(),
    nn.Linear(16 * 5 * 5, 120), nn.Sigmoid(),
    nn.Linear(120, 84), nn.Sigmoid(),
    nn.Linear(84, 10),
)

X = torch.randn(1, 1, 28, 28)
for layer in lenet:
    X = layer(X)
    print(f"{layer.__class__.__name__:12s} -> {tuple(X.shape)}")
```

---

## 8. CNNs Modernas

🏛️ **Chefão:** O Titã Residual · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_convolutional-modern/index.html)

### Resumo

Um tour pelas arquiteturas que mudaram a visão computacional:

• **AlexNet** (2012): venceu o ImageNet com ReLU, dropout, data augmentation e GPUs.

• **VGG**: blocos repetidos de convoluções 3×3 + pooling.

• **NiN**: convoluções 1×1 e _global average pooling_ no lugar das camadas densas.

• **GoogLeNet**: blocos **Inception** com ramos paralelos (1×1, 3×3, 5×5, pooling).

• **Batch Normalization**: normaliza ativações por minibatch; acelera e estabiliza o treino.

• **ResNet**: **conexões residuais** f(x) = x + g(x) permitem redes com centenas de camadas.

• **DenseNet**: concatena saídas em vez de somar. **ResNeXt**: convoluções agrupadas.

• **RegNet**: projetar _espaços de design_ de redes, não redes isoladas.

> 💡 **Analogia:** A conexão residual é como estudar com o livro aberto: a camada não precisa reescrever tudo do zero, só anotar as correções (o resíduo) em cima do que já sabia.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **AlexNet** | CNN profunda que venceu o ImageNet 2012; popularizou ReLU, dropout e treino em GPU. |
| **Bloco VGG** | Sequência de convoluções 3×3 com padding 1 seguida de max pooling 2×2. |
| **Global average pooling** | Média de cada canal sobre toda a dimensão espacial; substitui camadas densas (NiN). |
| **Bloco Inception** | Ramos paralelos com kernels de tamanhos diferentes, concatenados nos canais. |
| **Batch Normalization** | Normaliza por média/variância do minibatch e reescala com γ, β aprendidos. Na inferência usa médias móveis. |
| **Conexão residual** | Atalho que soma a entrada à saída do bloco: f(x) = x + g(x). |
| **DenseNet** | Cada camada recebe a concatenação das saídas de todas as anteriores. |

### Fórmulas

```text
BN(x) = γ ⊙ (x − μ̂_B)/σ̂_B + β
f(x) = x + g(x)
```

### Autoavaliação

1. Qual a ideia central da ResNet?
   - a) Kernels gigantes
   - b) Aprender um resíduo com atalho: f(x) = x + g(x)
   - c) Remover o pooling
   - d) Usar só convoluções 1×1
2. A DenseNet difere da ResNet porque…
   - a) Não usa convoluções
   - b) Concatena as saídas em vez de somá-las
   - c) Usa sigmoid
   - d) Não tem atalhos
3. Na inferência, a Batch Normalization usa…
   - a) Estatísticas do batch atual
   - b) Médias e variâncias móveis estimadas durante o treino
   - c) Valores aleatórios
   - d) Nada, é desligada
4. Um bloco Inception…
   - a) Usa um único kernel 7×7
   - b) Combina ramos paralelos (1×1, 3×3, 5×5, pooling) concatenados
   - c) É uma RNN
   - d) Remove canais
5. A principal ideia da VGG é…
   - a) Repetir blocos de convoluções 3×3 seguidos de pooling
   - b) Atenção
   - c) Conexões densas
   - d) Kernels 11×11
6. A AlexNet venceu o ImageNet 2012 usando…
   - a) SVMs e features manuais
   - b) ReLU, dropout, data augmentation e GPUs
   - c) Transformers
   - d) Árvores de decisão

**Verdadeiro ou falso?**

- Duas convoluções 3×3 empilhadas têm o mesmo campo receptivo de uma 5×5, com menos parâmetros.
- Conexões residuais tornam mais difícil treinar redes muito profundas.
- A NiN substitui as camadas totalmente conectadas finais por global average pooling.

<details><summary>✅ Gabarito</summary>

1. **b)** Aprender um resíduo com atalho: f(x) = x + g(x) — No pior caso o bloco aprende a identidade.
2. **b)** Concatena as saídas em vez de somá-las — Concatenação → reaproveitamento de features.
3. **b)** Médias e variâncias móveis estimadas durante o treino — Assim a previsão de um exemplo não depende dos outros do batch.
4. **b)** Combina ramos paralelos (1×1, 3×3, 5×5, pooling) concatenados — Captura padrões em várias escalas.
5. **a)** Repetir blocos de convoluções 3×3 seguidos de pooling — Profundidade com blocos simples e regulares.
6. **b)** ReLU, dropout, data augmentation e GPUs — Marco inicial da era do deep learning.

- **V** — 2·9 = 18 pesos por canal vs 25.
- **F** — É o contrário: facilitam o fluxo de gradientes.
- **V** — Menos parâmetros, menos overfitting.

</details>

### 🧩 Charada

> Quando a rede fica profunda demais e se perde, eu ofereço um atalho: somo a entrada à saída do bloco. No pior caso, o bloco aprende a identidade. Quem sou?

<details><summary>Resposta</summary>

**conexao residual** — A conexão residual (skip connection) da ResNet.

</details>

### 💻 Missão: Bloco residual

Implemente o bloco residual da ResNet com BatchNorm e teste com e sem convolução 1×1 no atalho.

```python
import torch
from torch import nn
from torch.nn import functional as F

class Residual(nn.Module):
    def __init__(self, channels, use_1x1=False, stride=1):
        super().__init__()
        self.conv1 = nn.LazyConv2d(channels, 3, padding=1, stride=stride)
        self.conv2 = nn.LazyConv2d(channels, 3, padding=1)
        self.conv3 = nn.LazyConv2d(channels, 1, stride=stride) if use_1x1 else None
        self.bn1, self.bn2 = nn.LazyBatchNorm2d(), nn.LazyBatchNorm2d()
    def forward(self, X):
        Y = F.relu(self.bn1(self.conv1(X)))
        Y = self.bn2(self.conv2(Y))
        if self.conv3: X = self.conv3(X)
        return F.relu(Y + X)                 # o atalho!

X = torch.randn(4, 3, 6, 6)
print(Residual(3)(X).shape)                          # (4, 3, 6, 6)
print(Residual(6, use_1x1=True, stride=2)(X).shape)  # (4, 6, 3, 3)
```

---

## 9. Redes Neurais Recorrentes (RNN)

🔁 **Chefão:** O Ouroboros Recorrente · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_recurrent-neural-networks/index.html)

### Resumo

Texto, áudio e séries temporais são **sequências**: a ordem importa. Começamos com **modelos autorregressivos**
e a hipótese de **Markov**. Para texto: **tokenização**, **vocabulário** (com `` para palavras raras)
e a **Lei de Zipf** (poucas palavras são muito frequentes).

Um **modelo de linguagem** estima P(x₁,…,x_T) = Π P(xₜ | x₁…xₜ₋₁). A RNN guarda um **estado oculto** Hₜ que resume o
passado e é atualizado a cada passo, **reutilizando os mesmos parâmetros**. Avaliamos com **perplexidade**
(quanto menor, melhor).

Treinamos com **backpropagation through time (BPTT)**, que pode explodir gradientes — por isso usamos
**gradient clipping** e às vezes truncamos a BPTT.

> 💡 **Analogia:** Ler um livro é recorrente: você não relê tudo a cada palavra — carrega um 'resumo mental' (estado oculto) e atualiza esse resumo a cada nova palavra.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Modelo autorregressivo** | Prevê o próximo valor usando os valores anteriores da própria sequência. |
| **Tokenização** | Dividir texto em unidades (palavras, caracteres, subpalavras). |
| **Modelo de linguagem** | Estima a probabilidade de sequências de tokens: P(xₜ \| x₁…xₜ₋₁). |
| **Estado oculto** | Hₜ = φ(XₜW_xh + Hₜ₋₁W_hh + b_h): memória que resume a sequência até t. |
| **Perplexidade** | exp da perda média de entropia cruzada. 1 = previsão perfeita. |
| **BPTT** | Backpropagation Through Time: backprop na RNN desenrolada no tempo. |
| **Gradient clipping** | Reescala o gradiente se sua norma passar de θ: g ← min(1, θ/‖g‖)·g. |

### Fórmulas

```text
Hₜ = φ(XₜW_xh + Hₜ₋₁W_hh + b_h)
PPL = exp(−1/n Σ log P(xₜ | x<ₜ))
g ← min(1, θ/‖g‖) · g
```

### Autoavaliação

1. O que diferencia uma RNN de um MLP?
   - a) Usa convoluções
   - b) Mantém um estado oculto que carrega informação dos passos anteriores
   - c) Não tem parâmetros
   - d) Só funciona com imagens
2. Perplexidade igual a 1 significa…
   - a) Modelo aleatório
   - b) Modelo prevê perfeitamente o próximo token
   - c) Modelo quebrado
   - d) Vocabulário de 1 palavra
3. O gradient clipping combate…
   - a) Overfitting
   - b) A explosão de gradientes
   - c) Dados faltantes
   - d) Underfitting
4. O que é BPTT?
   - a) Um tipo de pooling
   - b) Backprop através do tempo, na rede desenrolada ao longo da sequência
   - c) Um otimizador
   - d) Uma técnica de tokenização
5. A Lei de Zipf diz que…
   - a) Todas as palavras são igualmente frequentes
   - b) A frequência de uma palavra é aproximadamente inversamente proporcional ao seu ranking
   - c) Palavras longas são mais frequentes
   - d) O vocabulário é sempre pequeno
6. O token <unk> representa…
   - a) Início da frase
   - b) Palavras raras ou fora do vocabulário
   - c) Pontuação
   - d) Fim do arquivo

**Verdadeiro ou falso?**

- Em uma RNN, os mesmos parâmetros são reutilizados em todos os passos de tempo.
- Perplexidade maior indica um modelo de linguagem melhor.
- Truncar a BPTT após k passos reduz custo e ajuda na estabilidade numérica.

<details><summary>✅ Gabarito</summary>

1. **b)** Mantém um estado oculto que carrega informação dos passos anteriores — A recorrência dá memória à rede.
2. **b)** Modelo prevê perfeitamente o próximo token — Nenhuma 'surpresa'.
3. **b)** A explosão de gradientes — Limita a norma do gradiente.
4. **b)** Backprop através do tempo, na rede desenrolada ao longo da sequência — Backpropagation Through Time.
5. **b)** A frequência de uma palavra é aproximadamente inversamente proporcional ao seu ranking — Poucas palavras dominam o texto.
6. **b)** Palavras raras ou fora do vocabulário — Unknown — desconhecida.

- **V** — Por isso ela lida com sequências de qualquer tamanho.
- **F** — Menor perplexidade = menos surpresa = melhor.
- **V** — Troca um pouco de memória de longo prazo por estabilidade.

</details>

### 🧩 Charada

> Carrego uma memória que passo adiante a cada palavra que leio. Leio uma de cada vez, nunca tudo junto. Sou a 'mochila' da RNN. Quem sou?

<details><summary>Resposta</summary>

**estado oculto** — O estado oculto (hidden state).

</details>

### 💻 Missão: Brincando com nn.RNN

Entenda os shapes de entrada/saída de uma RNN no PyTorch.

```python
import torch
from torch import nn

vocab_size, num_hiddens, T, batch = 28, 32, 35, 2
rnn = nn.RNN(input_size=vocab_size, hidden_size=num_hiddens)

X = torch.randn(T, batch, vocab_size)   # (tempo, batch, features)
H0 = torch.zeros(1, batch, num_hiddens)
Y, Hn = rnn(X, H0)
print(Y.shape)    # (35, 2, 32)  -> estado em cada passo
print(Hn.shape)   # (1, 2, 32)   -> último estado

# gradient clipping durante o treino:
# torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
```

---

## 10. RNNs Modernas: LSTM, GRU e Seq2Seq

🧬 **Chefão:** O Tradutor de Três Portões · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_recurrent-modern/index.html)

### Resumo

RNNs simples esquecem rápido. A **LSTM** adiciona uma **célula de memória** e três **portões**:
**esquecimento** (o que apagar), **entrada** (o que gravar) e **saída** (o que mostrar). A **GRU** é uma versão
mais enxuta com portões de **reset** e **atualização**.

Podemos empilhar camadas (**RNNs profundas**) e ler a sequência nos dois sentidos (**RNNs bidirecionais**).

Para **tradução automática** usamos a arquitetura **encoder–decoder (seq2seq)**: o encoder lê a frase de origem e
produz um contexto; o decoder gera a tradução token a token. No treino usamos **teacher forcing**; na geração,
**busca gulosa** ou **beam search**. Avaliamos com **BLEU**.

> 💡 **Analogia:** A LSTM é um caderno com três guardiões: um apaga anotações velhas, outro decide o que vale anotar, e o terceiro escolhe o que você fala em voz alta.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **LSTM** | Long Short-Term Memory: RNN com célula de memória e portões de entrada, esquecimento e saída. |
| **GRU** | Gated Recurrent Unit: RNN com portões de reset e atualização; mais simples que a LSTM. |
| **RNN bidirecional** | Processa a sequência nos dois sentidos e combina os estados; usa contexto passado e futuro. |
| **Encoder–decoder** | Encoder transforma a entrada em representação; decoder gera a saída a partir dela. |
| **Teacher forcing** | No treino, o decoder recebe o token correto anterior em vez da própria previsão. |
| **Beam search** | Mantém os k melhores candidatos parciais a cada passo. k=1 é a busca gulosa. |
| **BLEU** | Métrica de tradução baseada na sobreposição de n-gramas com a referência. |

### Fórmulas

```text
Cₜ = Fₜ ⊙ Cₜ₋₁ + Iₜ ⊙ C̃ₜ
Hₜ = Oₜ ⊙ tanh(Cₜ)
GRU: Hₜ = Zₜ ⊙ Hₜ₋₁ + (1 − Zₜ) ⊙ H̃ₜ
```

### Autoavaliação

1. Qual portão da LSTM decide o que apagar da memória?
   - a) Entrada
   - b) Saída
   - c) Esquecimento
   - d) Reset
2. Quais portões a GRU possui?
   - a) Entrada, saída e esquecimento
   - b) Reset e atualização
   - c) Apenas um
   - d) Nenhum
3. Teacher forcing é…
   - a) Forçar a GPU
   - b) Alimentar o decoder com o token correto anterior durante o treino
   - c) Uma regularização L2
   - d) Um tipo de atenção
4. Beam search com tamanho de feixe k = 1 equivale a…
   - a) Busca exaustiva
   - b) Busca gulosa
   - c) Amostragem aleatória
   - d) Teacher forcing
5. A métrica BLEU mede…
   - a) Velocidade do modelo
   - b) Sobreposição de n-gramas entre tradução gerada e referência
   - c) Perplexidade
   - d) Número de parâmetros
6. Uma RNN bidirecional NÃO é adequada para…
   - a) Classificar frases inteiras
   - b) Marcação de partes do discurso
   - c) Gerar o próximo token em tempo real
   - d) Reconhecimento de entidades

**Verdadeiro ou falso?**

- LSTMs ajudam a mitigar o desaparecimento do gradiente em sequências longas.
- No seq2seq clássico, o encoder resume a entrada em um estado de contexto passado ao decoder.
- A busca gulosa sempre encontra a sequência de maior probabilidade.

<details><summary>✅ Gabarito</summary>

1. **c)** Esquecimento — Forget gate: Fₜ ⊙ Cₜ₋₁.
2. **b)** Reset e atualização — Reset gate e update gate.
3. **b)** Alimentar o decoder com o token correto anterior durante o treino — Acelera e estabiliza o treino do decoder.
4. **b)** Busca gulosa — Só mantém o melhor candidato a cada passo.
5. **b)** Sobreposição de n-gramas entre tradução gerada e referência — Com penalidade para traduções curtas demais.
6. **c)** Gerar o próximo token em tempo real — Ela precisa do futuro, que ainda não existe na geração.

- **V** — A célula de memória cria um caminho aditivo para o gradiente.
- **V** — Esse gargalo motivou o mecanismo de atenção.
- **F** — Escolhas locais ótimas nem sempre levam ao ótimo global.

</details>

### 🧩 Charada

> Tenho três guardiões: um decide o que esquecer, outro o que guardar e o último o que mostrar. Dentro de mim corre uma esteira de memória. Quem sou?

<details><summary>Resposta</summary>

**lstm** — LSTM!

</details>

### 💻 Missão: LSTM vs GRU

Compare número de parâmetros e shapes de LSTM e GRU.

```python
import torch
from torch import nn

lstm = nn.LSTM(input_size=28, hidden_size=32, num_layers=2, bidirectional=True)
gru  = nn.GRU(input_size=28, hidden_size=32, num_layers=2)

X = torch.randn(35, 4, 28)
Y, (H, C) = lstm(X)
print("LSTM:", Y.shape, H.shape, C.shape)   # (35,4,64) (4,4,32) (4,4,32)
Y, H = gru(X)
print("GRU :", Y.shape, H.shape)            # (35,4,32) (2,4,32)

count = lambda m: sum(p.numel() for p in m.parameters())
print("params LSTM:", count(lstm), "| GRU:", count(gru))
```

---

## 11. Mecanismos de Atenção e Transformers

⚡ **Chefão:** O Dragão Transformer · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_attention-mechanisms-and-transformers/index.html)

### Resumo

A **atenção** funciona como uma busca num banco de dados "macio": uma **query** é comparada com várias
**keys**; a semelhança vira pesos (via softmax) que misturam os **values**. A forma mais usada é a
**atenção por produto escalar escalado**: softmax(QKᵀ/√d)V.

Evolução: atenção de **Bahdanau** (o decoder olha para todo o encoder) → **multi-head attention** (várias atenções em
paralelo) → **self-attention** (Q, K e V vêm da mesma sequência) + **codificação posicional** (porque a atenção não
sabe a ordem) → o **Transformer**, só com atenção, residual + LayerNorm e FFN por posição.

Daí nascem o **Vision Transformer (ViT)**, que trata patches de imagem como tokens, e o pré-treino em larga escala:
**BERT** (encoder-only), **GPT** (decoder-only) e **T5** (encoder–decoder). A base dos LLMs modernos!

> 💡 **Analogia:** Atenção é como procurar algo numa biblioteca: sua pergunta (query) é comparada com as etiquetas das prateleiras (keys) e você lê mais dos livros (values) cujas etiquetas combinam melhor.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Query, Key, Value** | A query é comparada às keys; os pesos resultantes combinam os values. |
| **Atenção produto escalar escalado** | softmax(QKᵀ/√d)V; dividir por √d evita saturar a softmax. |
| **Multi-head attention** | Várias cabeças de atenção com projeções diferentes, concatenadas e projetadas. |
| **Self-attention** | Queries, keys e values vêm da mesma sequência; cada token olha para todos os outros. |
| **Codificação posicional** | Informação de posição somada aos embeddings (ex.: senos e cossenos). |
| **Transformer** | Arquitetura baseada só em atenção, com blocos residuais, LayerNorm e FFN posicional. |
| **Vision Transformer (ViT)** | Divide a imagem em patches e os trata como tokens de um Transformer. |
| **BERT / GPT / T5** | Encoder-only / decoder-only / encoder–decoder pré-treinados em larga escala. |

### Fórmulas

```text
Attention(Q,K,V) = softmax(QKᵀ / √d) V
PE(i,2j) = sin(i/10000^(2j/d)),  PE(i,2j+1) = cos(i/10000^(2j/d))
```

### Autoavaliação

1. Por que dividimos QKᵀ por √d?
   - a) Para deixar mais lento
   - b) Para evitar que produtos grandes saturem a softmax e gerem gradientes minúsculos
   - c) Para normalizar os values
   - d) Por tradição
2. Na self-attention…
   - a) Q, K e V vêm de sequências diferentes
   - b) Q, K e V vêm da mesma sequência
   - c) Não há keys
   - d) Só existe no decoder
3. Por que o Transformer precisa de codificação posicional?
   - a) Para reduzir parâmetros
   - b) Porque a self-attention ignora a ordem dos tokens
   - c) Para acelerar a GPU
   - d) Para substituir a softmax
4. Multi-head attention é…
   - a) Uma atenção com várias GPUs
   - b) Várias atenções paralelas com projeções diferentes, concatenadas
   - c) Uma RNN com várias camadas
   - d) Atenção sem softmax
5. A self-attention mascarada no decoder serve para…
   - a) Esconder tokens futuros durante o treino autoregressivo
   - b) Remover padding da imagem
   - c) Aumentar a perplexidade
   - d) Nada
6. O GPT é um Transformer do tipo…
   - a) Encoder-only
   - b) Decoder-only
   - c) Encoder–decoder
   - d) Convolucional

**Verdadeiro ou falso?**

- O custo da self-attention cresce quadraticamente com o comprimento da sequência.
- O Transformer original usa RNNs no encoder.
- O BERT é pré-treinado com modelagem de linguagem mascarada (MLM).

<details><summary>✅ Gabarito</summary>

1. **b)** Para evitar que produtos grandes saturem a softmax e gerem gradientes minúsculos — Com d grande, a variância do produto cresce com d.
2. **b)** Q, K e V vêm da mesma sequência — Cada token atende a todos os tokens da mesma sequência.
3. **b)** Porque a self-attention ignora a ordem dos tokens — Sem posição, 'cão morde homem' = 'homem morde cão'.
4. **b)** Várias atenções paralelas com projeções diferentes, concatenadas — Cada cabeça pode focar em relações diferentes.
5. **a)** Esconder tokens futuros durante o treino autoregressivo — O modelo não pode 'colar' olhando o futuro.
6. **b)** Decoder-only — BERT = encoder-only; T5 = encoder–decoder.

- **V** — Cada token interage com todos os outros: O(n²).
- **F** — 'Attention Is All You Need' — sem recorrência.
- **V** — Prevê tokens escondidos usando contexto dos dois lados.

</details>

### 🧩 Charada

> Faço uma pergunta (query), comparo com várias etiquetas (keys) e, conforme a semelhança, misturo os conteúdos (values). 'All you need' sou eu. Quem sou?

<details><summary>Resposta</summary>

**atencao** — O mecanismo de atenção!

</details>

### 💻 Missão: Atenção do zero

Implemente a atenção por produto escalar escalado e compare com nn.MultiheadAttention.

```python
import math, torch
from torch import nn

def attention(Q, K, V, mask=None):
    scores = Q @ K.transpose(-2, -1) / math.sqrt(Q.shape[-1])
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float("-inf"))
    weights = torch.softmax(scores, dim=-1)
    return weights @ V, weights

X = torch.randn(2, 5, 16)                       # (batch, tokens, d)
out, w = attention(X, X, X)                     # self-attention
print(out.shape, w.sum(-1))                     # pesos somam 1

causal = torch.tril(torch.ones(5, 5))           # máscara do decoder
out, w = attention(X, X, X, causal)
print(w[0].round(decimals=2))                   # triangular inferior

mha = nn.MultiheadAttention(embed_dim=16, num_heads=4, batch_first=True)
print(mha(X, X, X)[0].shape)                    # (2, 5, 16)
```

---

## 12. Algoritmos de Otimização

⛰️ **Chefão:** O Senhor dos Vales · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_optimization/index.html)

### Resumo

Otimizar é minimizar a perda de treino — mas em DL nos importamos com **generalização**. Os desafios:
**mínimos locais**, **pontos de sela** (muito comuns em alta dimensão) e **gradientes que desaparecem**.
Em funções **convexas**, todo mínimo local é global.

A família de otimizadores:

• **GD** → **SGD** → **SGD com minibatch** (o padrão).

• **Momentum**: acumula uma média exponencial dos gradientes ("velocidade").

• **AdaGrad**: taxa por coordenada, acumulando gradientes ao quadrado (decai demais).

• **RMSProp**: usa média móvel dos quadrados — resolve o decaimento do AdaGrad.

• **Adadelta** e **Adam**: Adam = momentum + RMSProp + correção de viés. O favorito da galera.

• **Agendamento da taxa**: decaimento por etapas, cosseno e **warmup**.

> 💡 **Analogia:** Momentum é uma bola de boliche descendo o vale: ela ganha embalo e não para em qualquer buraquinho. Adam é a bola com amortecedores inteligentes que ajustam a velocidade para cada direção.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Convexidade** | Em funções convexas, qualquer mínimo local é global — otimização 'fácil'. |
| **Ponto de sela** | Gradiente zero, mas não é mínimo nem máximo; comum em alta dimensão. |
| **Momentum** | vₜ = βvₜ₋₁ + gₜ; x ← x − ηvₜ. Suaviza oscilações e acelera em direções consistentes. |
| **AdaGrad** | Divide a taxa pela raiz da soma acumulada dos gradientes ao quadrado, por coordenada. |
| **RMSProp** | Como AdaGrad, mas usa média móvel exponencial dos quadrados (não decai para zero). |
| **Adam** | Combina momentum (1º momento) e RMSProp (2º momento) com correção de viés. |
| **Warmup** | Começar o treino com taxa pequena e aumentá-la gradualmente nas primeiras iterações. |

### Fórmulas

```text
vₜ = β₁vₜ₋₁ + (1−β₁)gₜ,  sₜ = β₂sₜ₋₁ + (1−β₂)gₜ²
v̂ = vₜ/(1−β₁ᵗ),  ŝ = sₜ/(1−β₂ᵗ)
x ← x − η v̂ / (√ŝ + ε)
```

### Autoavaliação

1. O que o momentum faz?
   - a) Zera gradientes antigos
   - b) Acumula média exponencial dos gradientes, suavizando oscilações
   - c) Aumenta o batch
   - d) Aplica dropout
2. O Adam combina…
   - a) Dropout e BatchNorm
   - b) Momentum (1º momento) e escala adaptativa estilo RMSProp (2º momento), com correção de viés
   - c) SGD e AdaGrad sem momento
   - d) Newton e BFGS
3. Qual o problema do AdaGrad em deep learning?
   - a) Não converge em convexas
   - b) A taxa efetiva decai demais, pois a soma dos quadrados só cresce
   - c) É muito barato
   - d) Não usa gradientes
4. Um ponto de sela é…
   - a) O mínimo global
   - b) Um ponto com gradiente zero que não é mínimo nem máximo
   - c) Um ponto com gradiente infinito
   - d) O ponto inicial
5. Warmup da taxa de aprendizado significa…
   - a) Começar com lr pequena e aumentar no início
   - b) Começar com lr enorme
   - c) Aquecer a GPU
   - d) Treinar sem dados
6. Em uma função convexa…
   - a) Há muitos mínimos locais ruins
   - b) Todo mínimo local é global
   - c) Não existe mínimo
   - d) O gradiente é sempre zero

**Verdadeiro ou falso?**

- Em alta dimensão, pontos de sela são mais comuns que mínimos locais ruins.
- Uma taxa de aprendizado alta demais pode fazer a perda divergir.
- SGD com batch de tamanho 1 é sempre o mais eficiente em GPUs.

<details><summary>✅ Gabarito</summary>

1. **b)** Acumula média exponencial dos gradientes, suavizando oscilações — Velocidade acumulada nas direções consistentes.
2. **b)** Momentum (1º momento) e escala adaptativa estilo RMSProp (2º momento), com correção de viés — Por isso é tão robusto por padrão.
3. **b)** A taxa efetiva decai demais, pois a soma dos quadrados só cresce — RMSProp corrige com média móvel.
4. **b)** Um ponto com gradiente zero que não é mínimo nem máximo — Sobe em uma direção, desce em outra.
5. **a)** Começar com lr pequena e aumentar no início — Evita instabilidade no começo, muito usado em Transformers.
6. **b)** Todo mínimo local é global — Propriedade-chave da convexidade.

- **V** — Para ser mínimo, todas as direções precisam 'subir'.
- **V** — Os passos ultrapassam o vale e explodem.
- **F** — Batches maiores aproveitam o paralelismo vetorizado.

</details>

### 🧩 Charada

> Sou uma bola rolando morro abaixo: guardo a velocidade dos passos anteriores, então não paro em qualquer buraquinho e oscilo menos nos vales estreitos. Quem sou?

<details><summary>Resposta</summary>

**momentum** — Momentum!

</details>

### 💻 Missão: Corrida de otimizadores

Compare SGD, Momentum, RMSProp e Adam minimizando uma função simples.

```python
import torch

def f(x):  # vale alongado: difícil para SGD puro
    return 0.1 * x[0]**2 + 2 * x[1]**2

for name, make in {
    "SGD":      lambda p: torch.optim.SGD(p, lr=0.4),
    "Momentum": lambda p: torch.optim.SGD(p, lr=0.4, momentum=0.5),
    "RMSProp":  lambda p: torch.optim.RMSprop(p, lr=0.1),
    "Adam":     lambda p: torch.optim.Adam(p, lr=0.5),
}.items():
    x = torch.tensor([-5.0, -2.0], requires_grad=True)
    opt = make([x])
    for _ in range(30):
        opt.zero_grad(); f(x).backward(); opt.step()
    print(f"{name:9s} f(x) = {f(x).item():.6f}")
```

---

## 13. Performance Computacional

🏎️ **Chefão:** O Colosso Multi-GPU · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_computational-performance/index.html)

### Resumo

Treinar rápido é uma arte. Programação **imperativa** (Python linha a linha) é flexível; **simbólica/compilada**
permite otimizar o grafo. O melhor dos dois mundos é a **hibridização** (no PyTorch: TorchScript e `torch.compile`).

Frameworks executam de forma **assíncrona**: o Python enfileira operações e o backend executa — chamar
`.item()` ou `print` força **sincronização**. Também há **paralelismo automático** entre CPU e GPU.

Conheça o **hardware** (latências, memória, largura de banda) e escale com várias GPUs: **paralelismo de dados**
(cada GPU com uma cópia do modelo e parte do batch, gradientes agregados com **all-reduce**), **paralelismo de modelo**
e **servidores de parâmetros**.

> 💡 **Analogia:** Paralelismo de dados é uma cozinha com 4 chefs fazendo a mesma receita, cada um com parte dos ingredientes. No fim eles comparam anotações (all-reduce) para que todos ajustem a receita igual.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Programação imperativa** | Executa operação por operação; fácil de depurar, mais overhead. |
| **Programação simbólica / compilação** | Define o grafo antes de executar; permite otimizações globais. |
| **Computação assíncrona** | O frontend enfileira operações enquanto o backend as executa em paralelo. |
| **Paralelismo de dados** | Cada dispositivo tem uma cópia do modelo e processa parte do minibatch. |
| **Paralelismo de modelo** | Partes (camadas) do modelo ficam em dispositivos diferentes. |
| **All-reduce** | Operação coletiva que soma gradientes de todos os dispositivos e distribui o resultado. |
| **Servidor de parâmetros** | Arquitetura em que servidores guardam e atualizam parâmetros para muitos workers. |

### Fórmulas

```text
batch efetivo = batch por GPU × nº de GPUs
g = (1/k) Σᵢ gᵢ  (all-reduce)
```

### Autoavaliação

1. Em paralelismo de dados…
   - a) Cada GPU tem uma camada diferente
   - b) Cada GPU tem uma cópia do modelo e processa parte do batch; gradientes são agregados
   - c) Só uma GPU treina
   - d) Os dados são duplicados em todas sem divisão
2. Vantagem da programação simbólica/compilada:
   - a) Mais fácil de depurar
   - b) Otimizações de grafo e menos overhead do Python
   - c) Não precisa de GPU
   - d) Treina sem dados
3. O que é computação assíncrona nos frameworks?
   - a) Treinar em dias diferentes
   - b) O frontend enfileira operações enquanto o backend executa
   - c) Usar duas linguagens
   - d) Desligar a GPU
4. Ao usar k GPUs com paralelismo de dados, é comum…
   - a) Diminuir o batch
   - b) Aumentar o batch total e ajustar a taxa de aprendizado
   - c) Usar lr zero
   - d) Desativar o otimizador
5. All-reduce serve para…
   - a) Reduzir o modelo
   - b) Agregar (somar/média) gradientes de todos os dispositivos e distribuir o resultado
   - c) Apagar a memória
   - d) Comprimir imagens
6. Um gargalo comum no treino distribuído é…
   - a) A cor da GPU
   - b) A comunicação/largura de banda entre dispositivos
   - c) O nome das variáveis
   - d) O tamanho do monitor

**Verdadeiro ou falso?**

- Chamar .item() ou print em um tensor pode forçar sincronização e quebrar a assincronia.
- Paralelismo de modelo divide partes/camadas do modelo entre GPUs.
- Adicionar GPUs sempre gera speedup linear perfeito.

<details><summary>✅ Gabarito</summary>

1. **b)** Cada GPU tem uma cópia do modelo e processa parte do batch; gradientes são agregados — É a estratégia multi-GPU mais comum.
2. **b)** Otimizações de grafo e menos overhead do Python — Fusão de operações, reuso de memória, portabilidade.
3. **b)** O frontend enfileira operações enquanto o backend executa — Esconde a latência do Python.
4. **b)** Aumentar o batch total e ajustar a taxa de aprendizado — Mantém cada GPU ocupada.
5. **b)** Agregar (somar/média) gradientes de todos os dispositivos e distribuir o resultado — Todos terminam com o mesmo gradiente.
6. **b)** A comunicação/largura de banda entre dispositivos — Comunicar pode custar mais que calcular.

- **V** — O Python precisa esperar o valor ficar pronto.
- **V** — Útil quando o modelo não cabe numa GPU.
- **F** — Comunicação e sincronização têm custo.

</details>

### 🧩 Charada

> Sou a ponte entre o Python flexível e a velocidade dos grafos compilados: escreva imperativo, rode otimizado. No PyTorch 2 me chamam com torch.______. Quem sou?

<details><summary>Resposta</summary>

**compile** — torch.compile — hibridização moderna.

</details>

### 💻 Missão: Medindo a assincronia

Meça tempos com e sem sincronização e experimente torch.compile.

```python
import time, torch

device = "cuda" if torch.cuda.is_available() else "cpu"
x = torch.randn(4096, 4096, device=device)

t = time.time()
for _ in range(10): y = x @ x
print("enfileirado em", round(time.time() - t, 4), "s")
if device == "cuda": torch.cuda.synchronize()
print("concluído em  ", round(time.time() - t, 4), "s")

net = torch.nn.Sequential(torch.nn.Linear(512, 512), torch.nn.ReLU(), torch.nn.Linear(512, 10)).to(device)
fast = torch.compile(net)          # PyTorch 2.x
print(fast(torch.randn(64, 512, device=device)).shape)

# multi-GPU: torch.nn.parallel.DistributedDataParallel (DDP)
```

---

## 14. Visão Computacional

📷 **Chefão:** O Ciclope Detector · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_computer-vision/index.html)

### Resumo

Aplicações práticas de visão:

• **Data augmentation**: flips, recortes, cores — mais variedade, menos overfitting.

• **Fine-tuning**: aproveite um modelo pré-treinado (ImageNet), troque a camada de saída e ajuste com lr menor.

• **Detecção de objetos**: **bounding boxes**, **anchor boxes**, **IoU** e **non-maximum suppression (NMS)**;
detecção multiescala, **SSD** e a família **R-CNN** (Fast, Faster com RPN, Mask R-CNN).

• **Segmentação semântica**: classificar cada pixel; **convolução transposta** para aumentar resolução e
**FCN** (fully convolutional network).

• **Transferência de estilo**: combinar conteúdo de uma imagem com o estilo de outra (matriz de Gram).

• Projetos Kaggle: CIFAR-10 e raças de cães (ImageNet Dogs).

> 💡 **Analogia:** Fine-tuning é contratar um fotógrafo experiente e só ensinar a ele o que sua loja vende — muito mais rápido que treinar alguém que nunca viu uma câmera.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Data augmentation** | Transformações aleatórias nas imagens de treino para aumentar a diversidade. |
| **Fine-tuning** | Reaproveitar um modelo pré-treinado e ajustá-lo para uma nova tarefa. |
| **Anchor box** | Caixas pré-definidas de vários tamanhos/proporções usadas como candidatas na detecção. |
| **IoU** | Intersection over Union: área da interseção ÷ área da união de duas caixas. |
| **NMS** | Non-Maximum Suppression: remove caixas sobrepostas, mantendo a de maior confiança. |
| **Segmentação semântica** | Atribuir uma classe a cada pixel da imagem. |
| **Convolução transposta** | Operação que aumenta a resolução espacial (upsampling aprendível). |
| **Matriz de Gram** | Correlações entre canais de features; captura o 'estilo' de uma imagem. |

### Fórmulas

```text
IoU(A, B) = |A ∩ B| / |A ∪ B|
```

### Autoavaliação

1. Qual o IoU de duas caixas idênticas?
   - a) 0
   - b) 0,5
   - c) 1
   - d) 2
2. O NMS serve para…
   - a) Aumentar o número de caixas
   - b) Remover caixas redundantes sobrepostas, mantendo a mais confiante
   - c) Normalizar pixels
   - d) Treinar o backbone
3. No fine-tuning, normalmente…
   - a) Reinicializamos tudo
   - b) Reaproveitamos pesos pré-treinados e usamos lr menor nas camadas pré-treinadas
   - c) Removemos todas as convoluções
   - d) Usamos lr gigante
4. A convolução transposta é usada para…
   - a) Reduzir a resolução
   - b) Aumentar a resolução (upsampling)
   - c) Calcular IoU
   - d) Fazer pooling
5. Na transferência de estilo, o estilo é capturado por…
   - a) Histograma de cores
   - b) Matriz de Gram das features
   - c) Bounding boxes
   - d) Rótulos de classe
6. A grande novidade do Faster R-CNN foi…
   - a) Region Proposal Network (RPN)
   - b) Usar RNNs
   - c) Remover anchor boxes
   - d) Segmentação de instâncias

**Verdadeiro ou falso?**

- Segmentação semântica classifica cada pixel da imagem.
- Data augmentation aleatória deve ser aplicada ao conjunto de teste por padrão.
- Mask R-CNN estende o Faster R-CNN para segmentação de instâncias.

<details><summary>✅ Gabarito</summary>

1. **c)** 1 — Interseção = união.
2. **b)** Remover caixas redundantes sobrepostas, mantendo a mais confiante — Evita várias detecções do mesmo objeto.
3. **b)** Reaproveitamos pesos pré-treinados e usamos lr menor nas camadas pré-treinadas — A nova camada de saída pode ter lr maior.
4. **b)** Aumentar a resolução (upsampling) — Essencial em segmentação e GANs.
5. **b)** Matriz de Gram das features — Correlação entre canais.
6. **a)** Region Proposal Network (RPN) — Propostas de regiões aprendidas pela própria rede.

- **V** — Saída do mesmo tamanho da entrada.
- **F** — Normalmente só no treino (exceto técnicas como TTA).
- **V** — Adiciona um ramo que prevê máscaras.

</details>

### 🧩 Charada

> Meço a amizade entre caixas: divido o que elas compartilham pelo total que ocupam juntas. Se valho 1, são gêmeas; se valho 0, nem se tocam. Quem sou?

<details><summary>Resposta</summary>

**iou** — IoU — Intersection over Union (índice de Jaccard).

</details>

### 💻 Missão: Fine-tuning de uma ResNet-18

Carregue uma ResNet-18 pré-treinada e adapte para 2 classes (ex.: cachorro-quente vs não).

```python
import torch, torchvision
from torch import nn

net = torchvision.models.resnet18(weights="IMAGENET1K_V1")
net.fc = nn.Linear(net.fc.in_features, 2)        # nova cabeça

params_backbone = [p for n, p in net.named_parameters() if not n.startswith("fc")]
opt = torch.optim.SGD([
    {"params": params_backbone, "lr": 1e-4},       # lr pequena
    {"params": net.fc.parameters(), "lr": 1e-3},   # lr maior na cabeça
], momentum=0.9, weight_decay=1e-3)

from torchvision.ops import box_iou, nms
a = torch.tensor([[0, 0, 10, 10.]]); b = torch.tensor([[5, 5, 15, 15.]])
print(box_iou(a, b))   # 25 / 175 ≈ 0.1429
```

---

## 15. PLN: Pré-treinamento

📚 **Chefão:** O Oráculo dos Embeddings · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_natural-language-processing-pretraining/index.html)

### Resumo

Como representar palavras para uma rede? Vetores one-hot não capturam semelhança. Os **word embeddings**
colocam palavras num espaço contínuo onde significados parecidos ficam próximos.

• **word2vec**: **skip-gram** (centro → contexto) e **CBOW** (contexto → centro).

• Treino eficiente: **negative sampling** e **hierarchical softmax** (evitam a softmax sobre o vocabulário inteiro).

• **GloVe**: usa estatísticas globais de coocorrência.

• **fastText**: embeddings de **subpalavras** (n-gramas de caracteres) e **BPE** (byte pair encoding).

• **BERT**: embeddings **contextuais**, pré-treinado com **MLM** (masked language model) e **NSP**
(next sentence prediction).

> 💡 **Analogia:** Embeddings são um mapa da cidade das palavras: 'gato' mora no bairro dos bichos, ao lado de 'cachorro'; 'rei' e 'rainha' moram na mesma rua, separados pela mesma distância que 'homem' e 'mulher'.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Word embedding** | Vetor denso e contínuo que representa uma palavra; palavras similares ficam próximas. |
| **Skip-gram** | Prevê palavras de contexto a partir da palavra central. |
| **CBOW** | Continuous Bag of Words: prevê a palavra central a partir do contexto. |
| **Negative sampling** | Treina distinguindo pares reais de pares com palavras 'negativas' amostradas. |
| **GloVe** | Embeddings treinados a partir da matriz global de coocorrência de palavras. |
| **BPE** | Byte Pair Encoding: funde iterativamente os pares de símbolos mais frequentes em subpalavras. |
| **BERT** | Encoder Transformer pré-treinado com MLM e NSP; gera representações contextuais. |

### Fórmulas

```text
P(w_o | w_c) = exp(u_oᵀv_c) / Σᵢ exp(uᵢᵀv_c)
rei − homem + mulher ≈ rainha
```

### Autoavaliação

1. O skip-gram prevê…
   - a) A palavra central a partir do contexto
   - b) As palavras de contexto a partir da palavra central
   - c) A próxima frase
   - d) O sentimento
2. Negative sampling serve para…
   - a) Remover palavras negativas
   - b) Evitar a softmax sobre o vocabulário inteiro, amostrando exemplos negativos
   - c) Gerar sentimentos negativos
   - d) Aumentar o vocabulário
3. Vantagem do fastText:
   - a) Não precisa de dados
   - b) Lida com palavras raras/novas usando n-gramas de subpalavras
   - c) É um Transformer
   - d) Usa imagens
4. O BPE…
   - a) Funde iterativamente os pares de símbolos mais frequentes
   - b) Remove stopwords
   - c) É uma métrica
   - d) Ordena o vocabulário
5. O que o BERT oferece que o word2vec não oferece?
   - a) Vetores one-hot
   - b) Embeddings contextuais: a mesma palavra muda de vetor conforme o contexto
   - c) Menos parâmetros
   - d) Nada
6. Na MLM do BERT, aproximadamente quantos tokens são selecionados para predição?
   - a) 1%
   - b) 15%
   - c) 50%
   - d) 100%

**Verdadeiro ou falso?**

- Vetores one-hot capturam bem a similaridade entre palavras.
- GloVe usa estatísticas globais de coocorrência de palavras.
- Embeddings word2vec permitem analogias como rei − homem + mulher ≈ rainha.

<details><summary>✅ Gabarito</summary>

1. **b)** As palavras de contexto a partir da palavra central — CBOW faz o contrário.
2. **b)** Evitar a softmax sobre o vocabulário inteiro, amostrando exemplos negativos — Transforma o problema em classificações binárias baratas.
3. **b)** Lida com palavras raras/novas usando n-gramas de subpalavras — 'desconhecidamente' ainda tem pedaços conhecidos.
4. **a)** Funde iterativamente os pares de símbolos mais frequentes — Cria um vocabulário de subpalavras.
5. **b)** Embeddings contextuais: a mesma palavra muda de vetor conforme o contexto — 'banco' de sentar ≠ 'banco' de dinheiro.
6. **b)** 15% — Desses, 80% viram [MASK], 10% token aleatório, 10% inalterados.

- **F** — O cosseno entre quaisquer dois one-hots diferentes é 0.
- **V** — Global Vectors.
- **V** — Relações viram direções no espaço.

</details>

### 🧩 Charada

> Pego uma palavra e a transformo num ponto num espaço de muitas dimensões, onde 'gato' mora perto de 'cachorro'. Quem sou?

<details><summary>Resposta</summary>

**embedding** — Word embedding!

</details>

### 💻 Missão: Explorando embeddings

Crie uma camada de embedding e calcule similaridade de cosseno.

```python
import torch
from torch import nn

vocab = {"gato": 0, "cachorro": 1, "carro": 2, "rei": 3, "rainha": 4}
emb = nn.Embedding(num_embeddings=len(vocab), embedding_dim=8)

def vec(w): return emb(torch.tensor(vocab[w]))
cos = nn.CosineSimilarity(dim=0)
print(cos(vec("gato"), vec("cachorro")).item())  # aleatório antes de treinar!

# Com vetores GloVe pré-treinados (via d2l ou torchtext),
# 'gato' e 'cachorro' ficariam bem próximos.
```

---

## 16. PLN: Aplicações

💬 **Chefão:** O Juiz das Inferências · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_natural-language-processing-applications/index.html)

### Resumo

Com representações pré-treinadas em mãos, resolvemos tarefas reais:

• **Análise de sentimentos** (IMDb): classificar textos como positivos/negativos usando
**RNN bidirecional** com GloVe ou **textCNN** (convoluções 1D + max-over-time pooling).

• **Inferência de linguagem natural (NLI)** no dataset SNLI: dada uma **premissa** e uma **hipótese**, decidir entre
**implicação**, **contradição** ou **neutro**. Modelo de **atenção decomponível**: _atender → comparar → agregar_.

• **Fine-tuning do BERT** para classificação de um texto, de pares de textos, marcação de tokens e perguntas e respostas
(prevendo início e fim do trecho da resposta).

> 💡 **Analogia:** NLI é um detetive: lê o depoimento (premissa) e a suspeita (hipótese) e decide se a suspeita é confirmada, desmentida ou se não dá para concluir nada.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Análise de sentimentos** | Classificar a polaridade (positiva/negativa) de um texto. |
| **textCNN** | CNN para texto: convoluções 1D com vários tamanhos + max-over-time pooling. |
| **NLI** | Natural Language Inference: classificar a relação premissa–hipótese (implicação, contradição, neutro). |
| **Atenção decomponível** | Modelo de NLI em três etapas: atender, comparar e agregar. |
| **Token [CLS]** | Token especial do BERT cuja representação resume a entrada para classificação. |
| **Fine-tuning do BERT** | Adicionar uma pequena camada de saída e ajustar todos os parâmetros na tarefa-alvo. |

### Fórmulas

```text
classe = softmax(W · h_[CLS] + b)
```

### Autoavaliação

1. Quais são as classes da NLI?
   - a) Positivo, negativo, neutro
   - b) Implicação, contradição, neutro
   - c) Verdadeiro, falso
   - d) Pergunta, resposta
2. O textCNN usa…
   - a) Convoluções 2D em imagens
   - b) Convoluções 1D sobre a sequência + max-over-time pooling
   - c) Apenas RNNs
   - d) Árvores
3. As etapas da atenção decomponível são…
   - a) Codificar, decodificar, traduzir
   - b) Atender, comparar, agregar
   - c) Tokenizar, embutir, classificar
   - d) Amostrar, filtrar, ranquear
4. Para classificação de texto com BERT, usamos…
   - a) A representação do token [CLS] + uma camada de saída
   - b) Só o último token
   - c) Embeddings one-hot
   - d) Uma CNN 2D
5. Em perguntas e respostas (estilo SQuAD) com BERT, o modelo prevê…
   - a) Uma nota de 0 a 5
   - b) As posições de início e fim do trecho da resposta
   - c) A próxima frase
   - d) A tradução
6. Por que usar GloVe pré-treinado na análise de sentimentos?
   - a) Deixa o modelo maior sem motivo
   - b) Transfere conhecimento semântico, ajudando quando há poucos dados
   - c) Remove a necessidade de treino
   - d) Traduz o texto

**Verdadeiro ou falso?**

- Análise de sentimentos é um problema de classificação de texto.
- No fine-tuning do BERT, todos os parâmetros podem ser ajustados junto com a nova camada de saída.
- NLI recebe um único texto como entrada.

<details><summary>✅ Gabarito</summary>

1. **b)** Implicação, contradição, neutro — Entailment, contradiction, neutral.
2. **b)** Convoluções 1D sobre a sequência + max-over-time pooling — Kernels de larguras diferentes capturam n-gramas.
3. **b)** Atender, comparar, agregar — Attend, compare, aggregate.
4. **a)** A representação do token [CLS] + uma camada de saída — [CLS] resume a sequência inteira.
5. **b)** As posições de início e fim do trecho da resposta — A resposta é um trecho (span) do texto.
6. **b)** Transfere conhecimento semântico, ajudando quando há poucos dados — Transfer learning para texto.

- **V** — Geralmente binária ou com poucas classes.
- **V** — Essa é a abordagem padrão.
- **F** — Recebe um par: premissa e hipótese.

</details>

### 🧩 Charada

> Leio uma premissa e uma hipótese e decido: uma implica a outra, se contradizem, ou nada a ver. Que tarefa sou? (sigla em inglês)

<details><summary>Resposta</summary>

**nli** — NLI — Natural Language Inference.

</details>

### 💻 Missão: textCNN em 15 linhas

Implemente a textCNN para classificação de sentimentos.

```python
import torch
from torch import nn

class TextCNN(nn.Module):
    def __init__(self, vocab_size, embed=100, kernels=(3, 4, 5), channels=100):
        super().__init__()
        self.emb = nn.Embedding(vocab_size, embed)
        self.convs = nn.ModuleList(nn.Conv1d(embed, channels, k) for k in kernels)
        self.drop, self.out = nn.Dropout(0.5), nn.Linear(channels * len(kernels), 2)
    def forward(self, tokens):                       # (batch, seq)
        x = self.emb(tokens).permute(0, 2, 1)        # (batch, embed, seq)
        feats = [torch.relu(c(x)).max(dim=2).values for c in self.convs]
        return self.out(self.drop(torch.cat(feats, dim=1)))

net = TextCNN(vocab_size=5000)
print(net(torch.randint(0, 5000, (8, 50))).shape)   # (8, 2)
```

---

## 17. Aprendizado por Reforço

🎮 **Chefão:** O Agente Errante · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_reinforcement-learning/index.html)

### Resumo

Um **agente** interage com um **ambiente**: observa um **estado**, toma uma **ação**, recebe uma
**recompensa** e vai para um novo estado. Formalizamos isso como um **Processo de Decisão de Markov (MDP)**
com (S, A, T, r, γ).

O objetivo é uma **política** π que maximize o **retorno descontado** (γ pondera o futuro). As funções
**valor** V(s) e **valor-ação** Q(s,a) obedecem à **equação de Bellman**.

• **Value iteration**: quando conhecemos o modelo do ambiente, aplicamos Bellman repetidamente.

• **Q-learning**: sem conhecer o modelo, aprendemos Q a partir de experiências, explorando com **ε-greedy**.

> 💡 **Analogia:** É como treinar um cachorro: ninguém diz a ele a sequência certa de movimentos, mas ele ganha petisco (recompensa) quando acerta e aprende, por tentativa e erro, o que vale a pena.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **MDP** | Processo de Decisão de Markov: estados S, ações A, transições T, recompensas r e desconto γ. |
| **Política (π)** | Regra que escolhe uma ação em cada estado. |
| **Fator de desconto (γ)** | Valor em [0,1] que pondera recompensas futuras. γ=0 → só o agora. |
| **Função valor Q(s,a)** | Retorno esperado ao tomar a ação a no estado s e seguir a política depois. |
| **Equação de Bellman** | Relaciona o valor de um estado ao valor dos estados seguintes. |
| **Q-learning** | Algoritmo sem modelo, off-policy: Q ← Q + α[r + γ max Q(s',a') − Q]. |
| **ε-greedy** | Com prob. ε escolhe ação aleatória (explorar), senão a melhor conhecida (explorar o conhecido). |

### Fórmulas

```text
V*(s) = maxₐ Σ_{s'} P(s'|s,a)[r(s,a) + γ V*(s')]
Q(s,a) ← Q(s,a) + α [r + γ maxₐ' Q(s',a') − Q(s,a)]
```

### Autoavaliação

1. O fator de desconto γ…
   - a) Define a taxa de aprendizado
   - b) Pondera recompensas futuras, entre 0 e 1
   - c) Conta o número de estados
   - d) É a probabilidade de exploração
2. O Q-learning é…
   - a) On-policy e baseado em modelo
   - b) Off-policy e sem modelo
   - c) Supervisionado
   - d) Uma CNN
3. Na estratégia ε-greedy…
   - a) Sempre escolhe a melhor ação
   - b) Com prob. ε age aleatoriamente; senão escolhe a melhor ação
   - c) Nunca explora
   - d) Escolhe a pior ação
4. O value iteration requer…
   - a) Nada
   - b) Conhecer o modelo do ambiente (transições e recompensas)
   - c) Uma GPU
   - d) Dados rotulados
5. A equação de Bellman relaciona…
   - a) Perda e acurácia
   - b) O valor de um estado ao valor dos estados seguintes
   - c) Pesos e vieses
   - d) Treino e teste
6. Q(s,a) representa…
   - a) A recompensa imediata apenas
   - b) O retorno esperado ao tomar a ação a em s e seguir a política
   - c) A probabilidade do estado
   - d) O número de ações

**Verdadeiro ou falso?**

- Com γ = 0, o agente só se importa com a recompensa imediata.
- Em RL há sempre um rótulo correto para cada ação.
- Sem exploração, o agente pode ficar preso em uma política subótima.

<details><summary>✅ Gabarito</summary>

1. **b)** Pondera recompensas futuras, entre 0 e 1 — Recompensas distantes valem menos.
2. **b)** Off-policy e sem modelo — Aprende Q* independentemente da política usada para explorar.
3. **b)** Com prob. ε age aleatoriamente; senão escolhe a melhor ação — Equilíbrio exploração vs. exploração do conhecido.
4. **b)** Conhecer o modelo do ambiente (transições e recompensas) — É planejamento, não aprendizado por experiência.
5. **b)** O valor de um estado ao valor dos estados seguintes — Valor = recompensa imediata + valor futuro descontado.
6. **b)** O retorno esperado ao tomar a ação a em s e seguir a política — Quanto vale fazer a em s.

- **V** — Míope total.
- **F** — Só há recompensas, muitas vezes atrasadas.
- **V** — Precisa experimentar para descobrir algo melhor.

</details>

### 🧩 Charada

> Sou uma tabela de sabedoria: para cada estado e cada ação, guardo quanto vale a pena. Atualizo-me com a recompensa mais o melhor futuro. Que algoritmo me usa?

<details><summary>Resposta</summary>

**q-learning** — Q-learning e sua tabela Q.

</details>

### 💻 Missão: Q-learning num corredor

Um agente num corredor de 6 casas aprende a andar até o tesouro na última casa.

```python
import random

N, actions = 6, [-1, +1]            # esquerda, direita
Q = [[0.0, 0.0] for _ in range(N)]
alpha, gamma, eps = 0.5, 0.9, 0.2

for episode in range(200):
    s = 0
    while s != N - 1:
        a = random.randrange(2) if random.random() < eps else max((0, 1), key=lambda i: Q[s][i])
        s2 = min(max(s + actions[a], 0), N - 1)
        r = 1.0 if s2 == N - 1 else 0.0
        Q[s][a] += alpha * (r + gamma * max(Q[s2]) - Q[s][a])
        s = s2

print(["→" if q[1] > q[0] else "←" for q in Q[:-1]])   # política aprendida
```

---

## 18. Processos Gaussianos

🌫️ **Chefão:** A Névoa das Funções · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_gaussian-processes/index.html)

### Resumo

Um **processo gaussiano (GP)** é uma **distribuição sobre funções**: qualquer conjunto finito de pontos da
função segue uma **gaussiana multivariada**. Ele é definido por uma **função média** e uma **função kernel**
(covariância), que diz quão parecidos são os valores da função em dois pontos.

O kernel **RBF** é o mais popular; seu **lengthscale** controla a suavidade. Dados os pontos observados, a
**posterior** tem forma fechada: dá uma previsão **e** uma **incerteza** (que cresce longe dos dados).

Os hiperparâmetros do kernel são aprendidos maximizando a **verossimilhança marginal**. A inferência exata custa
**O(n³)**. Na prática, use **GPyTorch**. GPs são o motor da **otimização bayesiana**.

> 💡 **Analogia:** Um GP é como um desenhista que diz: 'Não sei exatamente a curva, mas aqui estão mil curvas plausíveis'. Onde você mostrou pontos, as curvas se apertam; longe deles, elas se espalham (incerteza).

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Processo gaussiano** | Distribuição sobre funções; qualquer conjunto finito de valores é gaussiano conjunto. |
| **Kernel (covariância)** | Função k(x, x') que mede a similaridade entre valores da função em dois pontos. |
| **Kernel RBF** | k(x,x') = a²·exp(−‖x−x'‖² / 2ℓ²). Gera funções suaves. |
| **Lengthscale (ℓ)** | Controla quão rápido a função varia. ℓ grande → funções mais suaves. |
| **Posterior do GP** | Distribuição das funções após observar dados: média e variância em forma fechada. |
| **Verossimilhança marginal** | Probabilidade dos dados integrando sobre funções; usada para ajustar hiperparâmetros. |

### Fórmulas

```text
f ~ GP(m(x), k(x, x'))
k_RBF(x,x') = a² exp(−‖x−x'‖² / (2ℓ²))
μ* = K*ᵀ (K + σ²I)⁻¹ y
```

### Autoavaliação

1. O kernel de um GP define…
   - a) A taxa de aprendizado
   - b) A covariância/similaridade entre valores da função em pontos diferentes
   - c) O número de camadas
   - d) A perda
2. Um lengthscale grande produz…
   - a) Funções muito oscilantes
   - b) Funções mais suaves, que variam lentamente
   - c) Nenhuma função
   - d) Ruído puro
3. Grande vantagem dos GPs:
   - a) Escalam para bilhões de pontos
   - b) Fornecem incerteza calibrada nas previsões
   - c) Não têm hiperparâmetros
   - d) Só funcionam com imagens
4. O custo da inferência exata de um GP com n pontos é…
   - a) O(1)
   - b) O(n)
   - c) O(n log n)
   - d) O(n³)
5. Os hiperparâmetros do kernel normalmente são aprendidos…
   - a) Maximizando a verossimilhança marginal
   - b) Com dropout
   - c) Aleatoriamente
   - d) Pelo teste
6. Longe dos dados de treino, a incerteza posterior…
   - a) Vai a zero
   - b) Aumenta, voltando à incerteza da prior
   - c) Fica negativa
   - d) Não muda nunca

**Verdadeiro ou falso?**

- Um GP é totalmente especificado por uma função média e uma função de covariância.
- GPs não conseguem expressar incerteza.
- GPs são muito usados em otimização bayesiana de hiperparâmetros.

<details><summary>✅ Gabarito</summary>

1. **b)** A covariância/similaridade entre valores da função em pontos diferentes — É o coração do GP.
2. **b)** Funções mais suaves, que variam lentamente — Pontos distantes continuam correlacionados.
3. **b)** Fornecem incerteza calibrada nas previsões — Sabem o que não sabem.
4. **d)** O(n³) — Por causa da inversão/decomposição de uma matriz n×n.
5. **a)** Maximizando a verossimilhança marginal — Equilibra ajuste aos dados e complexidade.
6. **b)** Aumenta, voltando à incerteza da prior — Sem dados, sem certeza.

- **V** — Assim como uma gaussiana por média e covariância.
- **F** — É justamente seu ponto forte.
- **V** — Como modelo substituto (surrogate).

</details>

### 🧩 Charada

> Não sou uma função, sou uma nuvem de funções possíveis. Qualquer punhado de pontos que você escolher segue uma gaussiana conjunta. Quem sou?

<details><summary>Resposta</summary>

**processo gaussiano** — Processo Gaussiano (GP).

</details>

### 💻 Missão: Posterior de um GP com NumPy

Implemente a média e o desvio padrão posteriores com kernel RBF.

```python
import numpy as np

def rbf(a, b, ls=1.0, amp=1.0):
    return amp**2 * np.exp(-0.5 * (a[:, None] - b[None, :])**2 / ls**2)

X = np.array([-3., -1., 0., 2.]); y = np.sin(X)
Xs = np.linspace(-5, 5, 9); noise = 1e-2

K   = rbf(X, X) + noise * np.eye(len(X))
Ks  = rbf(X, Xs)
Kss = rbf(Xs, Xs)

mu  = Ks.T @ np.linalg.solve(K, y)
cov = Kss - Ks.T @ np.linalg.solve(K, Ks)
std = np.sqrt(np.clip(np.diag(cov), 0, None))

for x, m, s in zip(Xs, mu, std):
    print(f"x={x:+.2f}  média={m:+.3f}  incerteza=±{2*s:.3f}")
```

---

## 19. Otimização de Hiperparâmetros

🎛️ **Chefão:** O Afinador Supremo · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_hyperparameter-optimization/index.html)

### Resumo

**Hiperparâmetros** (taxa de aprendizado, batch size, nº de camadas, dropout…) não são aprendidos pelo
gradiente — mas mudam tudo. **HPO** é automatizar essa escolha.

• Defina um **espaço de busca** (use escala **logarítmica** para lr).

• **Busca aleatória** costuma vencer a **busca em grade**.

• **Otimização bayesiana**: um modelo substituto (ex.: GP) + uma **função de aquisição** escolhem a próxima configuração.

• **Multi-fidelidade**: avaliações baratas (poucas épocas) para descartar cedo as configs ruins —
**successive halving** e **Hyperband**.

• **HPO assíncrono** (ex.: ASHA) para usar vários workers sem espera. O livro usa a biblioteca **Syne Tune**.

Sempre avalie no conjunto de **validação**, nunca no teste.

> 💡 **Analogia:** Successive halving é um reality show de culinária: começam 64 chefs com 5 minutos cada; metade é eliminada a cada rodada e os sobreviventes ganham mais tempo, até sobrar o campeão.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Hiperparâmetro vs parâmetro** | Parâmetros (pesos) são aprendidos pelo gradiente; hiperparâmetros são escolhidos fora do treino. |
| **Busca aleatória** | Amostra configurações aleatórias do espaço de busca; simples e eficaz. |
| **Otimização bayesiana** | Usa um modelo substituto e uma função de aquisição para escolher configurações promissoras. |
| **Multi-fidelidade** | Usa avaliações baratas e aproximadas (menos épocas/dados) para filtrar configurações. |
| **Successive halving** | Treina muitas configs com pouco orçamento, mantém a melhor fração e aumenta o orçamento. |
| **HPO assíncrono** | Workers iniciam novas avaliações sem esperar os demais (ex.: ASHA). |

### Fórmulas

```text
lr ~ 10^U(−5, −1)  (amostragem log-uniforme)
```

### Autoavaliação

1. Qual destes é um hiperparâmetro?
   - a) Os pesos da primeira camada
   - b) A taxa de aprendizado
   - c) O viés da saída
   - d) O gradiente
2. Por que a busca aleatória frequentemente supera a busca em grade?
   - a) Porque é determinística
   - b) Porque explora mais valores distintos nas dimensões que realmente importam
   - c) Porque usa gradientes
   - d) Não supera nunca
3. Successive halving…
   - a) Divide a lr pela metade
   - b) Treina muitas configs com pouco orçamento, mantém as melhores e aumenta o orçamento
   - c) Remove metade dos dados
   - d) Divide o modelo em dois
4. A otimização bayesiana usa…
   - a) Apenas força bruta
   - b) Um modelo substituto (ex.: GP) + uma função de aquisição
   - c) Dropout
   - d) Backpropagation nos hiperparâmetros
5. Por que fazer HPO com o conjunto de validação e não o de teste?
   - a) Tanto faz
   - b) Para não superajustar ao teste e ter uma estimativa honesta do desempenho final
   - c) Porque o teste é menor
   - d) Porque o teste não tem rótulos
6. A vantagem do HPO assíncrono é…
   - a) Usar menos dados
   - b) Workers não esperam uns pelos outros, aproveitando melhor os recursos
   - c) Não precisar de validação
   - d) Ser determinístico

**Verdadeiro ou falso?**

- Os pesos de uma rede neural são hiperparâmetros.
- Buscar a taxa de aprendizado em escala logarítmica é uma boa prática.
- Multi-fidelidade usa avaliações baratas (ex.: poucas épocas) para descartar configurações ruins cedo.

<details><summary>✅ Gabarito</summary>

1. **b)** A taxa de aprendizado — Pesos e vieses são parâmetros aprendidos.
2. **b)** Porque explora mais valores distintos nas dimensões que realmente importam — Na grade, muitas avaliações repetem os mesmos valores da dimensão importante.
3. **b)** Treina muitas configs com pouco orçamento, mantém as melhores e aumenta o orçamento — Base do Hyperband.
4. **b)** Um modelo substituto (ex.: GP) + uma função de aquisição — Equilibra explorar e aproveitar.
5. **b)** Para não superajustar ao teste e ter uma estimativa honesta do desempenho final — O teste deve ser 'virgem'.
6. **b)** Workers não esperam uns pelos outros, aproveitando melhor os recursos — Sem tempo ocioso.

- **F** — Pesos são parâmetros aprendidos.
- **V** — 1e-4, 1e-3, 1e-2… a ordem de grandeza importa.
- **V** — Economiza muito tempo de computação.

</details>

### 🧩 Charada

> Começo com um torneio enorme e pouco tempo para cada um. A cada rodada, metade dos competidores cai e os sobreviventes ganham mais tempo. Quem sou?

<details><summary>Resposta</summary>

**successive halving** — Successive Halving (e seu primo Hyperband).

</details>

### 💻 Missão: Busca aleatória

Implemente busca aleatória com amostragem log-uniforme da taxa de aprendizado.

```python
import math, random

def validation_error(lr, dropout):     # finja que isto treina um modelo
    return (math.log10(lr) + 2.5)**2 + (dropout - 0.3)**2 + random.gauss(0, 0.01)

best = None
for trial in range(30):
    cfg = {"lr": 10 ** random.uniform(-5, -1), "dropout": random.uniform(0, 0.7)}
    err = validation_error(**cfg)
    if best is None or err < best[0]:
        best = (err, cfg)
        print(f"trial {trial:2d}: novo melhor {err:.4f} {cfg}")

print("vencedor:", best)
```

---

## 20. Redes Adversariais Generativas (GANs)

🎭 **Chefão:** O Falsificador e o Detetive · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_generative-adversarial-networks/index.html)

### Resumo

Uma **GAN** é um jogo entre duas redes: o **gerador** G transforma ruído aleatório z em amostras falsas;
o **discriminador** D tenta distinguir reais de falsas. Treinamos com um jogo **minimax**: D maximiza sua
acurácia, G tenta enganá-lo.

Na prática, o gerador maximiza log D(G(z)) (perda **não saturante**) para ter gradientes fortes no começo. No equilíbrio
ideal, D(x) = ½ em tudo.

A **DCGAN** leva a ideia para imagens: o gerador usa **convoluções transpostas** + BatchNorm + ReLU, e o
discriminador usa convoluções com **LeakyReLU**. Problemas clássicos: instabilidade e **mode collapse** (pouca variedade).

> 💡 **Analogia:** Um falsificador de quadros e um perito de museu treinando juntos: cada vez que o perito melhora, o falsificador precisa caprichar mais — até as falsificações ficarem indistinguíveis.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Gerador (G)** | Rede que transforma ruído aleatório z em amostras sintéticas. |
| **Discriminador (D)** | Rede que estima a probabilidade de uma amostra ser real. |
| **Jogo minimax** | min_G max_D E[log D(x)] + E[log(1 − D(G(z)))]. |
| **Perda não saturante** | G maximiza log D(G(z)) em vez de minimizar log(1 − D(G(z))), para gradientes melhores. |
| **DCGAN** | GAN convolucional: convs transpostas no gerador, LeakyReLU no discriminador, BatchNorm. |
| **Mode collapse** | O gerador produz pouca variedade, cobrindo só alguns modos dos dados. |

### Fórmulas

```text
min_G max_D  E_x[log D(x)] + E_z[log(1 − D(G(z)))]
```

### Autoavaliação

1. O discriminador tenta…
   - a) Gerar imagens
   - b) Distinguir dados reais de falsos
   - c) Comprimir dados
   - d) Classificar em 1000 classes
2. O gerador recebe como entrada…
   - a) Imagens reais
   - b) Ruído aleatório z
   - c) Rótulos
   - d) Gradientes
3. O que é mode collapse?
   - a) O gerador produz pouca variedade
   - b) O discriminador quebra
   - c) A GPU desliga
   - d) Overfitting do D
4. Na DCGAN, o gerador aumenta a resolução usando…
   - a) Max pooling
   - b) Convoluções transpostas
   - c) Atenção
   - d) Dropout
5. Por que usar a perda não saturante no gerador?
   - a) Para gradientes mais fortes no início, quando D rejeita facilmente as amostras
   - b) Para treinar mais devagar
   - c) Para remover o discriminador
   - d) Para evitar BatchNorm
6. No equilíbrio ideal de uma GAN, D(x) vale…
   - a) 0
   - b) 1
   - c) ½
   - d) ∞

**Verdadeiro ou falso?**

- GANs são treinadas como um jogo entre duas redes.
- O discriminador precisa de rótulos de classe criados manualmente para os dados.
- LeakyReLU é comum no discriminador da DCGAN.

<details><summary>✅ Gabarito</summary>

1. **b)** Distinguir dados reais de falsos — É um classificador binário real vs falso.
2. **b)** Ruído aleatório z — Ele mapeia o espaço latente em amostras.
3. **a)** O gerador produz pouca variedade — Ex.: sempre gerar o mesmo dígito.
4. **b)** Convoluções transpostas — Do vetor latente até a imagem completa.
5. **a)** Para gradientes mais fortes no início, quando D rejeita facilmente as amostras — log(1 − D(G(z))) satura quando D(G(z)) ≈ 0.
6. **c)** ½ — D não consegue distinguir: chuta 50/50.

- **V** — Gerador vs. discriminador.
- **F** — Os rótulos real/falso vêm de graça.
- **V** — Evita neurônios 'mortos' e ajuda o fluxo de gradiente.

</details>

### 🧩 Charada

> Somos dois rivais: um falsifica, o outro investiga. Quanto melhor um fica, melhor o outro precisa ser. Que modelo formamos? (sigla)

<details><summary>Resposta</summary>

**gan** — GAN — Generative Adversarial Network.

</details>

### 💻 Missão: Uma GAN mínima

Treine uma GAN que aprende a gerar números de uma gaussiana N(4, 1.25).

```python
import torch
from torch import nn

G = nn.Sequential(nn.Linear(2, 16), nn.ReLU(), nn.Linear(16, 1))
D = nn.Sequential(nn.Linear(1, 16), nn.LeakyReLU(0.2), nn.Linear(16, 1))
bce = nn.BCEWithLogitsLoss()
optG = torch.optim.Adam(G.parameters(), lr=1e-3)
optD = torch.optim.Adam(D.parameters(), lr=1e-3)

for step in range(3000):
    real = 4 + 1.25 * torch.randn(64, 1)
    fake = G(torch.randn(64, 2))
    # discriminador: real -> 1, falso -> 0
    lossD = bce(D(real), torch.ones(64, 1)) + bce(D(fake.detach()), torch.zeros(64, 1))
    optD.zero_grad(); lossD.backward(); optD.step()
    # gerador: quer que D diga 1 (perda não saturante)
    lossG = bce(D(fake), torch.ones(64, 1))
    optG.zero_grad(); lossG.backward(); optG.step()

s = G(torch.randn(1000, 2))
print(f"média {s.mean().item():.2f} (alvo 4.00), desvio {s.std().item():.2f} (alvo 1.25)")
```

---

## 21. Sistemas de Recomendação

🍿 **Chefão:** O Algoritmo do Streaming · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_recommender-systems/index.html)

### Resumo

Recomendadores estão em todo lugar (filmes, músicas, compras). A **filtragem colaborativa** usa padrões de
muitos usuários. O feedback pode ser **explícito** (notas) ou **implícito** (cliques, compras, tempo assistido).

• **Fatoração de matrizes**: aproxima a matriz usuário × item por vetores latentes (mais vieses).

• **AutoRec**: autoencoder para completar a matriz de notas.

• **Ranking personalizado**: perdas **BPR** e **hinge** — o importante é a ordem, não a nota.

• **NeuMF**: combina fatoração generalizada (GMF) com um MLP.

• **Sequence-aware** (Caser): considera a ordem das interações.

• **Factorization Machines** e **DeepFM**: modelam interações entre features (ótimo para CTR).

Desafio clássico: **cold start**.

> 💡 **Analogia:** A fatoração de matrizes descobre 'gostos ocultos': talvez você seja 70% fã de ficção científica e 20% de comédia, e cada filme tem essas mesmas 'notas ocultas'. Combine os dois e adivinhe sua nota.

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Filtragem colaborativa** | Recomenda com base em padrões de preferência de muitos usuários. |
| **Feedback implícito** | Sinais indiretos de preferência: cliques, compras, visualizações. |
| **Fatoração de matrizes** | R ≈ PQᵀ + vieses: vetores latentes de usuários (P) e itens (Q). |
| **BPR** | Bayesian Personalized Ranking: item positivo deve ter escore maior que um negativo. |
| **NeuMF** | Neural Matrix Factorization: une GMF e MLP para modelar interações usuário-item. |
| **Factorization Machines** | Modelam interações de pares entre features com vetores latentes, em tempo linear. |
| **Cold start** | Dificuldade de recomendar para usuários ou itens novos sem histórico. |

### Fórmulas

```text
R̂ᵤᵢ = pᵤᵀqᵢ + bᵤ + bᵢ
BPR: maximize Σ ln σ(ŷᵤᵢ − ŷᵤⱼ)  (i positivo, j negativo)
```

### Autoavaliação

1. A filtragem colaborativa…
   - a) Usa só o conteúdo do item
   - b) Recomenda usando padrões de preferências de muitos usuários
   - c) Precisa de imagens
   - d) Ignora usuários
2. Qual é um exemplo de feedback implícito?
   - a) Nota de 1 a 5 estrelas
   - b) Cliques e tempo de visualização
   - c) Uma resenha escrita
   - d) Um formulário
3. A fatoração de matrizes…
   - a) Ordena itens alfabeticamente
   - b) Aprende vetores latentes de usuários e itens cujo produto aproxima as interações
   - c) Usa convoluções 2D
   - d) Remove usuários
4. A perda BPR otimiza…
   - a) O erro quadrático das notas
   - b) Que itens positivos fiquem acima dos negativos no ranking de cada usuário
   - c) A acurácia de imagens
   - d) A perplexidade
5. O problema de cold start é…
   - a) GPU fria
   - b) Dificuldade com usuários/itens novos sem histórico
   - c) Treino lento
   - d) Overfitting
6. Factorization Machines modelam…
   - a) Só features individuais
   - b) Interações de pares entre features via vetores latentes
   - c) Sequências de imagens
   - d) Recompensas

**Verdadeiro ou falso?**

- Avaliar recomendadores apenas com RMSE é sempre suficiente para problemas de ranking.
- O NeuMF combina fatoração (GMF) com um MLP.
- Modelos sequence-aware consideram a ordem das interações do usuário.

<details><summary>✅ Gabarito</summary>

1. **b)** Recomenda usando padrões de preferências de muitos usuários — 'Quem gostou disso também gostou de…'
2. **b)** Cliques e tempo de visualização — O usuário não declara explicitamente a preferência.
3. **b)** Aprende vetores latentes de usuários e itens cujo produto aproxima as interações — Base de muitos recomendadores (prêmio Netflix).
4. **b)** Que itens positivos fiquem acima dos negativos no ranking de cada usuário — Ranking por pares.
5. **b)** Dificuldade com usuários/itens novos sem histórico — Sem interações, a filtragem colaborativa sofre.
6. **b)** Interações de pares entre features via vetores latentes — Muito usadas em previsão de cliques (CTR).

- **F** — Para ranking usamos métricas como Hit@k e AUC.
- **V** — Junta interação linear e não linear.
- **V** — O que você viu por último importa.

</details>

### 🧩 Charada

> Desmonto uma tabela gigante e quase vazia de notas em duas tabelinhas: uma de gostos dos usuários, outra de características dos filmes. Multiplicando-as, adivinho as notas que faltam. Quem sou?

<details><summary>Resposta</summary>

**fatoracao de matrizes** — Fatoração de matrizes (Matrix Factorization).

</details>

### 💻 Missão: Fatoração de matrizes

Implemente MF com vieses em PyTorch.

```python
import torch
from torch import nn

class MF(nn.Module):
    def __init__(self, n_users, n_items, k=16):
        super().__init__()
        self.P, self.Q = nn.Embedding(n_users, k), nn.Embedding(n_items, k)
        self.bu, self.bi = nn.Embedding(n_users, 1), nn.Embedding(n_items, 1)
    def forward(self, u, i):
        return (self.P(u) * self.Q(i)).sum(1) + self.bu(u).squeeze(1) + self.bi(i).squeeze(1)

users = torch.randint(0, 100, (1000,)); items = torch.randint(0, 50, (1000,))
ratings = torch.randint(1, 6, (1000,)).float()
net = MF(100, 50); opt = torch.optim.Adam(net.parameters(), lr=0.01, weight_decay=1e-4)
for epoch in range(50):
    loss = ((net(users, items) - ratings) ** 2).mean()
    opt.zero_grad(); loss.backward(); opt.step()
print("RMSE de treino:", loss.sqrt().item())
```

---

## 22. Apêndice: Matemática para Deep Learning

📐 **Chefão:** O Arquimago da Entropia · 📖 [Ler o capítulo no d2l.ai](https://d2l.ai/chapter_appendix-mathematics-for-deep-learning/index.html)

### Resumo

O apêndice aprofunda a matemática que sustenta tudo:

• **Geometria e álgebra linear**: produtos escalares, ângulos, projeções, determinantes.

• **Autodecomposição**: Av = λv; autovalores revelam como a matriz estica o espaço.

• **Cálculo de uma e várias variáveis**: gradientes, **Hessiana**, Taylor; e **cálculo integral**.

• **Variáveis aleatórias**, esperança, variância e **distribuições** (Bernoulli, Gaussiana, Poisson…).

• **Máxima verossimilhança (MLE)** e **Naive Bayes**.

• **Estatística**: estimadores, viés-variância, testes de hipótese e intervalos de confiança.

• **Teoria da informação**: **entropia**, informação mútua, **divergência KL** e **entropia cruzada** — de onde
vem a perda que você usa desde o capítulo 4!

> 💡 **Analogia:** Entropia é a 'surpresa média' de uma loteria: se o resultado é sempre o mesmo, ninguém se surpreende (entropia 0); uma moeda justa é a loteria de 2 opções mais imprevisível (1 bit).

### Conceitos-chave

| Conceito | Definição |
|---|---|
| **Autovalor / autovetor** | Av = λv: o vetor v só é esticado (por λ) pela matriz A, sem mudar de direção. |
| **Hessiana** | Matriz das segundas derivadas parciais; descreve a curvatura da função. |
| **Esperança e variância** | E[X] é a média ponderada; Var[X] = E[(X − E[X])²] mede a dispersão. |
| **MLE** | Máxima verossimilhança: escolhe os parâmetros que tornam os dados observados mais prováveis. |
| **Naive Bayes** | Classificador que assume features condicionalmente independentes dada a classe. |
| **Entropia** | H(p) = −Σ p log p: incerteza (surpresa média) de uma distribuição. |
| **Divergência KL** | KL(p‖q) = Σ p log(p/q) ≥ 0; mede quanto q difere de p. Não é simétrica. |
| **Entropia cruzada** | H(p,q) = −Σ p log q = H(p) + KL(p‖q). |

### Fórmulas

```text
Av = λv
H(p) = −Σᵢ pᵢ log pᵢ
KL(p‖q) = Σᵢ pᵢ log(pᵢ/qᵢ)
H(p, q) = H(p) + KL(p‖q)
```

### Autoavaliação

1. Em Av = λv, v e λ são…
   - a) Matriz e vetor
   - b) Autovetor e autovalor
   - c) Gradiente e Hessiana
   - d) Média e variância
2. A entropia de uma moeda é máxima quando…
   - a) p(cara) = 0
   - b) p(cara) = 0,5
   - c) p(cara) = 1
   - d) Nunca
3. Sobre KL(p‖q), é correto:
   - a) Pode ser negativa
   - b) É ≥ 0, vale 0 só se p = q, e não é simétrica
   - c) É sempre simétrica
   - d) É igual à entropia
4. A entropia cruzada H(p, q) é igual a…
   - a) H(p) − KL(p‖q)
   - b) H(p) + KL(p‖q)
   - c) KL(q‖p)
   - d) H(q)
5. O Naive Bayes assume que…
   - a) As classes são equiprováveis
   - b) As features são condicionalmente independentes dada a classe
   - c) Os dados são gaussianos
   - d) Não há rótulos
6. A Hessiana é…
   - a) O vetor gradiente
   - b) A matriz de segundas derivadas parciais
   - c) Uma distribuição
   - d) Um otimizador

**Verdadeiro ou falso?**

- Minimizar a entropia cruzada (com p fixo) equivale a minimizar a divergência KL.
- A variância de uma constante é 1.
- Uma matriz real simétrica tem todos os autovalores reais.

<details><summary>✅ Gabarito</summary>

1. **b)** Autovetor e autovalor — v mantém a direção; λ é o fator de escala.
2. **b)** p(cara) = 0,5 — 1 bit: máxima imprevisibilidade.
3. **b)** É ≥ 0, vale 0 só se p = q, e não é simétrica — KL(p‖q) ≠ KL(q‖p) em geral.
4. **b)** H(p) + KL(p‖q) — Por isso minimizar a entropia cruzada = minimizar KL (com p fixo).
5. **b)** As features são condicionalmente independentes dada a classe — Por isso é 'ingênuo' — e ainda assim funciona bem.
6. **b)** A matriz de segundas derivadas parciais — Descreve a curvatura; usada no método de Newton.

- **V** — H(p) é constante em relação a q.
- **F** — É 0: constantes não variam.
- **V** — Teorema espectral.

</details>

### 🧩 Charada

> Meço a surpresa média de uma distribuição. Uma moeda viciada que sempre dá cara me deixa em zero. Quem sou?

<details><summary>Resposta</summary>

**entropia** — Entropia (de Shannon).

</details>

### 💻 Missão: Teoria da informação na prática

Calcule entropia, KL e entropia cruzada e verifique H(p,q) = H(p) + KL(p‖q).

```python
import numpy as np

def H(p):       return -np.sum(p * np.log2(p))
def KL(p, q):   return np.sum(p * np.log2(p / q))
def CE(p, q):   return -np.sum(p * np.log2(q))

p = np.array([0.5, 0.25, 0.25])
q = np.array([0.4, 0.4, 0.2])

print("H(p)      =", H(p))                 # 1.5 bits
print("KL(p||q)  =", KL(p, q))
print("CE(p, q)  =", CE(p, q))
print("H + KL    =", H(p) + KL(p, q))      # igual a CE!
print("moeda justa:", H(np.array([.5, .5])), "bit")

A = np.array([[2., 1.], [1., 2.]])
print("autovalores:", np.linalg.eigvalsh(A))   # [1, 3]
```

---

Créditos: conteúdo de estudo original em português, baseado na estrutura do livro *Dive into Deep Learning* de Aston Zhang, Zachary C. Lipton, Mu Li e Alexander J. Smola ([d2l.ai](https://d2l.ai)).
