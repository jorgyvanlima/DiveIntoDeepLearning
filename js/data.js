/* =====================================================================
   D2L Quest — Conteúdo dos Mundos
   Baseado no livro "Dive into Deep Learning" (https://d2l.ai)
   Cada mundo = 1 capítulo do livro.
   Estrutura de um mundo:
     id, num, region, title, emoji, boss, url
     resumo     -> explicação leve do capítulo (HTML permitido)
     analogia   -> uma analogia do dia a dia
     conceitos  -> [{t: termo, d: definição}]  (viram cartas e glossário)
     formulas   -> [string] fórmulas-chave
     quiz       -> [{q, o:[opções], a: índice correto, e: explicação}]
     vf         -> [{s: afirmação, v: true/false, e: explicação}]
     charada    -> {q, r:[respostas aceitas], dica, e}
     missao     -> {t: título, d: descrição, code: código PyTorch}
   ===================================================================== */

window.D2L_REGIONS = [
  { id: "fund", name: "Vale dos Fundamentos", emoji: "🌱", desc: "Dados, tensores, modelos lineares e as primeiras redes." },
  { id: "visao", name: "Montanhas da Visão", emoji: "🏔️", desc: "Convoluções e as grandes arquiteturas de imagem." },
  { id: "seq", name: "Rio das Sequências", emoji: "🌊", desc: "Texto, memória, recorrência e o poder da atenção." },
  { id: "treino", name: "Forja do Treinamento", emoji: "⚒️", desc: "Otimizadores e performance computacional." },
  { id: "apps", name: "Cidade das Aplicações", emoji: "🏙️", desc: "Visão computacional e PLN no mundo real." },
  { id: "front", name: "Fronteira Avançada", emoji: "🚀", desc: "RL, processos gaussianos, HPO, GANs e recomendação." },
  { id: "math", name: "Torre da Matemática", emoji: "🗼", desc: "O arsenal matemático por trás de tudo." }
];

window.D2L_WORLDS = [
/* ------------------------------------------------------------------ 1 */
{
  id: "intro", num: 1, region: "fund", emoji: "🚪",
  title: "Introdução ao Machine Learning",
  boss: "O Guardião do Portal",
  url: "https://d2l.ai/chapter_introduction/index.html",
  resumo: `Programas tradicionais seguem <b>regras escritas à mão</b>. Em <b>Machine Learning</b>, o programa
  <b>aprende as regras a partir de exemplos</b>. Todo problema de ML tem quatro peças:
  <b>dados</b> (os exemplos), um <b>modelo</b> (a função que transforma entrada em saída),
  uma <b>função objetivo</b> (que mede o quão ruim o modelo está) e um <b>algoritmo de otimização</b>
  (que ajusta o modelo para errar menos).<br><br>
  Os grandes tipos de aprendizado são: <b>supervisionado</b> (temos a resposta certa — regressão, classificação,
  marcação, busca, recomendação, sequências), <b>não supervisionado</b> (sem rótulos — agrupamento, compressão, modelos
  generativos) e <b>por reforço</b> (um agente age num ambiente e recebe recompensas).<br><br>
  O <b>Deep Learning</b> explodiu na última década graças a três ingredientes: <b>muitos dados</b>,
  <b>muito poder computacional (GPUs)</b> e <b>algoritmos melhores</b>.`,
  analogia: "Em vez de escrever um manual de 500 páginas explicando o que é um gato, você mostra 10.000 fotos de gatos e não-gatos para uma criança. Ela descobre sozinha o padrão. Isso é Machine Learning.",
  conceitos: [
    { t: "Machine Learning", d: "Área que estuda algoritmos que melhoram seu desempenho em uma tarefa a partir da experiência (dados)." },
    { t: "Modelo", d: "Função com parâmetros ajustáveis que mapeia entradas em saídas (previsões)." },
    { t: "Função objetivo (perda)", d: "Número que mede o quão ruim o modelo está. Treinar = minimizar esse número." },
    { t: "Aprendizado supervisionado", d: "Aprender a prever rótulos a partir de exemplos (entrada, rótulo). Ex.: regressão e classificação." },
    { t: "Aprendizado não supervisionado", d: "Encontrar estrutura em dados sem rótulos. Ex.: clustering, redução de dimensionalidade." },
    { t: "Aprendizado por reforço", d: "Um agente interage com um ambiente, toma ações e aprende a maximizar recompensas acumuladas." },
    { t: "Overfitting", d: "Quando o modelo decora o treino e vai mal em dados novos." }
  ],
  formulas: ["Treinar = encontrar parâmetros θ que minimizam L(θ) nos dados"],
  quiz: [
    { q: "Quais são os 4 componentes centrais de um problema de ML segundo o D2L?", o: ["Dados, modelo, função objetivo e algoritmo de otimização", "CPU, GPU, RAM e disco", "Entrada, saída, loop e condição", "Treino, teste, deploy e monitoramento"], a: 0, e: "Todo problema de ML combina dados + modelo + função objetivo + otimizador." },
    { q: "Prever o preço de venda de uma casa é um problema de…", o: ["Classificação", "Regressão", "Clustering", "Aprendizado por reforço"], a: 1, e: "A saída é um número contínuo → regressão." },
    { q: "Agrupar clientes por comportamento, sem nenhum rótulo, é…", o: ["Aprendizado supervisionado", "Regressão", "Aprendizado não supervisionado", "Tradução automática"], a: 2, e: "Sem rótulos, buscamos estrutura nos dados → não supervisionado." },
    { q: "Para que serve a função objetivo (loss)?", o: ["Para desenhar a arquitetura", "Para medir quão bom ou ruim o modelo está", "Para carregar os dados", "Para escolher a GPU"], a: 1, e: "Ela quantifica o erro; o otimizador tenta reduzi-la." },
    { q: "O que caracteriza overfitting?", o: ["Erro alto no treino e no teste", "Erro baixo no treino e alto em dados novos", "Erro baixo em tudo", "Treino muito lento"], a: 1, e: "O modelo decorou o treino e não generaliza." },
    { q: "Quais fatores impulsionaram o deep learning na última década?", o: ["Menos dados e CPUs mais simples", "Grandes volumes de dados e computação barata (GPUs)", "Regras escritas manualmente", "Apenas novos teoremas matemáticos"], a: 1, e: "Dados abundantes + GPUs + bons algoritmos." }
  ],
  vf: [
    { s: "Em aprendizado por reforço, o agente aprende interagindo com um ambiente e recebendo recompensas.", v: true, e: "Exato: ação → ambiente → recompensa → aprendizado." },
    { s: "Deep learning exige escrever manualmente as regras de cada decisão.", v: false, e: "A graça é justamente aprender as regras a partir dos dados." },
    { s: "Classificação multirrótulo (tagging) permite atribuir várias classes ao mesmo exemplo.", v: true, e: "Uma foto pode ter 'praia', 'cachorro' e 'pôr do sol' ao mesmo tempo." }
  ],
  charada: { q: "Tenho um professor que me mostra a resposta certa em cada exemplo. Aprendo a ligar entradas a rótulos. Que tipo de aprendizado sou?", r: ["supervisionado", "aprendizado supervisionado", "supervised", "supervised learning"], dica: "O oposto de 'não supervisionado'.", e: "Aprendizado supervisionado: cada exemplo vem com seu rótulo." },
  missao: { t: "Prepare seu laboratório", d: "Instale o PyTorch e a biblioteca d2l. Depois confirme se há GPU disponível. Dica: o Google Colab já vem com tudo e tem GPU grátis.", code:
`pip install torch torchvision
pip install d2l==1.0.3

python -c "import torch; print(torch.__version__, torch.cuda.is_available())"` }
},
/* ------------------------------------------------------------------ 2 */
{
  id: "prelim", num: 2, region: "fund", emoji: "🧰",
  title: "Preliminares: Tensores, Álgebra e Cálculo",
  boss: "A Hidra Tensorial",
  url: "https://d2l.ai/chapter_preliminaries/index.html",
  resumo: `Antes de construir redes, você precisa do <b>kit de sobrevivência</b>:<br>
  • <b>Tensores</b>: arrays n-dimensionais (escalar = 0D, vetor = 1D, matriz = 2D…). São a moeda do deep learning.<br>
  • <b>Broadcasting</b>: operar tensores de formatos diferentes expandindo dimensões de tamanho 1.<br>
  • <b>Pré-processamento</b> com pandas: ler CSV, tratar valores faltantes, converter categorias em números.<br>
  • <b>Álgebra linear</b>: produto escalar, multiplicação de matrizes, normas (L1, L2).<br>
  • <b>Cálculo</b>: derivadas, gradientes e a <b>regra da cadeia</b> — a base do backpropagation.<br>
  • <b>Diferenciação automática</b> (autograd): o PyTorch calcula gradientes para você com <code>.backward()</code>.<br>
  • <b>Probabilidade</b>: distribuições, esperança, regra de Bayes.`,
  analogia: "Tensores são como planilhas que podem ter quantas 'abas' e 'camadas' você quiser. O autograd é um contador que anota cada conta que você faz para depois refazer o caminho de trás para frente.",
  conceitos: [
    { t: "Tensor", d: "Array n-dimensional de números; com suporte a GPU e diferenciação automática." },
    { t: "Broadcasting", d: "Mecanismo que expande dimensões de tamanho 1 para operar tensores de formatos diferentes." },
    { t: "Norma L2", d: "Comprimento euclidiano de um vetor: raiz da soma dos quadrados." },
    { t: "Gradiente", d: "Vetor de derivadas parciais; aponta para a direção de maior crescimento da função." },
    { t: "Regra da cadeia", d: "Derivada de funções compostas: (f∘g)'(x) = f'(g(x))·g'(x). Base do backprop." },
    { t: "Autograd", d: "Diferenciação automática: o framework registra o grafo computacional e calcula gradientes." },
    { t: "Regra de Bayes", d: "P(A|B) = P(B|A)·P(A) / P(B). Atualiza crenças com evidências." }
  ],
  formulas: ["‖x‖₂ = √(Σ xᵢ²)", "∂/∂x f(g(x)) = f'(g(x))·g'(x)", "P(A|B) = P(B|A)P(A)/P(B)"],
  quiz: [
    { q: "Qual o shape de torch.arange(12).reshape(3, 4)?", o: ["(12,)", "(4, 3)", "(3, 4)", "(3, 4, 1)"], a: 2, e: "reshape(3,4) cria 3 linhas e 4 colunas." },
    { q: "Somar um tensor de shape (3, 1) com um de shape (1, 2) resulta em…", o: ["Erro", "(3, 2)", "(1, 1)", "(3, 1)"], a: 1, e: "Broadcasting expande ambos para (3, 2)." },
    { q: "Qual a norma L2 do vetor [3, 4]?", o: ["7", "12", "5", "25"], a: 2, e: "√(9 + 16) = √25 = 5." },
    { q: "A derivada de f(g(x)) é…", o: ["f'(x)·g'(x)", "f'(g(x))·g'(x)", "f(g'(x))", "f'(x) + g'(x)"], a: 1, e: "Regra da cadeia." },
    { q: "Como calcular gradientes no PyTorch?", o: ["x.grad() direto", "Marcar x.requires_grad_(True), computar y e chamar y.backward()", "torch.derivative(y)", "Não é possível"], a: 1, e: "Depois de y.backward(), o gradiente fica em x.grad." },
    { q: "A regra de Bayes é…", o: ["P(A|B) = P(A)·P(B)", "P(A|B) = P(B|A)·P(A) / P(B)", "P(A|B) = P(B|A)", "P(A|B) = 1 − P(B)"], a: 1, e: "Posterior = verossimilhança × prior / evidência." }
  ],
  vf: [
    { s: "O gradiente aponta na direção de maior crescimento da função.", v: true, e: "Por isso andamos na direção contrária para minimizar." },
    { s: "No PyTorch, x.grad acumula gradientes por padrão; por isso zeramos com x.grad.zero_().", v: true, e: "Sem zerar, os gradientes de iterações diferentes se somam." },
    { s: "O produto de Hadamard (A * B) é o mesmo que multiplicação de matrizes (A @ B).", v: false, e: "Hadamard é elemento a elemento; @ é produto matricial." }
  ],
  charada: { q: "Sou uma caixa de números de muitas dimensões: com 0 eixos sou escalar, com 1 sou vetor, com 2 sou matriz. Quem sou?", r: ["tensor", "tensores"], dica: "Em PyTorch eu sou criado com torch.____", e: "Tensor: a estrutura de dados fundamental do deep learning." },
  missao: { t: "Seu primeiro gradiente", d: "Calcule o gradiente de y = 2·xᵀx e confirme que ele é igual a 4x.", code:
`import torch

x = torch.arange(4.0, requires_grad=True)
y = 2 * torch.dot(x, x)
y.backward()

print(x.grad)              # tensor([ 0.,  4.,  8., 12.])
print(x.grad == 4 * x)     # tudo True!

# broadcasting
a = torch.arange(3).reshape(3, 1)
b = torch.arange(2).reshape(1, 2)
print((a + b).shape)       # torch.Size([3, 2])` }
},
/* ------------------------------------------------------------------ 3 */
{
  id: "linreg", num: 3, region: "fund", emoji: "📈",
  title: "Redes Lineares para Regressão",
  boss: "O Golem dos Mínimos Quadrados",
  url: "https://d2l.ai/chapter_linear-regression/index.html",
  resumo: `A <b>regressão linear</b> é a rede neural mais simples: uma única camada totalmente conectada.
  O modelo prevê <code>ŷ = Xw + b</code>. Medimos o erro com a <b>perda quadrática</b> e ajustamos
  <code>w</code> e <code>b</code> com <b>gradiente descendente estocástico em minibatches</b> (SGD).<br><br>
  Detalhes importantes: a <b>taxa de aprendizado</b> e o <b>tamanho do batch</b> são <b>hiperparâmetros</b> (você escolhe,
  o modelo não aprende). Minimizar o erro quadrático equivale a fazer <b>máxima verossimilhança</b> supondo ruído gaussiano.<br><br>
  O capítulo também ensina <b>generalização</b>: erro de treino vs. erro de generalização, <b>underfitting</b> e
  <b>overfitting</b>, conjunto de <b>validação</b>, <b>validação cruzada K-fold</b> e o <b>weight decay</b> (regularização L2),
  que pune pesos grandes para deixar o modelo mais simples.`,
  analogia: "Imagine descer uma montanha no escuro: você sente a inclinação do chão sob os pés (gradiente) e dá um passo para baixo. A taxa de aprendizado é o tamanho do passo — grande demais você tropeça, pequeno demais nunca chega.",
  conceitos: [
    { t: "Regressão linear", d: "Modelo ŷ = Xw + b; prevê um valor contínuo como combinação linear das features." },
    { t: "Perda quadrática", d: "l = ½(ŷ − y)². Penaliza muito os erros grandes." },
    { t: "SGD em minibatch", d: "Atualiza parâmetros usando o gradiente médio de um pequeno lote aleatório de exemplos." },
    { t: "Taxa de aprendizado (η)", d: "Hiperparâmetro que define o tamanho do passo na atualização dos parâmetros." },
    { t: "Hiperparâmetro", d: "Configuração escolhida antes do treino (lr, batch size, nº de camadas), não aprendida pelo gradiente." },
    { t: "Validação cruzada K-fold", d: "Divide os dados em K partes; treina K vezes usando cada parte como validação. Útil com poucos dados." },
    { t: "Weight decay", d: "Regularização L2: soma λ/2·‖w‖² à perda para manter os pesos pequenos." }
  ],
  formulas: ["ŷ = Xw + b", "L(w,b) = 1/n Σ ½(ŷ⁽ⁱ⁾ − y⁽ⁱ⁾)²", "w ← w − (η/|B|) Σᵢ∈B ∇w l⁽ⁱ⁾", "L_reg = L + (λ/2)‖w‖²"],
  quiz: [
    { q: "Qual hiperparâmetro controla o tamanho do passo do gradiente descendente?", o: ["Batch size", "Taxa de aprendizado", "Número de épocas", "Bias"], a: 1, e: "A learning rate η multiplica o gradiente." },
    { q: "Minimizar a perda quadrática equivale a máxima verossimilhança assumindo ruído…", o: ["Uniforme", "Gaussiano", "De Poisson", "Nenhum ruído"], a: 1, e: "Ruído gaussiano → log-verossimilhança proporcional ao erro quadrático." },
    { q: "O weight decay adiciona à perda…", o: ["λ/2·‖w‖²", "λ·‖w‖₀", "Ruído aleatório", "Mais camadas"], a: 0, e: "É a penalidade L2 sobre os pesos." },
    { q: "Por que usar minibatches em vez do dataset inteiro a cada passo?", o: ["Porque o gradiente fica exato", "Equilíbrio entre custo computacional, paralelismo e estabilidade", "Porque o dataset não cabe no disco", "Não há motivo"], a: 1, e: "Minibatches são baratos e aproveitam o paralelismo das GPUs." },
    { q: "Para que serve o conjunto de validação?", o: ["Treinar os pesos", "Escolher hiperparâmetros/modelos sem tocar no teste", "Substituir o teste", "Aumentar os dados"], a: 1, e: "O teste deve ser usado só no final, uma vez." },
    { q: "Underfitting significa…", o: ["Erro baixo no treino, alto no teste", "Erro alto no treino e na validação: modelo simples demais", "Treino perfeito", "Dados demais"], a: 1, e: "O modelo nem consegue capturar o padrão do treino." }
  ],
  vf: [
    { s: "Regressão linear pode ser vista como uma rede neural de uma única camada totalmente conectada.", v: true, e: "Cada saída depende de todas as entradas." },
    { s: "Aumentar λ no weight decay tende a deixar os pesos maiores.", v: false, e: "Quanto maior λ, mais forte a punição → pesos menores." },
    { s: "Validação cruzada K-fold é especialmente útil quando há poucos dados.", v: true, e: "Aproveita todos os dados para treino e validação." }
  ],
  charada: { q: "Desço a montanha sem enxergar o vale; a cada passo sinto a inclinação e vou contra ela. Às vezes uso só um punhado de exemplos para sentir o chão. Quem sou?", r: ["sgd", "gradiente descendente", "gradiente descendente estocastico", "descida do gradiente", "descida de gradiente", "gradient descent", "stochastic gradient descent"], dica: "Sigla de três letras, em inglês.", e: "SGD — Stochastic Gradient Descent." },
  missao: { t: "Regressão linear do zero ao PyTorch", d: "Gere dados sintéticos com w=[2, −3.4] e b=4.2 e veja o modelo recuperar esses valores.", code:
`import torch
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

print(net.weight.data, net.bias.data)        # ≈ [2, -3.4] e 4.2` }
},
/* ------------------------------------------------------------------ 4 */
{
  id: "linclass", num: 4, region: "fund", emoji: "🎯",
  title: "Redes Lineares para Classificação",
  boss: "A Esfinge Softmax",
  url: "https://d2l.ai/chapter_linear-classification/index.html",
  resumo: `Agora a saída é uma <b>categoria</b>. Representamos rótulos com <b>one-hot</b> e o modelo produz
  <b>logits</b> <code>o = XW + b</code>. A <b>softmax</b> transforma logits em probabilidades (positivas e que somam 1).
  A perda é a <b>entropia cruzada</b>, e seu gradiente é lindo: <code>softmax(o) − y</code>.<br><br>
  Na prática, usamos o truque <b>log-sum-exp</b> para evitar overflow numérico (o PyTorch já faz isso em
  <code>nn.CrossEntropyLoss</code>, que recebe os <b>logits</b> crus). O dataset de treino é o <b>Fashion-MNIST</b>
  (10 classes de roupas, imagens 28×28 em tons de cinza).<br><br>
  O capítulo fecha com <b>generalização em classificação</b> e <b>mudança de distribuição</b>: covariate shift (muda P(x)),
  label shift (muda P(y)) e concept shift (muda o próprio significado dos rótulos).`,
  analogia: "A softmax é como uma eleição: cada candidato (classe) recebe uma 'força' (logit). A softmax converte essas forças em porcentagem de votos — todo mundo recebe algo, mas o mais forte leva a maior fatia.",
  conceitos: [
    { t: "One-hot", d: "Vetor com 1 na posição da classe correta e 0 nas demais. Não impõe ordem entre classes." },
    { t: "Logits", d: "Saídas cruas (não normalizadas) do modelo antes da softmax." },
    { t: "Softmax", d: "ŷⱼ = exp(oⱼ)/Σₖ exp(oₖ). Transforma logits em distribuição de probabilidade." },
    { t: "Entropia cruzada", d: "l = −Σⱼ yⱼ log ŷⱼ. Perda padrão para classificação." },
    { t: "Log-sum-exp", d: "Truque numérico que subtrai o maior logit antes da exponencial, evitando overflow." },
    { t: "Covariate shift", d: "A distribuição das entradas P(x) muda entre treino e teste, mas P(y|x) não." },
    { t: "Label shift", d: "A distribuição dos rótulos P(y) muda, mas P(x|y) permanece." }
  ],
  formulas: ["ŷ = softmax(o),  ŷⱼ = exp(oⱼ) / Σₖ exp(oₖ)", "l(y, ŷ) = −Σⱼ yⱼ log ŷⱼ", "∂l/∂oⱼ = softmax(o)ⱼ − yⱼ"],
  quiz: [
    { q: "O que a softmax faz com os logits?", o: ["Zera os negativos", "Transforma em probabilidades positivas que somam 1", "Ordena em ordem decrescente", "Normaliza para média 0"], a: 1, e: "Exponencia e divide pela soma." },
    { q: "Qual perda é usada tipicamente junto com softmax?", o: ["Erro quadrático", "Entropia cruzada", "Hinge", "L1"], a: 1, e: "Entropia cruzada mede a distância entre distribuições." },
    { q: "Qual a derivada da entropia cruzada (com softmax) em relação ao logit oⱼ?", o: ["yⱼ", "softmax(o)ⱼ − yⱼ", "log(oⱼ)", "1/oⱼ"], a: 1, e: "Previsão menos o rótulo: elegante e estável." },
    { q: "Por que as bibliotecas combinam softmax + log (log-sum-exp)?", o: ["Para deixar mais lento", "Para evitar overflow/underflow numérico", "Para mudar o resultado", "Por estética"], a: 1, e: "exp de números grandes estoura; o truque resolve." },
    { q: "Covariate shift ocorre quando…", o: ["P(y|x) muda", "P(x) muda mas P(y|x) permanece", "Os rótulos estão errados", "O modelo é grande demais"], a: 1, e: "As entradas mudam (ex.: fotos de outra câmera), mas a relação não." },
    { q: "O Fashion-MNIST contém…", o: ["1000 classes coloridas 224×224", "10 classes de roupas, imagens 28×28 em tons de cinza", "Textos de notícias", "Áudios"], a: 1, e: "Substituto mais desafiador do MNIST clássico." }
  ],
  vf: [
    { s: "A softmax preserva a ordem dos logits: o maior logit vira a maior probabilidade.", v: true, e: "exp é monotônica crescente." },
    { s: "Usar one-hot implica que a classe 3 é 'maior' que a classe 1.", v: false, e: "One-hot não cria ordem — essa é a vantagem." },
    { s: "nn.CrossEntropyLoss do PyTorch espera receber logits (sem softmax aplicada).", v: true, e: "Ela aplica log-softmax internamente." }
  ],
  charada: { q: "Pego números quaisquer, positivos ou negativos, exponencio todos e divido pela soma. No fim ninguém passa de 1 e todos juntos somam exatamente 1. Quem sou?", r: ["softmax", "soft max", "funcao softmax"], dica: "Um 'máximo suave'.", e: "Softmax: o máximo 'macio' e diferenciável." },
  missao: { t: "Classificador softmax no Fashion-MNIST", d: "Monte o modelo linear e treine por algumas épocas.", code:
`import torch, torchvision
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
    print(f"época {epoch+1}: acurácia treino {acc/n:.3f}")` }
},
/* ------------------------------------------------------------------ 5 */
{
  id: "mlp", num: 5, region: "fund", emoji: "🧠",
  title: "Perceptrons Multicamadas (MLP)",
  boss: "A Quimera das Camadas Ocultas",
  url: "https://d2l.ai/chapter_multilayer-perceptrons/index.html",
  resumo: `Modelos lineares são limitados. Adicionamos <b>camadas ocultas</b> com <b>funções de ativação não lineares</b>
  (ReLU, sigmoid, tanh). Sem não-linearidade, empilhar camadas lineares continua sendo linear!<br><br>
  O treino usa <b>forward propagation</b> (calcula as saídas) e <b>backpropagation</b> (aplica a regra da cadeia de trás
  para frente no <b>grafo computacional</b>). Redes profundas sofrem com <b>gradientes que desaparecem ou explodem</b>;
  uma boa <b>inicialização</b> (Xavier/Glorot) ajuda a manter a variância estável.<br><br>
  Para generalizar melhor usamos <b>dropout</b>: durante o treino, zera neurônios aleatoriamente com probabilidade p e
  reescala os restantes por 1/(1−p). Na inferência, o dropout é desligado. O capítulo também discute por que redes
  enormes, capazes de decorar os dados, ainda assim <b>generalizam</b> (early stopping, viés indutivo). O capítulo termina com um projeto real:
  <b>prever preços de casas no Kaggle</b>.`,
  analogia: "Um MLP é uma linha de montagem: cada camada transforma um pouco a peça. A ativação não linear é o 'toque artesanal' de cada estação — sem ela, toda a fábrica faria o mesmo que uma única máquina.",
  conceitos: [
    { t: "Camada oculta", d: "Camada entre entrada e saída: H = σ(XW⁽¹⁾ + b⁽¹⁾)." },
    { t: "ReLU", d: "ReLU(x) = max(0, x). Simples, rápida e reduz o problema de gradiente que desaparece." },
    { t: "Sigmoid", d: "σ(x) = 1/(1+e⁻ˣ). Comprime para (0,1); satura nos extremos." },
    { t: "Backpropagation", d: "Calcula gradientes aplicando a regra da cadeia de trás para frente, reaproveitando valores do forward." },
    { t: "Gradiente que desaparece", d: "Gradientes ficam minúsculos ao atravessar muitas camadas; as primeiras camadas param de aprender." },
    { t: "Inicialização Xavier", d: "Escolhe a variância dos pesos ≈ 2/(n_in + n_out) para manter sinais estáveis." },
    { t: "Dropout", d: "Zera ativações aleatoriamente no treino (prob. p) e reescala por 1/(1−p). Regulariza a rede." }
  ],
  formulas: ["H = σ(XW⁽¹⁾ + b⁽¹⁾),  O = HW⁽²⁾ + b⁽²⁾", "ReLU(x) = max(0, x)", "h' = 0 com prob. p;  h/(1−p) caso contrário"],
  quiz: [
    { q: "Sem ativação não linear, empilhar várias camadas lineares resulta em…", o: ["Um modelo muito mais poderoso", "Ainda um modelo linear", "Uma CNN", "Um modelo que não treina"], a: 1, e: "Composição de funções lineares é linear." },
    { q: "ReLU(x) é igual a…", o: ["1/(1+e⁻ˣ)", "max(0, x)", "tanh(x)", "x²"], a: 1, e: "Mantém positivos, zera negativos." },
    { q: "Qual problema a sigmoid causa em redes profundas?", o: ["Gradientes desaparecem quando ela satura", "Gera números negativos", "É impossível derivar", "Consome muita memória"], a: 0, e: "Nos extremos a derivada é quase zero." },
    { q: "O dropout, durante o treino…", o: ["Remove camadas inteiras para sempre", "Zera ativações aleatoriamente com prob. p e reescala por 1/(1−p)", "Duplica neurônios", "Diminui a learning rate"], a: 1, e: "Isso é o 'inverted dropout'." },
    { q: "O backpropagation…", o: ["Calcula gradientes pela regra da cadeia, de trás para frente", "Escolhe a arquitetura", "Gera novos dados", "Só funciona em CNNs"], a: 0, e: "Usa os valores intermediários guardados no forward." },
    { q: "A inicialização Xavier busca…", o: ["Pesos todos iguais a zero", "Manter estável a variância de ativações e gradientes entre camadas", "Pesos muito grandes", "Acelerar o carregamento de dados"], a: 1, e: "Variância ≈ 2/(n_in + n_out)." }
  ],
  vf: [
    { s: "Durante a inferência (teste), o dropout normalmente é desativado.", v: true, e: "Em PyTorch: net.eval()." },
    { s: "Um MLP com uma camada oculta larga o suficiente pode aproximar qualquer função contínua em um domínio compacto.", v: true, e: "Teorema da aproximação universal (o que não diz que é fácil treinar!)." },
    { s: "Inicializar todos os pesos com o mesmo valor é boa prática, pois garante simetria.", v: false, e: "Simetria é o problema! Neurônios iguais aprendem a mesma coisa." }
  ],
  charada: { q: "Sou a porta mais simples do mundo neural: se for negativo, digo zero; se for positivo, deixo passar igualzinho. Quem sou?", r: ["relu", "re lu", "rectified linear unit", "unidade linear retificada"], dica: "Quatro letras. Unidade Linear Retificada.", e: "ReLU = max(0, x)." },
  missao: { t: "MLP com dropout", d: "Crie um MLP com duas camadas ocultas e dropout para o Fashion-MNIST. Compare treino com e sem dropout.", code:
`import torch
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
net.eval()    # dropout desligado (inferência)` }
},
/* ------------------------------------------------------------------ 6 */
{
  id: "builders", num: 6, region: "fund", emoji: "🧱",
  title: "Guia do Construtor (Builders' Guide)",
  boss: "O Mestre de Obras",
  url: "https://d2l.ai/chapter_builders-guide/index.html",
  resumo: `Hora de dominar as <b>ferramentas do PyTorch</b>. Tudo é um <b>Module</b> (<code>nn.Module</code>): uma camada, um bloco
  ou a rede inteira. Você define as partes no <code>__init__</code> e a computação no <code>forward</code>.<br><br>
  Você aprende a: acessar <b>parâmetros</b> (<code>named_parameters</code>, <code>state_dict</code>), aplicar
  <b>inicializações</b> personalizadas, <b>compartilhar parâmetros</b> entre camadas, usar <b>inicialização preguiçosa</b>
  (<code>nn.LazyLinear</code> descobre o tamanho da entrada no primeiro forward), criar <b>camadas customizadas</b>,
  <b>salvar e carregar</b> modelos (<code>torch.save(net.state_dict())</code>) e usar <b>GPUs</b> (<code>.to("cuda")</code>).<br><br>
  Regra de ouro: tensores precisam estar no <b>mesmo dispositivo</b> para operar, e copiar dados entre CPU e GPU é caro.`,
  analogia: "nn.Module é uma peça de LEGO: peças pequenas se encaixam em peças maiores, que se encaixam no castelo inteiro. O state_dict é a foto de como cada peça está posicionada — com ela você remonta o castelo em qualquer lugar.",
  conceitos: [
    { t: "nn.Module", d: "Classe base de camadas e modelos no PyTorch; define __init__ e forward." },
    { t: "nn.Sequential", d: "Module que encadeia outros modules em ordem." },
    { t: "state_dict", d: "Dicionário com todos os parâmetros e buffers de um modelo; usado para salvar/carregar." },
    { t: "Lazy initialization", d: "Camadas como nn.LazyLinear inferem o formato da entrada no primeiro forward." },
    { t: "Parâmetros compartilhados", d: "Reutilizar a mesma camada em vários pontos; os gradientes se somam." },
    { t: "Device", d: "Onde o tensor vive (CPU ou GPU). Operações exigem tensores no mesmo device." }
  ],
  formulas: ["torch.save(net.state_dict(), 'mlp.params')", "net.load_state_dict(torch.load('mlp.params'))"],
  quiz: [
    { q: "Qual método define a computação de um Module customizado?", o: ["__call__", "forward", "compute", "run"], a: 1, e: "Você implementa forward; o __call__ do PyTorch chama ele." },
    { q: "O que nn.LazyLinear faz de especial?", o: ["Treina mais devagar", "Infere in_features no primeiro forward", "Não tem bias", "Só roda na CPU"], a: 1, e: "Inicialização adiada até conhecer o shape da entrada." },
    { q: "Qual a forma recomendada de salvar apenas os parâmetros?", o: ["pickle do objeto inteiro", "torch.save(net.state_dict(), 'arquivo')", "print(net)", "net.export()"], a: 1, e: "Depois recrie a arquitetura e carregue com load_state_dict." },
    { q: "Como mover um tensor X para a GPU?", o: ["X.gpu = True", "X.to('cuda')", "torch.gpu(X)", "X.cuda_mode()"], a: 1, e: "Ou X.cuda(), ou X.to(device)." },
    { q: "O que acontece ao somar um tensor na CPU com outro na GPU?", o: ["Funciona normalmente", "Erro: os tensores precisam estar no mesmo device", "O PyTorch copia automaticamente sem custo", "Resultado é zero"], a: 1, e: "O PyTorch não move silenciosamente; você precisa mover." },
    { q: "Ao compartilhar uma camada em dois lugares da rede, seus gradientes…", o: ["São ignorados", "São somados", "São multiplicados", "Só o primeiro conta"], a: 1, e: "Mesmo parâmetro, contribuições somadas no backprop." }
  ],
  vf: [
    { s: "Transferir dados entre CPU e GPU com muita frequência pode deixar o treino lento.", v: true, e: "A cópia tem custo e pode forçar sincronização." },
    { s: "nn.Sequential só aceita camadas nativas do PyTorch, não Modules customizados.", v: false, e: "Qualquer nn.Module pode entrar." },
    { s: "O state_dict guarda o código Python da arquitetura.", v: false, e: "Guarda apenas tensores (parâmetros/buffers). A arquitetura vem do seu código." }
  ],
  charada: { q: "Sou a peça de LEGO do PyTorch: posso ser uma camada, um bloco ou a rede inteira. Tenho __init__ e forward. Quem sou?", r: ["module", "nn.module", "nnmodule", "modulo", "modulos"], dica: "nn.______", e: "nn.Module, a base de tudo." },
  missao: { t: "Seu próprio bloco", d: "Crie um Module customizado, inicialize, rode na GPU (se houver) e salve/carregue os pesos.", code:
`import torch
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
print(torch.equal(clone(X), net(X)))     # True` }
},
/* ------------------------------------------------------------------ 7 */
{
  id: "cnn", num: 7, region: "visao", emoji: "🔍",
  title: "Redes Neurais Convolucionais (CNN)",
  boss: "O Kraken Convolucional",
  url: "https://d2l.ai/chapter_convolutional-neural-networks/index.html",
  resumo: `Imagens têm estrutura espacial. As <b>CNNs</b> exploram dois princípios: <b>invariância à translação</b>
  (um gato é gato em qualquer canto) e <b>localidade</b> (pixels próximos importam mais).<br><br>
  A camada convolucional desliza um <b>kernel</b> (filtro) pela imagem — tecnicamente uma <b>correlação cruzada</b>.
  Controlamos o tamanho da saída com <b>padding</b> (bordas) e <b>stride</b> (passo). Imagens têm vários <b>canais</b>
  (RGB); cada kernel tem pesos para todos os canais de entrada e gera um canal de saída. Convoluções <b>1×1</b> misturam
  canais. O <b>pooling</b> (máximo ou média) reduz resolução sem ter parâmetros.<br><br>
  Tudo culmina na <b>LeNet</b>, a CNN pioneira para ler dígitos manuscritos.`,
  analogia: "Um kernel é como uma lupa com um 'padrão procurado' (ex.: uma borda vertical). Você passa a lupa por toda a foto e anota onde o padrão aparece. Cada canal de saída é uma lupa diferente.",
  conceitos: [
    { t: "Convolução (correlação cruzada)", d: "Desliza um kernel sobre a entrada calculando somas de produtos em cada posição." },
    { t: "Kernel / filtro", d: "Pequena matriz de pesos compartilhada por todas as posições da imagem." },
    { t: "Padding", d: "Adicionar bordas (geralmente zeros) para controlar o tamanho da saída." },
    { t: "Stride", d: "Tamanho do passo com que o kernel se move; stride > 1 reduz a resolução." },
    { t: "Convolução 1×1", d: "Combina canais em cada pixel; muda o número de canais com poucos parâmetros." },
    { t: "Pooling", d: "Agrega (max ou média) regiões; reduz resolução, sem parâmetros treináveis." },
    { t: "Campo receptivo", d: "Região da entrada que influencia um elemento da saída." },
    { t: "LeNet", d: "CNN clássica (LeCun, anos 90) para reconhecimento de dígitos manuscritos." }
  ],
  formulas: ["saída = ⌊(n − k + 2p) / s⌋ + 1", "parâmetros = k·k·C_in·C_out + C_out"],
  quiz: [
    { q: "Entrada 32×32, kernel 5×5, padding 0, stride 1. Tamanho da saída?", o: ["32×32", "28×28", "27×27", "30×30"], a: 1, e: "32 − 5 + 1 = 28." },
    { q: "Entrada 28×28, kernel 3×3, padding 1, stride 1. Tamanho da saída?", o: ["26×26", "28×28", "30×30", "14×14"], a: 1, e: "28 − 3 + 2 + 1 = 28 (padding 'same')." },
    { q: "Entrada 224, kernel 7, padding 3, stride 2. Saída?", o: ["112", "109", "224", "56"], a: 0, e: "⌊(224 − 7 + 6)/2⌋ + 1 = 111 + 1 = 112." },
    { q: "Conv 3×3 com 16 canais de entrada e 32 de saída (com bias). Quantos parâmetros?", o: ["4.608", "4.640", "512", "9.248"], a: 1, e: "3·3·16·32 + 32 = 4.640." },
    { q: "Para que serve a convolução 1×1?", o: ["Detectar bordas grandes", "Misturar canais / mudar o nº de canais por pixel", "Aumentar a resolução", "Nada, é identidade"], a: 1, e: "Funciona como uma camada densa aplicada a cada pixel." },
    { q: "Sobre o max pooling, é correto dizer que…", o: ["Tem muitos pesos treináveis", "Reduz resolução e dá robustez a pequenas translações, sem parâmetros", "Aumenta o número de canais", "Só existe na LeNet"], a: 1, e: "Pooling não aprende nada; apenas agrega." }
  ],
  vf: [
    { s: "A 'convolução' das bibliotecas de deep learning é, tecnicamente, uma correlação cruzada.", v: true, e: "A diferença (inverter o kernel) não importa, pois o kernel é aprendido." },
    { s: "Camadas de pooling têm pesos aprendíveis.", v: false, e: "Max/avg pooling são operações fixas." },
    { s: "A LeNet foi usada para reconhecer dígitos manuscritos, como em cheques bancários.", v: true, e: "Um dos primeiros sucessos comerciais de redes neurais." }
  ],
  charada: { q: "Sou uma pequena janela que desliza pela imagem, multiplicando e somando por onde passo, com os mesmos pesos em todo lugar. Quem sou?", r: ["kernel", "filtro", "filter", "kernel convolucional", "filtro convolucional", "nucleo"], dica: "Também me chamam de filtro.", e: "O kernel (filtro) convolucional." },
  missao: { t: "Construa a LeNet", d: "Monte a LeNet e verifique o shape da saída de cada camada.", code:
`import torch
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
    print(f"{layer.__class__.__name__:12s} -> {tuple(X.shape)}")` }
},
/* ------------------------------------------------------------------ 8 */
{
  id: "moderncnn", num: 8, region: "visao", emoji: "🏛️",
  title: "CNNs Modernas",
  boss: "O Titã Residual",
  url: "https://d2l.ai/chapter_convolutional-modern/index.html",
  resumo: `Um tour pelas arquiteturas que mudaram a visão computacional:<br>
  • <b>AlexNet</b> (2012): venceu o ImageNet com ReLU, dropout, data augmentation e GPUs.<br>
  • <b>VGG</b>: blocos repetidos de convoluções 3×3 + pooling.<br>
  • <b>NiN</b>: convoluções 1×1 e <i>global average pooling</i> no lugar das camadas densas.<br>
  • <b>GoogLeNet</b>: blocos <b>Inception</b> com ramos paralelos (1×1, 3×3, 5×5, pooling).<br>
  • <b>Batch Normalization</b>: normaliza ativações por minibatch; acelera e estabiliza o treino.<br>
  • <b>ResNet</b>: <b>conexões residuais</b> f(x) = x + g(x) permitem redes com centenas de camadas.<br>
  • <b>DenseNet</b>: concatena saídas em vez de somar. <b>ResNeXt</b>: convoluções agrupadas.<br>
  • <b>RegNet</b>: projetar <i>espaços de design</i> de redes, não redes isoladas.`,
  analogia: "A conexão residual é como estudar com o livro aberto: a camada não precisa reescrever tudo do zero, só anotar as correções (o resíduo) em cima do que já sabia.",
  conceitos: [
    { t: "AlexNet", d: "CNN profunda que venceu o ImageNet 2012; popularizou ReLU, dropout e treino em GPU." },
    { t: "Bloco VGG", d: "Sequência de convoluções 3×3 com padding 1 seguida de max pooling 2×2." },
    { t: "Global average pooling", d: "Média de cada canal sobre toda a dimensão espacial; substitui camadas densas (NiN)." },
    { t: "Bloco Inception", d: "Ramos paralelos com kernels de tamanhos diferentes, concatenados nos canais." },
    { t: "Batch Normalization", d: "Normaliza por média/variância do minibatch e reescala com γ, β aprendidos. Na inferência usa médias móveis." },
    { t: "Conexão residual", d: "Atalho que soma a entrada à saída do bloco: f(x) = x + g(x)." },
    { t: "DenseNet", d: "Cada camada recebe a concatenação das saídas de todas as anteriores." }
  ],
  formulas: ["BN(x) = γ ⊙ (x − μ̂_B)/σ̂_B + β", "f(x) = x + g(x)"],
  quiz: [
    { q: "Qual a ideia central da ResNet?", o: ["Kernels gigantes", "Aprender um resíduo com atalho: f(x) = x + g(x)", "Remover o pooling", "Usar só convoluções 1×1"], a: 1, e: "No pior caso o bloco aprende a identidade." },
    { q: "A DenseNet difere da ResNet porque…", o: ["Não usa convoluções", "Concatena as saídas em vez de somá-las", "Usa sigmoid", "Não tem atalhos"], a: 1, e: "Concatenação → reaproveitamento de features." },
    { q: "Na inferência, a Batch Normalization usa…", o: ["Estatísticas do batch atual", "Médias e variâncias móveis estimadas durante o treino", "Valores aleatórios", "Nada, é desligada"], a: 1, e: "Assim a previsão de um exemplo não depende dos outros do batch." },
    { q: "Um bloco Inception…", o: ["Usa um único kernel 7×7", "Combina ramos paralelos (1×1, 3×3, 5×5, pooling) concatenados", "É uma RNN", "Remove canais"], a: 1, e: "Captura padrões em várias escalas." },
    { q: "A principal ideia da VGG é…", o: ["Repetir blocos de convoluções 3×3 seguidos de pooling", "Atenção", "Conexões densas", "Kernels 11×11"], a: 0, e: "Profundidade com blocos simples e regulares." },
    { q: "A AlexNet venceu o ImageNet 2012 usando…", o: ["SVMs e features manuais", "ReLU, dropout, data augmentation e GPUs", "Transformers", "Árvores de decisão"], a: 1, e: "Marco inicial da era do deep learning." }
  ],
  vf: [
    { s: "Duas convoluções 3×3 empilhadas têm o mesmo campo receptivo de uma 5×5, com menos parâmetros.", v: true, e: "2·9 = 18 pesos por canal vs 25." },
    { s: "Conexões residuais tornam mais difícil treinar redes muito profundas.", v: false, e: "É o contrário: facilitam o fluxo de gradientes." },
    { s: "A NiN substitui as camadas totalmente conectadas finais por global average pooling.", v: true, e: "Menos parâmetros, menos overfitting." }
  ],
  charada: { q: "Quando a rede fica profunda demais e se perde, eu ofereço um atalho: somo a entrada à saída do bloco. No pior caso, o bloco aprende a identidade. Quem sou?", r: ["conexao residual", "residual", "skip connection", "resnet", "atalho", "conexao de atalho", "residual connection", "bloco residual"], dica: "Res…", e: "A conexão residual (skip connection) da ResNet." },
  missao: { t: "Bloco residual", d: "Implemente o bloco residual da ResNet com BatchNorm e teste com e sem convolução 1×1 no atalho.", code:
`import torch
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
print(Residual(6, use_1x1=True, stride=2)(X).shape)  # (4, 6, 3, 3)` }
},
/* ------------------------------------------------------------------ 9 */
{
  id: "rnn", num: 9, region: "seq", emoji: "🔁",
  title: "Redes Neurais Recorrentes (RNN)",
  boss: "O Ouroboros Recorrente",
  url: "https://d2l.ai/chapter_recurrent-neural-networks/index.html",
  resumo: `Texto, áudio e séries temporais são <b>sequências</b>: a ordem importa. Começamos com <b>modelos autorregressivos</b>
  e a hipótese de <b>Markov</b>. Para texto: <b>tokenização</b>, <b>vocabulário</b> (com <code>&lt;unk&gt;</code> para palavras raras)
  e a <b>Lei de Zipf</b> (poucas palavras são muito frequentes).<br><br>
  Um <b>modelo de linguagem</b> estima P(x₁,…,x_T) = Π P(xₜ | x₁…xₜ₋₁). A RNN guarda um <b>estado oculto</b> Hₜ que resume o
  passado e é atualizado a cada passo, <b>reutilizando os mesmos parâmetros</b>. Avaliamos com <b>perplexidade</b>
  (quanto menor, melhor).<br><br>
  Treinamos com <b>backpropagation through time (BPTT)</b>, que pode explodir gradientes — por isso usamos
  <b>gradient clipping</b> e às vezes truncamos a BPTT.`,
  analogia: "Ler um livro é recorrente: você não relê tudo a cada palavra — carrega um 'resumo mental' (estado oculto) e atualiza esse resumo a cada nova palavra.",
  conceitos: [
    { t: "Modelo autorregressivo", d: "Prevê o próximo valor usando os valores anteriores da própria sequência." },
    { t: "Tokenização", d: "Dividir texto em unidades (palavras, caracteres, subpalavras)." },
    { t: "Modelo de linguagem", d: "Estima a probabilidade de sequências de tokens: P(xₜ | x₁…xₜ₋₁)." },
    { t: "Estado oculto", d: "Hₜ = φ(XₜW_xh + Hₜ₋₁W_hh + b_h): memória que resume a sequência até t." },
    { t: "Perplexidade", d: "exp da perda média de entropia cruzada. 1 = previsão perfeita." },
    { t: "BPTT", d: "Backpropagation Through Time: backprop na RNN desenrolada no tempo." },
    { t: "Gradient clipping", d: "Reescala o gradiente se sua norma passar de θ: g ← min(1, θ/‖g‖)·g." }
  ],
  formulas: ["Hₜ = φ(XₜW_xh + Hₜ₋₁W_hh + b_h)", "PPL = exp(−1/n Σ log P(xₜ | x<ₜ))", "g ← min(1, θ/‖g‖) · g"],
  quiz: [
    { q: "O que diferencia uma RNN de um MLP?", o: ["Usa convoluções", "Mantém um estado oculto que carrega informação dos passos anteriores", "Não tem parâmetros", "Só funciona com imagens"], a: 1, e: "A recorrência dá memória à rede." },
    { q: "Perplexidade igual a 1 significa…", o: ["Modelo aleatório", "Modelo prevê perfeitamente o próximo token", "Modelo quebrado", "Vocabulário de 1 palavra"], a: 1, e: "Nenhuma 'surpresa'." },
    { q: "O gradient clipping combate…", o: ["Overfitting", "A explosão de gradientes", "Dados faltantes", "Underfitting"], a: 1, e: "Limita a norma do gradiente." },
    { q: "O que é BPTT?", o: ["Um tipo de pooling", "Backprop através do tempo, na rede desenrolada ao longo da sequência", "Um otimizador", "Uma técnica de tokenização"], a: 1, e: "Backpropagation Through Time." },
    { q: "A Lei de Zipf diz que…", o: ["Todas as palavras são igualmente frequentes", "A frequência de uma palavra é aproximadamente inversamente proporcional ao seu ranking", "Palavras longas são mais frequentes", "O vocabulário é sempre pequeno"], a: 1, e: "Poucas palavras dominam o texto." },
    { q: "O token <unk> representa…", o: ["Início da frase", "Palavras raras ou fora do vocabulário", "Pontuação", "Fim do arquivo"], a: 1, e: "Unknown — desconhecida." }
  ],
  vf: [
    { s: "Em uma RNN, os mesmos parâmetros são reutilizados em todos os passos de tempo.", v: true, e: "Por isso ela lida com sequências de qualquer tamanho." },
    { s: "Perplexidade maior indica um modelo de linguagem melhor.", v: false, e: "Menor perplexidade = menos surpresa = melhor." },
    { s: "Truncar a BPTT após k passos reduz custo e ajuda na estabilidade numérica.", v: true, e: "Troca um pouco de memória de longo prazo por estabilidade." }
  ],
  charada: { q: "Carrego uma memória que passo adiante a cada palavra que leio. Leio uma de cada vez, nunca tudo junto. Sou a 'mochila' da RNN. Quem sou?", r: ["estado oculto", "hidden state", "estado escondido", "h", "ht"], dica: "Hₜ", e: "O estado oculto (hidden state)." },
  missao: { t: "Brincando com nn.RNN", d: "Entenda os shapes de entrada/saída de uma RNN no PyTorch.", code:
`import torch
from torch import nn

vocab_size, num_hiddens, T, batch = 28, 32, 35, 2
rnn = nn.RNN(input_size=vocab_size, hidden_size=num_hiddens)

X = torch.randn(T, batch, vocab_size)   # (tempo, batch, features)
H0 = torch.zeros(1, batch, num_hiddens)
Y, Hn = rnn(X, H0)
print(Y.shape)    # (35, 2, 32)  -> estado em cada passo
print(Hn.shape)   # (1, 2, 32)   -> último estado

# gradient clipping durante o treino:
# torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)` }
},
/* ------------------------------------------------------------------ 10 */
{
  id: "modernrnn", num: 10, region: "seq", emoji: "🧬",
  title: "RNNs Modernas: LSTM, GRU e Seq2Seq",
  boss: "O Tradutor de Três Portões",
  url: "https://d2l.ai/chapter_recurrent-modern/index.html",
  resumo: `RNNs simples esquecem rápido. A <b>LSTM</b> adiciona uma <b>célula de memória</b> e três <b>portões</b>:
  <b>esquecimento</b> (o que apagar), <b>entrada</b> (o que gravar) e <b>saída</b> (o que mostrar). A <b>GRU</b> é uma versão
  mais enxuta com portões de <b>reset</b> e <b>atualização</b>.<br><br>
  Podemos empilhar camadas (<b>RNNs profundas</b>) e ler a sequência nos dois sentidos (<b>RNNs bidirecionais</b>).<br><br>
  Para <b>tradução automática</b> usamos a arquitetura <b>encoder–decoder (seq2seq)</b>: o encoder lê a frase de origem e
  produz um contexto; o decoder gera a tradução token a token. No treino usamos <b>teacher forcing</b>; na geração,
  <b>busca gulosa</b> ou <b>beam search</b>. Avaliamos com <b>BLEU</b>.`,
  analogia: "A LSTM é um caderno com três guardiões: um apaga anotações velhas, outro decide o que vale anotar, e o terceiro escolhe o que você fala em voz alta.",
  conceitos: [
    { t: "LSTM", d: "Long Short-Term Memory: RNN com célula de memória e portões de entrada, esquecimento e saída." },
    { t: "GRU", d: "Gated Recurrent Unit: RNN com portões de reset e atualização; mais simples que a LSTM." },
    { t: "RNN bidirecional", d: "Processa a sequência nos dois sentidos e combina os estados; usa contexto passado e futuro." },
    { t: "Encoder–decoder", d: "Encoder transforma a entrada em representação; decoder gera a saída a partir dela." },
    { t: "Teacher forcing", d: "No treino, o decoder recebe o token correto anterior em vez da própria previsão." },
    { t: "Beam search", d: "Mantém os k melhores candidatos parciais a cada passo. k=1 é a busca gulosa." },
    { t: "BLEU", d: "Métrica de tradução baseada na sobreposição de n-gramas com a referência." }
  ],
  formulas: ["Cₜ = Fₜ ⊙ Cₜ₋₁ + Iₜ ⊙ C̃ₜ", "Hₜ = Oₜ ⊙ tanh(Cₜ)", "GRU: Hₜ = Zₜ ⊙ Hₜ₋₁ + (1 − Zₜ) ⊙ H̃ₜ"],
  quiz: [
    { q: "Qual portão da LSTM decide o que apagar da memória?", o: ["Entrada", "Saída", "Esquecimento", "Reset"], a: 2, e: "Forget gate: Fₜ ⊙ Cₜ₋₁." },
    { q: "Quais portões a GRU possui?", o: ["Entrada, saída e esquecimento", "Reset e atualização", "Apenas um", "Nenhum"], a: 1, e: "Reset gate e update gate." },
    { q: "Teacher forcing é…", o: ["Forçar a GPU", "Alimentar o decoder com o token correto anterior durante o treino", "Uma regularização L2", "Um tipo de atenção"], a: 1, e: "Acelera e estabiliza o treino do decoder." },
    { q: "Beam search com tamanho de feixe k = 1 equivale a…", o: ["Busca exaustiva", "Busca gulosa", "Amostragem aleatória", "Teacher forcing"], a: 1, e: "Só mantém o melhor candidato a cada passo." },
    { q: "A métrica BLEU mede…", o: ["Velocidade do modelo", "Sobreposição de n-gramas entre tradução gerada e referência", "Perplexidade", "Número de parâmetros"], a: 1, e: "Com penalidade para traduções curtas demais." },
    { q: "Uma RNN bidirecional NÃO é adequada para…", o: ["Classificar frases inteiras", "Marcação de partes do discurso", "Gerar o próximo token em tempo real", "Reconhecimento de entidades"], a: 2, e: "Ela precisa do futuro, que ainda não existe na geração." }
  ],
  vf: [
    { s: "LSTMs ajudam a mitigar o desaparecimento do gradiente em sequências longas.", v: true, e: "A célula de memória cria um caminho aditivo para o gradiente." },
    { s: "No seq2seq clássico, o encoder resume a entrada em um estado de contexto passado ao decoder.", v: true, e: "Esse gargalo motivou o mecanismo de atenção." },
    { s: "A busca gulosa sempre encontra a sequência de maior probabilidade.", v: false, e: "Escolhas locais ótimas nem sempre levam ao ótimo global." }
  ],
  charada: { q: "Tenho três guardiões: um decide o que esquecer, outro o que guardar e o último o que mostrar. Dentro de mim corre uma esteira de memória. Quem sou?", r: ["lstm", "long short-term memory", "long short term memory"], dica: "Quatro letras: Long Short-Term Memory.", e: "LSTM!" },
  missao: { t: "LSTM vs GRU", d: "Compare número de parâmetros e shapes de LSTM e GRU.", code:
`import torch
from torch import nn

lstm = nn.LSTM(input_size=28, hidden_size=32, num_layers=2, bidirectional=True)
gru  = nn.GRU(input_size=28, hidden_size=32, num_layers=2)

X = torch.randn(35, 4, 28)
Y, (H, C) = lstm(X)
print("LSTM:", Y.shape, H.shape, C.shape)   # (35,4,64) (4,4,32) (4,4,32)
Y, H = gru(X)
print("GRU :", Y.shape, H.shape)            # (35,4,32) (2,4,32)

count = lambda m: sum(p.numel() for p in m.parameters())
print("params LSTM:", count(lstm), "| GRU:", count(gru))` }
},
/* ------------------------------------------------------------------ 11 */
{
  id: "attention", num: 11, region: "seq", emoji: "⚡",
  title: "Mecanismos de Atenção e Transformers",
  boss: "O Dragão Transformer",
  url: "https://d2l.ai/chapter_attention-mechanisms-and-transformers/index.html",
  resumo: `A <b>atenção</b> funciona como uma busca num banco de dados "macio": uma <b>query</b> é comparada com várias
  <b>keys</b>; a semelhança vira pesos (via softmax) que misturam os <b>values</b>. A forma mais usada é a
  <b>atenção por produto escalar escalado</b>: softmax(QKᵀ/√d)V.<br><br>
  Evolução: atenção de <b>Bahdanau</b> (o decoder olha para todo o encoder) → <b>multi-head attention</b> (várias atenções em
  paralelo) → <b>self-attention</b> (Q, K e V vêm da mesma sequência) + <b>codificação posicional</b> (porque a atenção não
  sabe a ordem) → o <b>Transformer</b>, só com atenção, residual + LayerNorm e FFN por posição.<br><br>
  Daí nascem o <b>Vision Transformer (ViT)</b>, que trata patches de imagem como tokens, e o pré-treino em larga escala:
  <b>BERT</b> (encoder-only), <b>GPT</b> (decoder-only) e <b>T5</b> (encoder–decoder). A base dos LLMs modernos!`,
  analogia: "Atenção é como procurar algo numa biblioteca: sua pergunta (query) é comparada com as etiquetas das prateleiras (keys) e você lê mais dos livros (values) cujas etiquetas combinam melhor.",
  conceitos: [
    { t: "Query, Key, Value", d: "A query é comparada às keys; os pesos resultantes combinam os values." },
    { t: "Atenção produto escalar escalado", d: "softmax(QKᵀ/√d)V; dividir por √d evita saturar a softmax." },
    { t: "Multi-head attention", d: "Várias cabeças de atenção com projeções diferentes, concatenadas e projetadas." },
    { t: "Self-attention", d: "Queries, keys e values vêm da mesma sequência; cada token olha para todos os outros." },
    { t: "Codificação posicional", d: "Informação de posição somada aos embeddings (ex.: senos e cossenos)." },
    { t: "Transformer", d: "Arquitetura baseada só em atenção, com blocos residuais, LayerNorm e FFN posicional." },
    { t: "Vision Transformer (ViT)", d: "Divide a imagem em patches e os trata como tokens de um Transformer." },
    { t: "BERT / GPT / T5", d: "Encoder-only / decoder-only / encoder–decoder pré-treinados em larga escala." }
  ],
  formulas: ["Attention(Q,K,V) = softmax(QKᵀ / √d) V", "PE(i,2j) = sin(i/10000^(2j/d)),  PE(i,2j+1) = cos(i/10000^(2j/d))"],
  quiz: [
    { q: "Por que dividimos QKᵀ por √d?", o: ["Para deixar mais lento", "Para evitar que produtos grandes saturem a softmax e gerem gradientes minúsculos", "Para normalizar os values", "Por tradição"], a: 1, e: "Com d grande, a variância do produto cresce com d." },
    { q: "Na self-attention…", o: ["Q, K e V vêm de sequências diferentes", "Q, K e V vêm da mesma sequência", "Não há keys", "Só existe no decoder"], a: 1, e: "Cada token atende a todos os tokens da mesma sequência." },
    { q: "Por que o Transformer precisa de codificação posicional?", o: ["Para reduzir parâmetros", "Porque a self-attention ignora a ordem dos tokens", "Para acelerar a GPU", "Para substituir a softmax"], a: 1, e: "Sem posição, 'cão morde homem' = 'homem morde cão'." },
    { q: "Multi-head attention é…", o: ["Uma atenção com várias GPUs", "Várias atenções paralelas com projeções diferentes, concatenadas", "Uma RNN com várias camadas", "Atenção sem softmax"], a: 1, e: "Cada cabeça pode focar em relações diferentes." },
    { q: "A self-attention mascarada no decoder serve para…", o: ["Esconder tokens futuros durante o treino autoregressivo", "Remover padding da imagem", "Aumentar a perplexidade", "Nada"], a: 0, e: "O modelo não pode 'colar' olhando o futuro." },
    { q: "O GPT é um Transformer do tipo…", o: ["Encoder-only", "Decoder-only", "Encoder–decoder", "Convolucional"], a: 1, e: "BERT = encoder-only; T5 = encoder–decoder." }
  ],
  vf: [
    { s: "O custo da self-attention cresce quadraticamente com o comprimento da sequência.", v: true, e: "Cada token interage com todos os outros: O(n²)." },
    { s: "O Transformer original usa RNNs no encoder.", v: false, e: "'Attention Is All You Need' — sem recorrência." },
    { s: "O BERT é pré-treinado com modelagem de linguagem mascarada (MLM).", v: true, e: "Prevê tokens escondidos usando contexto dos dois lados." }
  ],
  charada: { q: "Faço uma pergunta (query), comparo com várias etiquetas (keys) e, conforme a semelhança, misturo os conteúdos (values). 'All you need' sou eu. Quem sou?", r: ["atencao", "attention", "mecanismo de atencao", "self-attention", "self attention", "autoatencao"], dica: "Attention is all you need.", e: "O mecanismo de atenção!" },
  missao: { t: "Atenção do zero", d: "Implemente a atenção por produto escalar escalado e compare com nn.MultiheadAttention.", code:
`import math, torch
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
print(mha(X, X, X)[0].shape)                    # (2, 5, 16)` }
},
/* ------------------------------------------------------------------ 12 */
{
  id: "optim", num: 12, region: "treino", emoji: "⛰️",
  title: "Algoritmos de Otimização",
  boss: "O Senhor dos Vales",
  url: "https://d2l.ai/chapter_optimization/index.html",
  resumo: `Otimizar é minimizar a perda de treino — mas em DL nos importamos com <b>generalização</b>. Os desafios:
  <b>mínimos locais</b>, <b>pontos de sela</b> (muito comuns em alta dimensão) e <b>gradientes que desaparecem</b>.
  Em funções <b>convexas</b>, todo mínimo local é global.<br><br>
  A família de otimizadores:<br>
  • <b>GD</b> → <b>SGD</b> → <b>SGD com minibatch</b> (o padrão).<br>
  • <b>Momentum</b>: acumula uma média exponencial dos gradientes ("velocidade").<br>
  • <b>AdaGrad</b>: taxa por coordenada, acumulando gradientes ao quadrado (decai demais).<br>
  • <b>RMSProp</b>: usa média móvel dos quadrados — resolve o decaimento do AdaGrad.<br>
  • <b>Adadelta</b> e <b>Adam</b>: Adam = momentum + RMSProp + correção de viés. O favorito da galera.<br>
  • <b>Agendamento da taxa</b>: decaimento por etapas, cosseno e <b>warmup</b>.`,
  analogia: "Momentum é uma bola de boliche descendo o vale: ela ganha embalo e não para em qualquer buraquinho. Adam é a bola com amortecedores inteligentes que ajustam a velocidade para cada direção.",
  conceitos: [
    { t: "Convexidade", d: "Em funções convexas, qualquer mínimo local é global — otimização 'fácil'." },
    { t: "Ponto de sela", d: "Gradiente zero, mas não é mínimo nem máximo; comum em alta dimensão." },
    { t: "Momentum", d: "vₜ = βvₜ₋₁ + gₜ; x ← x − ηvₜ. Suaviza oscilações e acelera em direções consistentes." },
    { t: "AdaGrad", d: "Divide a taxa pela raiz da soma acumulada dos gradientes ao quadrado, por coordenada." },
    { t: "RMSProp", d: "Como AdaGrad, mas usa média móvel exponencial dos quadrados (não decai para zero)." },
    { t: "Adam", d: "Combina momentum (1º momento) e RMSProp (2º momento) com correção de viés." },
    { t: "Warmup", d: "Começar o treino com taxa pequena e aumentá-la gradualmente nas primeiras iterações." }
  ],
  formulas: ["vₜ = β₁vₜ₋₁ + (1−β₁)gₜ,  sₜ = β₂sₜ₋₁ + (1−β₂)gₜ²", "v̂ = vₜ/(1−β₁ᵗ),  ŝ = sₜ/(1−β₂ᵗ)", "x ← x − η v̂ / (√ŝ + ε)"],
  quiz: [
    { q: "O que o momentum faz?", o: ["Zera gradientes antigos", "Acumula média exponencial dos gradientes, suavizando oscilações", "Aumenta o batch", "Aplica dropout"], a: 1, e: "Velocidade acumulada nas direções consistentes." },
    { q: "O Adam combina…", o: ["Dropout e BatchNorm", "Momentum (1º momento) e escala adaptativa estilo RMSProp (2º momento), com correção de viés", "SGD e AdaGrad sem momento", "Newton e BFGS"], a: 1, e: "Por isso é tão robusto por padrão." },
    { q: "Qual o problema do AdaGrad em deep learning?", o: ["Não converge em convexas", "A taxa efetiva decai demais, pois a soma dos quadrados só cresce", "É muito barato", "Não usa gradientes"], a: 1, e: "RMSProp corrige com média móvel." },
    { q: "Um ponto de sela é…", o: ["O mínimo global", "Um ponto com gradiente zero que não é mínimo nem máximo", "Um ponto com gradiente infinito", "O ponto inicial"], a: 1, e: "Sobe em uma direção, desce em outra." },
    { q: "Warmup da taxa de aprendizado significa…", o: ["Começar com lr pequena e aumentar no início", "Começar com lr enorme", "Aquecer a GPU", "Treinar sem dados"], a: 0, e: "Evita instabilidade no começo, muito usado em Transformers." },
    { q: "Em uma função convexa…", o: ["Há muitos mínimos locais ruins", "Todo mínimo local é global", "Não existe mínimo", "O gradiente é sempre zero"], a: 1, e: "Propriedade-chave da convexidade." }
  ],
  vf: [
    { s: "Em alta dimensão, pontos de sela são mais comuns que mínimos locais ruins.", v: true, e: "Para ser mínimo, todas as direções precisam 'subir'." },
    { s: "Uma taxa de aprendizado alta demais pode fazer a perda divergir.", v: true, e: "Os passos ultrapassam o vale e explodem." },
    { s: "SGD com batch de tamanho 1 é sempre o mais eficiente em GPUs.", v: false, e: "Batches maiores aproveitam o paralelismo vetorizado." }
  ],
  charada: { q: "Sou uma bola rolando morro abaixo: guardo a velocidade dos passos anteriores, então não paro em qualquer buraquinho e oscilo menos nos vales estreitos. Quem sou?", r: ["momentum", "momento", "sgd com momentum", "inercia"], dica: "Física: massa × velocidade.", e: "Momentum!" },
  missao: { t: "Corrida de otimizadores", d: "Compare SGD, Momentum, RMSProp e Adam minimizando uma função simples.", code:
`import torch

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
    print(f"{name:9s} f(x) = {f(x).item():.6f}")` }
},
/* ------------------------------------------------------------------ 13 */
{
  id: "perf", num: 13, region: "treino", emoji: "🏎️",
  title: "Performance Computacional",
  boss: "O Colosso Multi-GPU",
  url: "https://d2l.ai/chapter_computational-performance/index.html",
  resumo: `Treinar rápido é uma arte. Programação <b>imperativa</b> (Python linha a linha) é flexível; <b>simbólica/compilada</b>
  permite otimizar o grafo. O melhor dos dois mundos é a <b>hibridização</b> (no PyTorch: TorchScript e <code>torch.compile</code>).<br><br>
  Frameworks executam de forma <b>assíncrona</b>: o Python enfileira operações e o backend executa — chamar
  <code>.item()</code> ou <code>print</code> força <b>sincronização</b>. Também há <b>paralelismo automático</b> entre CPU e GPU.<br><br>
  Conheça o <b>hardware</b> (latências, memória, largura de banda) e escale com várias GPUs: <b>paralelismo de dados</b>
  (cada GPU com uma cópia do modelo e parte do batch, gradientes agregados com <b>all-reduce</b>), <b>paralelismo de modelo</b>
  e <b>servidores de parâmetros</b>.`,
  analogia: "Paralelismo de dados é uma cozinha com 4 chefs fazendo a mesma receita, cada um com parte dos ingredientes. No fim eles comparam anotações (all-reduce) para que todos ajustem a receita igual.",
  conceitos: [
    { t: "Programação imperativa", d: "Executa operação por operação; fácil de depurar, mais overhead." },
    { t: "Programação simbólica / compilação", d: "Define o grafo antes de executar; permite otimizações globais." },
    { t: "Computação assíncrona", d: "O frontend enfileira operações enquanto o backend as executa em paralelo." },
    { t: "Paralelismo de dados", d: "Cada dispositivo tem uma cópia do modelo e processa parte do minibatch." },
    { t: "Paralelismo de modelo", d: "Partes (camadas) do modelo ficam em dispositivos diferentes." },
    { t: "All-reduce", d: "Operação coletiva que soma gradientes de todos os dispositivos e distribui o resultado." },
    { t: "Servidor de parâmetros", d: "Arquitetura em que servidores guardam e atualizam parâmetros para muitos workers." }
  ],
  formulas: ["batch efetivo = batch por GPU × nº de GPUs", "g = (1/k) Σᵢ gᵢ  (all-reduce)"],
  quiz: [
    { q: "Em paralelismo de dados…", o: ["Cada GPU tem uma camada diferente", "Cada GPU tem uma cópia do modelo e processa parte do batch; gradientes são agregados", "Só uma GPU treina", "Os dados são duplicados em todas sem divisão"], a: 1, e: "É a estratégia multi-GPU mais comum." },
    { q: "Vantagem da programação simbólica/compilada:", o: ["Mais fácil de depurar", "Otimizações de grafo e menos overhead do Python", "Não precisa de GPU", "Treina sem dados"], a: 1, e: "Fusão de operações, reuso de memória, portabilidade." },
    { q: "O que é computação assíncrona nos frameworks?", o: ["Treinar em dias diferentes", "O frontend enfileira operações enquanto o backend executa", "Usar duas linguagens", "Desligar a GPU"], a: 1, e: "Esconde a latência do Python." },
    { q: "Ao usar k GPUs com paralelismo de dados, é comum…", o: ["Diminuir o batch", "Aumentar o batch total e ajustar a taxa de aprendizado", "Usar lr zero", "Desativar o otimizador"], a: 1, e: "Mantém cada GPU ocupada." },
    { q: "All-reduce serve para…", o: ["Reduzir o modelo", "Agregar (somar/média) gradientes de todos os dispositivos e distribuir o resultado", "Apagar a memória", "Comprimir imagens"], a: 1, e: "Todos terminam com o mesmo gradiente." },
    { q: "Um gargalo comum no treino distribuído é…", o: ["A cor da GPU", "A comunicação/largura de banda entre dispositivos", "O nome das variáveis", "O tamanho do monitor"], a: 1, e: "Comunicar pode custar mais que calcular." }
  ],
  vf: [
    { s: "Chamar .item() ou print em um tensor pode forçar sincronização e quebrar a assincronia.", v: true, e: "O Python precisa esperar o valor ficar pronto." },
    { s: "Paralelismo de modelo divide partes/camadas do modelo entre GPUs.", v: true, e: "Útil quando o modelo não cabe numa GPU." },
    { s: "Adicionar GPUs sempre gera speedup linear perfeito.", v: false, e: "Comunicação e sincronização têm custo." }
  ],
  charada: { q: "Sou a ponte entre o Python flexível e a velocidade dos grafos compilados: escreva imperativo, rode otimizado. No PyTorch 2 me chamam com torch.______. Quem sou?", r: ["compile", "torch.compile", "torchcompile", "hibridizacao", "hybridize", "hibridizar", "compilacao"], dica: "Uma palavra só: o que compiladores fazem.", e: "torch.compile — hibridização moderna." },
  missao: { t: "Medindo a assincronia", d: "Meça tempos com e sem sincronização e experimente torch.compile.", code:
`import time, torch

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

# multi-GPU: torch.nn.parallel.DistributedDataParallel (DDP)` }
},
/* ------------------------------------------------------------------ 14 */
{
  id: "cv", num: 14, region: "apps", emoji: "📷",
  title: "Visão Computacional",
  boss: "O Ciclope Detector",
  url: "https://d2l.ai/chapter_computer-vision/index.html",
  resumo: `Aplicações práticas de visão:<br>
  • <b>Data augmentation</b>: flips, recortes, cores — mais variedade, menos overfitting.<br>
  • <b>Fine-tuning</b>: aproveite um modelo pré-treinado (ImageNet), troque a camada de saída e ajuste com lr menor.<br>
  • <b>Detecção de objetos</b>: <b>bounding boxes</b>, <b>anchor boxes</b>, <b>IoU</b> e <b>non-maximum suppression (NMS)</b>;
  detecção multiescala, <b>SSD</b> e a família <b>R-CNN</b> (Fast, Faster com RPN, Mask R-CNN).<br>
  • <b>Segmentação semântica</b>: classificar cada pixel; <b>convolução transposta</b> para aumentar resolução e
  <b>FCN</b> (fully convolutional network).<br>
  • <b>Transferência de estilo</b>: combinar conteúdo de uma imagem com o estilo de outra (matriz de Gram).<br>
  • Projetos Kaggle: CIFAR-10 e raças de cães (ImageNet Dogs).`,
  analogia: "Fine-tuning é contratar um fotógrafo experiente e só ensinar a ele o que sua loja vende — muito mais rápido que treinar alguém que nunca viu uma câmera.",
  conceitos: [
    { t: "Data augmentation", d: "Transformações aleatórias nas imagens de treino para aumentar a diversidade." },
    { t: "Fine-tuning", d: "Reaproveitar um modelo pré-treinado e ajustá-lo para uma nova tarefa." },
    { t: "Anchor box", d: "Caixas pré-definidas de vários tamanhos/proporções usadas como candidatas na detecção." },
    { t: "IoU", d: "Intersection over Union: área da interseção ÷ área da união de duas caixas." },
    { t: "NMS", d: "Non-Maximum Suppression: remove caixas sobrepostas, mantendo a de maior confiança." },
    { t: "Segmentação semântica", d: "Atribuir uma classe a cada pixel da imagem." },
    { t: "Convolução transposta", d: "Operação que aumenta a resolução espacial (upsampling aprendível)." },
    { t: "Matriz de Gram", d: "Correlações entre canais de features; captura o 'estilo' de uma imagem." }
  ],
  formulas: ["IoU(A, B) = |A ∩ B| / |A ∪ B|"],
  quiz: [
    { q: "Qual o IoU de duas caixas idênticas?", o: ["0", "0,5", "1", "2"], a: 2, e: "Interseção = união." },
    { q: "O NMS serve para…", o: ["Aumentar o número de caixas", "Remover caixas redundantes sobrepostas, mantendo a mais confiante", "Normalizar pixels", "Treinar o backbone"], a: 1, e: "Evita várias detecções do mesmo objeto." },
    { q: "No fine-tuning, normalmente…", o: ["Reinicializamos tudo", "Reaproveitamos pesos pré-treinados e usamos lr menor nas camadas pré-treinadas", "Removemos todas as convoluções", "Usamos lr gigante"], a: 1, e: "A nova camada de saída pode ter lr maior." },
    { q: "A convolução transposta é usada para…", o: ["Reduzir a resolução", "Aumentar a resolução (upsampling)", "Calcular IoU", "Fazer pooling"], a: 1, e: "Essencial em segmentação e GANs." },
    { q: "Na transferência de estilo, o estilo é capturado por…", o: ["Histograma de cores", "Matriz de Gram das features", "Bounding boxes", "Rótulos de classe"], a: 1, e: "Correlação entre canais." },
    { q: "A grande novidade do Faster R-CNN foi…", o: ["Region Proposal Network (RPN)", "Usar RNNs", "Remover anchor boxes", "Segmentação de instâncias"], a: 0, e: "Propostas de regiões aprendidas pela própria rede." }
  ],
  vf: [
    { s: "Segmentação semântica classifica cada pixel da imagem.", v: true, e: "Saída do mesmo tamanho da entrada." },
    { s: "Data augmentation aleatória deve ser aplicada ao conjunto de teste por padrão.", v: false, e: "Normalmente só no treino (exceto técnicas como TTA)." },
    { s: "Mask R-CNN estende o Faster R-CNN para segmentação de instâncias.", v: true, e: "Adiciona um ramo que prevê máscaras." }
  ],
  charada: { q: "Meço a amizade entre caixas: divido o que elas compartilham pelo total que ocupam juntas. Se valho 1, são gêmeas; se valho 0, nem se tocam. Quem sou?", r: ["iou", "intersection over union", "interseccao sobre uniao", "jaccard", "indice de jaccard"], dica: "Sigla de três letras.", e: "IoU — Intersection over Union (índice de Jaccard)." },
  missao: { t: "Fine-tuning de uma ResNet-18", d: "Carregue uma ResNet-18 pré-treinada e adapte para 2 classes (ex.: cachorro-quente vs não).", code:
`import torch, torchvision
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
print(box_iou(a, b))   # 25 / 175 ≈ 0.1429` }
},
/* ------------------------------------------------------------------ 15 */
{
  id: "nlppre", num: 15, region: "apps", emoji: "📚",
  title: "PLN: Pré-treinamento",
  boss: "O Oráculo dos Embeddings",
  url: "https://d2l.ai/chapter_natural-language-processing-pretraining/index.html",
  resumo: `Como representar palavras para uma rede? Vetores one-hot não capturam semelhança. Os <b>word embeddings</b>
  colocam palavras num espaço contínuo onde significados parecidos ficam próximos.<br><br>
  • <b>word2vec</b>: <b>skip-gram</b> (centro → contexto) e <b>CBOW</b> (contexto → centro).<br>
  • Treino eficiente: <b>negative sampling</b> e <b>hierarchical softmax</b> (evitam a softmax sobre o vocabulário inteiro).<br>
  • <b>GloVe</b>: usa estatísticas globais de coocorrência.<br>
  • <b>fastText</b>: embeddings de <b>subpalavras</b> (n-gramas de caracteres) e <b>BPE</b> (byte pair encoding).<br>
  • <b>BERT</b>: embeddings <b>contextuais</b>, pré-treinado com <b>MLM</b> (masked language model) e <b>NSP</b>
  (next sentence prediction).`,
  analogia: "Embeddings são um mapa da cidade das palavras: 'gato' mora no bairro dos bichos, ao lado de 'cachorro'; 'rei' e 'rainha' moram na mesma rua, separados pela mesma distância que 'homem' e 'mulher'.",
  conceitos: [
    { t: "Word embedding", d: "Vetor denso e contínuo que representa uma palavra; palavras similares ficam próximas." },
    { t: "Skip-gram", d: "Prevê palavras de contexto a partir da palavra central." },
    { t: "CBOW", d: "Continuous Bag of Words: prevê a palavra central a partir do contexto." },
    { t: "Negative sampling", d: "Treina distinguindo pares reais de pares com palavras 'negativas' amostradas." },
    { t: "GloVe", d: "Embeddings treinados a partir da matriz global de coocorrência de palavras." },
    { t: "BPE", d: "Byte Pair Encoding: funde iterativamente os pares de símbolos mais frequentes em subpalavras." },
    { t: "BERT", d: "Encoder Transformer pré-treinado com MLM e NSP; gera representações contextuais." }
  ],
  formulas: ["P(w_o | w_c) = exp(u_oᵀv_c) / Σᵢ exp(uᵢᵀv_c)", "rei − homem + mulher ≈ rainha"],
  quiz: [
    { q: "O skip-gram prevê…", o: ["A palavra central a partir do contexto", "As palavras de contexto a partir da palavra central", "A próxima frase", "O sentimento"], a: 1, e: "CBOW faz o contrário." },
    { q: "Negative sampling serve para…", o: ["Remover palavras negativas", "Evitar a softmax sobre o vocabulário inteiro, amostrando exemplos negativos", "Gerar sentimentos negativos", "Aumentar o vocabulário"], a: 1, e: "Transforma o problema em classificações binárias baratas." },
    { q: "Vantagem do fastText:", o: ["Não precisa de dados", "Lida com palavras raras/novas usando n-gramas de subpalavras", "É um Transformer", "Usa imagens"], a: 1, e: "'desconhecidamente' ainda tem pedaços conhecidos." },
    { q: "O BPE…", o: ["Funde iterativamente os pares de símbolos mais frequentes", "Remove stopwords", "É uma métrica", "Ordena o vocabulário"], a: 0, e: "Cria um vocabulário de subpalavras." },
    { q: "O que o BERT oferece que o word2vec não oferece?", o: ["Vetores one-hot", "Embeddings contextuais: a mesma palavra muda de vetor conforme o contexto", "Menos parâmetros", "Nada"], a: 1, e: "'banco' de sentar ≠ 'banco' de dinheiro." },
    { q: "Na MLM do BERT, aproximadamente quantos tokens são selecionados para predição?", o: ["1%", "15%", "50%", "100%"], a: 1, e: "Desses, 80% viram [MASK], 10% token aleatório, 10% inalterados." }
  ],
  vf: [
    { s: "Vetores one-hot capturam bem a similaridade entre palavras.", v: false, e: "O cosseno entre quaisquer dois one-hots diferentes é 0." },
    { s: "GloVe usa estatísticas globais de coocorrência de palavras.", v: true, e: "Global Vectors." },
    { s: "Embeddings word2vec permitem analogias como rei − homem + mulher ≈ rainha.", v: true, e: "Relações viram direções no espaço." }
  ],
  charada: { q: "Pego uma palavra e a transformo num ponto num espaço de muitas dimensões, onde 'gato' mora perto de 'cachorro'. Quem sou?", r: ["embedding", "embeddings", "word embedding", "vetor de palavra", "word vector", "incorporacao", "word2vec"], dica: "Em PyTorch: nn.________", e: "Word embedding!" },
  missao: { t: "Explorando embeddings", d: "Crie uma camada de embedding e calcule similaridade de cosseno.", code:
`import torch
from torch import nn

vocab = {"gato": 0, "cachorro": 1, "carro": 2, "rei": 3, "rainha": 4}
emb = nn.Embedding(num_embeddings=len(vocab), embedding_dim=8)

def vec(w): return emb(torch.tensor(vocab[w]))
cos = nn.CosineSimilarity(dim=0)
print(cos(vec("gato"), vec("cachorro")).item())  # aleatório antes de treinar!

# Com vetores GloVe pré-treinados (via d2l ou torchtext),
# 'gato' e 'cachorro' ficariam bem próximos.` }
},
/* ------------------------------------------------------------------ 16 */
{
  id: "nlpapp", num: 16, region: "apps", emoji: "💬",
  title: "PLN: Aplicações",
  boss: "O Juiz das Inferências",
  url: "https://d2l.ai/chapter_natural-language-processing-applications/index.html",
  resumo: `Com representações pré-treinadas em mãos, resolvemos tarefas reais:<br>
  • <b>Análise de sentimentos</b> (IMDb): classificar textos como positivos/negativos usando
  <b>RNN bidirecional</b> com GloVe ou <b>textCNN</b> (convoluções 1D + max-over-time pooling).<br>
  • <b>Inferência de linguagem natural (NLI)</b> no dataset SNLI: dada uma <b>premissa</b> e uma <b>hipótese</b>, decidir entre
  <b>implicação</b>, <b>contradição</b> ou <b>neutro</b>. Modelo de <b>atenção decomponível</b>: <i>atender → comparar → agregar</i>.<br>
  • <b>Fine-tuning do BERT</b> para classificação de um texto, de pares de textos, marcação de tokens e perguntas e respostas
  (prevendo início e fim do trecho da resposta).`,
  analogia: "NLI é um detetive: lê o depoimento (premissa) e a suspeita (hipótese) e decide se a suspeita é confirmada, desmentida ou se não dá para concluir nada.",
  conceitos: [
    { t: "Análise de sentimentos", d: "Classificar a polaridade (positiva/negativa) de um texto." },
    { t: "textCNN", d: "CNN para texto: convoluções 1D com vários tamanhos + max-over-time pooling." },
    { t: "NLI", d: "Natural Language Inference: classificar a relação premissa–hipótese (implicação, contradição, neutro)." },
    { t: "Atenção decomponível", d: "Modelo de NLI em três etapas: atender, comparar e agregar." },
    { t: "Token [CLS]", d: "Token especial do BERT cuja representação resume a entrada para classificação." },
    { t: "Fine-tuning do BERT", d: "Adicionar uma pequena camada de saída e ajustar todos os parâmetros na tarefa-alvo." }
  ],
  formulas: ["classe = softmax(W · h_[CLS] + b)"],
  quiz: [
    { q: "Quais são as classes da NLI?", o: ["Positivo, negativo, neutro", "Implicação, contradição, neutro", "Verdadeiro, falso", "Pergunta, resposta"], a: 1, e: "Entailment, contradiction, neutral." },
    { q: "O textCNN usa…", o: ["Convoluções 2D em imagens", "Convoluções 1D sobre a sequência + max-over-time pooling", "Apenas RNNs", "Árvores"], a: 1, e: "Kernels de larguras diferentes capturam n-gramas." },
    { q: "As etapas da atenção decomponível são…", o: ["Codificar, decodificar, traduzir", "Atender, comparar, agregar", "Tokenizar, embutir, classificar", "Amostrar, filtrar, ranquear"], a: 1, e: "Attend, compare, aggregate." },
    { q: "Para classificação de texto com BERT, usamos…", o: ["A representação do token [CLS] + uma camada de saída", "Só o último token", "Embeddings one-hot", "Uma CNN 2D"], a: 0, e: "[CLS] resume a sequência inteira." },
    { q: "Em perguntas e respostas (estilo SQuAD) com BERT, o modelo prevê…", o: ["Uma nota de 0 a 5", "As posições de início e fim do trecho da resposta", "A próxima frase", "A tradução"], a: 1, e: "A resposta é um trecho (span) do texto." },
    { q: "Por que usar GloVe pré-treinado na análise de sentimentos?", o: ["Deixa o modelo maior sem motivo", "Transfere conhecimento semântico, ajudando quando há poucos dados", "Remove a necessidade de treino", "Traduz o texto"], a: 1, e: "Transfer learning para texto." }
  ],
  vf: [
    { s: "Análise de sentimentos é um problema de classificação de texto.", v: true, e: "Geralmente binária ou com poucas classes." },
    { s: "No fine-tuning do BERT, todos os parâmetros podem ser ajustados junto com a nova camada de saída.", v: true, e: "Essa é a abordagem padrão." },
    { s: "NLI recebe um único texto como entrada.", v: false, e: "Recebe um par: premissa e hipótese." }
  ],
  charada: { q: "Leio uma premissa e uma hipótese e decido: uma implica a outra, se contradizem, ou nada a ver. Que tarefa sou? (sigla em inglês)", r: ["nli", "natural language inference", "inferencia de linguagem natural", "rte"], dica: "Três letras: Natural Language ...", e: "NLI — Natural Language Inference." },
  missao: { t: "textCNN em 15 linhas", d: "Implemente a textCNN para classificação de sentimentos.", code:
`import torch
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
print(net(torch.randint(0, 5000, (8, 50))).shape)   # (8, 2)` }
},
/* ------------------------------------------------------------------ 17 */
{
  id: "rl", num: 17, region: "front", emoji: "🎮",
  title: "Aprendizado por Reforço",
  boss: "O Agente Errante",
  url: "https://d2l.ai/chapter_reinforcement-learning/index.html",
  resumo: `Um <b>agente</b> interage com um <b>ambiente</b>: observa um <b>estado</b>, toma uma <b>ação</b>, recebe uma
  <b>recompensa</b> e vai para um novo estado. Formalizamos isso como um <b>Processo de Decisão de Markov (MDP)</b>
  com (S, A, T, r, γ).<br><br>
  O objetivo é uma <b>política</b> π que maximize o <b>retorno descontado</b> (γ pondera o futuro). As funções
  <b>valor</b> V(s) e <b>valor-ação</b> Q(s,a) obedecem à <b>equação de Bellman</b>.<br><br>
  • <b>Value iteration</b>: quando conhecemos o modelo do ambiente, aplicamos Bellman repetidamente.<br>
  • <b>Q-learning</b>: sem conhecer o modelo, aprendemos Q a partir de experiências, explorando com <b>ε-greedy</b>.`,
  analogia: "É como treinar um cachorro: ninguém diz a ele a sequência certa de movimentos, mas ele ganha petisco (recompensa) quando acerta e aprende, por tentativa e erro, o que vale a pena.",
  conceitos: [
    { t: "MDP", d: "Processo de Decisão de Markov: estados S, ações A, transições T, recompensas r e desconto γ." },
    { t: "Política (π)", d: "Regra que escolhe uma ação em cada estado." },
    { t: "Fator de desconto (γ)", d: "Valor em [0,1] que pondera recompensas futuras. γ=0 → só o agora." },
    { t: "Função valor Q(s,a)", d: "Retorno esperado ao tomar a ação a no estado s e seguir a política depois." },
    { t: "Equação de Bellman", d: "Relaciona o valor de um estado ao valor dos estados seguintes." },
    { t: "Q-learning", d: "Algoritmo sem modelo, off-policy: Q ← Q + α[r + γ max Q(s',a') − Q]." },
    { t: "ε-greedy", d: "Com prob. ε escolhe ação aleatória (explorar), senão a melhor conhecida (explorar o conhecido)." }
  ],
  formulas: ["V*(s) = maxₐ Σ_{s'} P(s'|s,a)[r(s,a) + γ V*(s')]", "Q(s,a) ← Q(s,a) + α [r + γ maxₐ' Q(s',a') − Q(s,a)]"],
  quiz: [
    { q: "O fator de desconto γ…", o: ["Define a taxa de aprendizado", "Pondera recompensas futuras, entre 0 e 1", "Conta o número de estados", "É a probabilidade de exploração"], a: 1, e: "Recompensas distantes valem menos." },
    { q: "O Q-learning é…", o: ["On-policy e baseado em modelo", "Off-policy e sem modelo", "Supervisionado", "Uma CNN"], a: 1, e: "Aprende Q* independentemente da política usada para explorar." },
    { q: "Na estratégia ε-greedy…", o: ["Sempre escolhe a melhor ação", "Com prob. ε age aleatoriamente; senão escolhe a melhor ação", "Nunca explora", "Escolhe a pior ação"], a: 1, e: "Equilíbrio exploração vs. exploração do conhecido." },
    { q: "O value iteration requer…", o: ["Nada", "Conhecer o modelo do ambiente (transições e recompensas)", "Uma GPU", "Dados rotulados"], a: 1, e: "É planejamento, não aprendizado por experiência." },
    { q: "A equação de Bellman relaciona…", o: ["Perda e acurácia", "O valor de um estado ao valor dos estados seguintes", "Pesos e vieses", "Treino e teste"], a: 1, e: "Valor = recompensa imediata + valor futuro descontado." },
    { q: "Q(s,a) representa…", o: ["A recompensa imediata apenas", "O retorno esperado ao tomar a ação a em s e seguir a política", "A probabilidade do estado", "O número de ações"], a: 1, e: "Quanto vale fazer a em s." }
  ],
  vf: [
    { s: "Com γ = 0, o agente só se importa com a recompensa imediata.", v: true, e: "Míope total." },
    { s: "Em RL há sempre um rótulo correto para cada ação.", v: false, e: "Só há recompensas, muitas vezes atrasadas." },
    { s: "Sem exploração, o agente pode ficar preso em uma política subótima.", v: true, e: "Precisa experimentar para descobrir algo melhor." }
  ],
  charada: { q: "Sou uma tabela de sabedoria: para cada estado e cada ação, guardo quanto vale a pena. Atualizo-me com a recompensa mais o melhor futuro. Que algoritmo me usa?", r: ["q-learning", "q learning", "qlearning", "q", "tabela q", "q-table", "funcao q"], dica: "Uma letra + 'learning'.", e: "Q-learning e sua tabela Q." },
  missao: { t: "Q-learning num corredor", d: "Um agente num corredor de 6 casas aprende a andar até o tesouro na última casa.", code:
`import random

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

print(["→" if q[1] > q[0] else "←" for q in Q[:-1]])   # política aprendida` }
},
/* ------------------------------------------------------------------ 18 */
{
  id: "gp", num: 18, region: "front", emoji: "🌫️",
  title: "Processos Gaussianos",
  boss: "A Névoa das Funções",
  url: "https://d2l.ai/chapter_gaussian-processes/index.html",
  resumo: `Um <b>processo gaussiano (GP)</b> é uma <b>distribuição sobre funções</b>: qualquer conjunto finito de pontos da
  função segue uma <b>gaussiana multivariada</b>. Ele é definido por uma <b>função média</b> e uma <b>função kernel</b>
  (covariância), que diz quão parecidos são os valores da função em dois pontos.<br><br>
  O kernel <b>RBF</b> é o mais popular; seu <b>lengthscale</b> controla a suavidade. Dados os pontos observados, a
  <b>posterior</b> tem forma fechada: dá uma previsão <b>e</b> uma <b>incerteza</b> (que cresce longe dos dados).<br><br>
  Os hiperparâmetros do kernel são aprendidos maximizando a <b>verossimilhança marginal</b>. A inferência exata custa
  <b>O(n³)</b>. Na prática, use <b>GPyTorch</b>. GPs são o motor da <b>otimização bayesiana</b>.`,
  analogia: "Um GP é como um desenhista que diz: 'Não sei exatamente a curva, mas aqui estão mil curvas plausíveis'. Onde você mostrou pontos, as curvas se apertam; longe deles, elas se espalham (incerteza).",
  conceitos: [
    { t: "Processo gaussiano", d: "Distribuição sobre funções; qualquer conjunto finito de valores é gaussiano conjunto." },
    { t: "Kernel (covariância)", d: "Função k(x, x') que mede a similaridade entre valores da função em dois pontos." },
    { t: "Kernel RBF", d: "k(x,x') = a²·exp(−‖x−x'‖² / 2ℓ²). Gera funções suaves." },
    { t: "Lengthscale (ℓ)", d: "Controla quão rápido a função varia. ℓ grande → funções mais suaves." },
    { t: "Posterior do GP", d: "Distribuição das funções após observar dados: média e variância em forma fechada." },
    { t: "Verossimilhança marginal", d: "Probabilidade dos dados integrando sobre funções; usada para ajustar hiperparâmetros." }
  ],
  formulas: ["f ~ GP(m(x), k(x, x'))", "k_RBF(x,x') = a² exp(−‖x−x'‖² / (2ℓ²))", "μ* = K*ᵀ (K + σ²I)⁻¹ y"],
  quiz: [
    { q: "O kernel de um GP define…", o: ["A taxa de aprendizado", "A covariância/similaridade entre valores da função em pontos diferentes", "O número de camadas", "A perda"], a: 1, e: "É o coração do GP." },
    { q: "Um lengthscale grande produz…", o: ["Funções muito oscilantes", "Funções mais suaves, que variam lentamente", "Nenhuma função", "Ruído puro"], a: 1, e: "Pontos distantes continuam correlacionados." },
    { q: "Grande vantagem dos GPs:", o: ["Escalam para bilhões de pontos", "Fornecem incerteza calibrada nas previsões", "Não têm hiperparâmetros", "Só funcionam com imagens"], a: 1, e: "Sabem o que não sabem." },
    { q: "O custo da inferência exata de um GP com n pontos é…", o: ["O(1)", "O(n)", "O(n log n)", "O(n³)"], a: 3, e: "Por causa da inversão/decomposição de uma matriz n×n." },
    { q: "Os hiperparâmetros do kernel normalmente são aprendidos…", o: ["Maximizando a verossimilhança marginal", "Com dropout", "Aleatoriamente", "Pelo teste"], a: 0, e: "Equilibra ajuste aos dados e complexidade." },
    { q: "Longe dos dados de treino, a incerteza posterior…", o: ["Vai a zero", "Aumenta, voltando à incerteza da prior", "Fica negativa", "Não muda nunca"], a: 1, e: "Sem dados, sem certeza." }
  ],
  vf: [
    { s: "Um GP é totalmente especificado por uma função média e uma função de covariância.", v: true, e: "Assim como uma gaussiana por média e covariância." },
    { s: "GPs não conseguem expressar incerteza.", v: false, e: "É justamente seu ponto forte." },
    { s: "GPs são muito usados em otimização bayesiana de hiperparâmetros.", v: true, e: "Como modelo substituto (surrogate)." }
  ],
  charada: { q: "Não sou uma função, sou uma nuvem de funções possíveis. Qualquer punhado de pontos que você escolher segue uma gaussiana conjunta. Quem sou?", r: ["processo gaussiano", "processos gaussianos", "gaussian process", "gp", "gps"], dica: "Duas letras: G e P.", e: "Processo Gaussiano (GP)." },
  missao: { t: "Posterior de um GP com NumPy", d: "Implemente a média e o desvio padrão posteriores com kernel RBF.", code:
`import numpy as np

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
    print(f"x={x:+.2f}  média={m:+.3f}  incerteza=±{2*s:.3f}")` }
},
/* ------------------------------------------------------------------ 19 */
{
  id: "hpo", num: 19, region: "front", emoji: "🎛️",
  title: "Otimização de Hiperparâmetros",
  boss: "O Afinador Supremo",
  url: "https://d2l.ai/chapter_hyperparameter-optimization/index.html",
  resumo: `<b>Hiperparâmetros</b> (taxa de aprendizado, batch size, nº de camadas, dropout…) não são aprendidos pelo
  gradiente — mas mudam tudo. <b>HPO</b> é automatizar essa escolha.<br><br>
  • Defina um <b>espaço de busca</b> (use escala <b>logarítmica</b> para lr).<br>
  • <b>Busca aleatória</b> costuma vencer a <b>busca em grade</b>.<br>
  • <b>Otimização bayesiana</b>: um modelo substituto (ex.: GP) + uma <b>função de aquisição</b> escolhem a próxima configuração.<br>
  • <b>Multi-fidelidade</b>: avaliações baratas (poucas épocas) para descartar cedo as configs ruins —
  <b>successive halving</b> e <b>Hyperband</b>.<br>
  • <b>HPO assíncrono</b> (ex.: ASHA) para usar vários workers sem espera. O livro usa a biblioteca <b>Syne Tune</b>.<br>
  Sempre avalie no conjunto de <b>validação</b>, nunca no teste.`,
  analogia: "Successive halving é um reality show de culinária: começam 64 chefs com 5 minutos cada; metade é eliminada a cada rodada e os sobreviventes ganham mais tempo, até sobrar o campeão.",
  conceitos: [
    { t: "Hiperparâmetro vs parâmetro", d: "Parâmetros (pesos) são aprendidos pelo gradiente; hiperparâmetros são escolhidos fora do treino." },
    { t: "Busca aleatória", d: "Amostra configurações aleatórias do espaço de busca; simples e eficaz." },
    { t: "Otimização bayesiana", d: "Usa um modelo substituto e uma função de aquisição para escolher configurações promissoras." },
    { t: "Multi-fidelidade", d: "Usa avaliações baratas e aproximadas (menos épocas/dados) para filtrar configurações." },
    { t: "Successive halving", d: "Treina muitas configs com pouco orçamento, mantém a melhor fração e aumenta o orçamento." },
    { t: "HPO assíncrono", d: "Workers iniciam novas avaliações sem esperar os demais (ex.: ASHA)." }
  ],
  formulas: ["lr ~ 10^U(−5, −1)  (amostragem log-uniforme)"],
  quiz: [
    { q: "Qual destes é um hiperparâmetro?", o: ["Os pesos da primeira camada", "A taxa de aprendizado", "O viés da saída", "O gradiente"], a: 1, e: "Pesos e vieses são parâmetros aprendidos." },
    { q: "Por que a busca aleatória frequentemente supera a busca em grade?", o: ["Porque é determinística", "Porque explora mais valores distintos nas dimensões que realmente importam", "Porque usa gradientes", "Não supera nunca"], a: 1, e: "Na grade, muitas avaliações repetem os mesmos valores da dimensão importante." },
    { q: "Successive halving…", o: ["Divide a lr pela metade", "Treina muitas configs com pouco orçamento, mantém as melhores e aumenta o orçamento", "Remove metade dos dados", "Divide o modelo em dois"], a: 1, e: "Base do Hyperband." },
    { q: "A otimização bayesiana usa…", o: ["Apenas força bruta", "Um modelo substituto (ex.: GP) + uma função de aquisição", "Dropout", "Backpropagation nos hiperparâmetros"], a: 1, e: "Equilibra explorar e aproveitar." },
    { q: "Por que fazer HPO com o conjunto de validação e não o de teste?", o: ["Tanto faz", "Para não superajustar ao teste e ter uma estimativa honesta do desempenho final", "Porque o teste é menor", "Porque o teste não tem rótulos"], a: 1, e: "O teste deve ser 'virgem'." },
    { q: "A vantagem do HPO assíncrono é…", o: ["Usar menos dados", "Workers não esperam uns pelos outros, aproveitando melhor os recursos", "Não precisar de validação", "Ser determinístico"], a: 1, e: "Sem tempo ocioso." }
  ],
  vf: [
    { s: "Os pesos de uma rede neural são hiperparâmetros.", v: false, e: "Pesos são parâmetros aprendidos." },
    { s: "Buscar a taxa de aprendizado em escala logarítmica é uma boa prática.", v: true, e: "1e-4, 1e-3, 1e-2… a ordem de grandeza importa." },
    { s: "Multi-fidelidade usa avaliações baratas (ex.: poucas épocas) para descartar configurações ruins cedo.", v: true, e: "Economiza muito tempo de computação." }
  ],
  charada: { q: "Começo com um torneio enorme e pouco tempo para cada um. A cada rodada, metade dos competidores cai e os sobreviventes ganham mais tempo. Quem sou?", r: ["successive halving", "halving sucessivo", "reducao pela metade sucessiva", "hyperband", "asha", "divisao sucessiva"], dica: "Successive ________.", e: "Successive Halving (e seu primo Hyperband)." },
  missao: { t: "Busca aleatória", d: "Implemente busca aleatória com amostragem log-uniforme da taxa de aprendizado.", code:
`import math, random

def validation_error(lr, dropout):     # finja que isto treina um modelo
    return (math.log10(lr) + 2.5)**2 + (dropout - 0.3)**2 + random.gauss(0, 0.01)

best = None
for trial in range(30):
    cfg = {"lr": 10 ** random.uniform(-5, -1), "dropout": random.uniform(0, 0.7)}
    err = validation_error(**cfg)
    if best is None or err < best[0]:
        best = (err, cfg)
        print(f"trial {trial:2d}: novo melhor {err:.4f} {cfg}")

print("vencedor:", best)` }
},
/* ------------------------------------------------------------------ 20 */
{
  id: "gan", num: 20, region: "front", emoji: "🎭",
  title: "Redes Adversariais Generativas (GANs)",
  boss: "O Falsificador e o Detetive",
  url: "https://d2l.ai/chapter_generative-adversarial-networks/index.html",
  resumo: `Uma <b>GAN</b> é um jogo entre duas redes: o <b>gerador</b> G transforma ruído aleatório z em amostras falsas;
  o <b>discriminador</b> D tenta distinguir reais de falsas. Treinamos com um jogo <b>minimax</b>: D maximiza sua
  acurácia, G tenta enganá-lo.<br><br>
  Na prática, o gerador maximiza log D(G(z)) (perda <b>não saturante</b>) para ter gradientes fortes no começo. No equilíbrio
  ideal, D(x) = ½ em tudo.<br><br>
  A <b>DCGAN</b> leva a ideia para imagens: o gerador usa <b>convoluções transpostas</b> + BatchNorm + ReLU, e o
  discriminador usa convoluções com <b>LeakyReLU</b>. Problemas clássicos: instabilidade e <b>mode collapse</b> (pouca variedade).`,
  analogia: "Um falsificador de quadros e um perito de museu treinando juntos: cada vez que o perito melhora, o falsificador precisa caprichar mais — até as falsificações ficarem indistinguíveis.",
  conceitos: [
    { t: "Gerador (G)", d: "Rede que transforma ruído aleatório z em amostras sintéticas." },
    { t: "Discriminador (D)", d: "Rede que estima a probabilidade de uma amostra ser real." },
    { t: "Jogo minimax", d: "min_G max_D E[log D(x)] + E[log(1 − D(G(z)))]." },
    { t: "Perda não saturante", d: "G maximiza log D(G(z)) em vez de minimizar log(1 − D(G(z))), para gradientes melhores." },
    { t: "DCGAN", d: "GAN convolucional: convs transpostas no gerador, LeakyReLU no discriminador, BatchNorm." },
    { t: "Mode collapse", d: "O gerador produz pouca variedade, cobrindo só alguns modos dos dados." }
  ],
  formulas: ["min_G max_D  E_x[log D(x)] + E_z[log(1 − D(G(z)))]"],
  quiz: [
    { q: "O discriminador tenta…", o: ["Gerar imagens", "Distinguir dados reais de falsos", "Comprimir dados", "Classificar em 1000 classes"], a: 1, e: "É um classificador binário real vs falso." },
    { q: "O gerador recebe como entrada…", o: ["Imagens reais", "Ruído aleatório z", "Rótulos", "Gradientes"], a: 1, e: "Ele mapeia o espaço latente em amostras." },
    { q: "O que é mode collapse?", o: ["O gerador produz pouca variedade", "O discriminador quebra", "A GPU desliga", "Overfitting do D"], a: 0, e: "Ex.: sempre gerar o mesmo dígito." },
    { q: "Na DCGAN, o gerador aumenta a resolução usando…", o: ["Max pooling", "Convoluções transpostas", "Atenção", "Dropout"], a: 1, e: "Do vetor latente até a imagem completa." },
    { q: "Por que usar a perda não saturante no gerador?", o: ["Para gradientes mais fortes no início, quando D rejeita facilmente as amostras", "Para treinar mais devagar", "Para remover o discriminador", "Para evitar BatchNorm"], a: 0, e: "log(1 − D(G(z))) satura quando D(G(z)) ≈ 0." },
    { q: "No equilíbrio ideal de uma GAN, D(x) vale…", o: ["0", "1", "½", "∞"], a: 2, e: "D não consegue distinguir: chuta 50/50." }
  ],
  vf: [
    { s: "GANs são treinadas como um jogo entre duas redes.", v: true, e: "Gerador vs. discriminador." },
    { s: "O discriminador precisa de rótulos de classe criados manualmente para os dados.", v: false, e: "Os rótulos real/falso vêm de graça." },
    { s: "LeakyReLU é comum no discriminador da DCGAN.", v: true, e: "Evita neurônios 'mortos' e ajuda o fluxo de gradiente." }
  ],
  charada: { q: "Somos dois rivais: um falsifica, o outro investiga. Quanto melhor um fica, melhor o outro precisa ser. Que modelo formamos? (sigla)", r: ["gan", "gans", "rede adversarial generativa", "redes adversariais generativas", "generative adversarial network", "dcgan"], dica: "Três letras.", e: "GAN — Generative Adversarial Network." },
  missao: { t: "Uma GAN mínima", d: "Treine uma GAN que aprende a gerar números de uma gaussiana N(4, 1.25).", code:
`import torch
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
print(f"média {s.mean().item():.2f} (alvo 4.00), desvio {s.std().item():.2f} (alvo 1.25)")` }
},
/* ------------------------------------------------------------------ 21 */
{
  id: "recsys", num: 21, region: "front", emoji: "🍿",
  title: "Sistemas de Recomendação",
  boss: "O Algoritmo do Streaming",
  url: "https://d2l.ai/chapter_recommender-systems/index.html",
  resumo: `Recomendadores estão em todo lugar (filmes, músicas, compras). A <b>filtragem colaborativa</b> usa padrões de
  muitos usuários. O feedback pode ser <b>explícito</b> (notas) ou <b>implícito</b> (cliques, compras, tempo assistido).<br><br>
  • <b>Fatoração de matrizes</b>: aproxima a matriz usuário × item por vetores latentes (mais vieses).<br>
  • <b>AutoRec</b>: autoencoder para completar a matriz de notas.<br>
  • <b>Ranking personalizado</b>: perdas <b>BPR</b> e <b>hinge</b> — o importante é a ordem, não a nota.<br>
  • <b>NeuMF</b>: combina fatoração generalizada (GMF) com um MLP.<br>
  • <b>Sequence-aware</b> (Caser): considera a ordem das interações.<br>
  • <b>Factorization Machines</b> e <b>DeepFM</b>: modelam interações entre features (ótimo para CTR).<br>
  Desafio clássico: <b>cold start</b>.`,
  analogia: "A fatoração de matrizes descobre 'gostos ocultos': talvez você seja 70% fã de ficção científica e 20% de comédia, e cada filme tem essas mesmas 'notas ocultas'. Combine os dois e adivinhe sua nota.",
  conceitos: [
    { t: "Filtragem colaborativa", d: "Recomenda com base em padrões de preferência de muitos usuários." },
    { t: "Feedback implícito", d: "Sinais indiretos de preferência: cliques, compras, visualizações." },
    { t: "Fatoração de matrizes", d: "R ≈ PQᵀ + vieses: vetores latentes de usuários (P) e itens (Q)." },
    { t: "BPR", d: "Bayesian Personalized Ranking: item positivo deve ter escore maior que um negativo." },
    { t: "NeuMF", d: "Neural Matrix Factorization: une GMF e MLP para modelar interações usuário-item." },
    { t: "Factorization Machines", d: "Modelam interações de pares entre features com vetores latentes, em tempo linear." },
    { t: "Cold start", d: "Dificuldade de recomendar para usuários ou itens novos sem histórico." }
  ],
  formulas: ["R̂ᵤᵢ = pᵤᵀqᵢ + bᵤ + bᵢ", "BPR: maximize Σ ln σ(ŷᵤᵢ − ŷᵤⱼ)  (i positivo, j negativo)"],
  quiz: [
    { q: "A filtragem colaborativa…", o: ["Usa só o conteúdo do item", "Recomenda usando padrões de preferências de muitos usuários", "Precisa de imagens", "Ignora usuários"], a: 1, e: "'Quem gostou disso também gostou de…'" },
    { q: "Qual é um exemplo de feedback implícito?", o: ["Nota de 1 a 5 estrelas", "Cliques e tempo de visualização", "Uma resenha escrita", "Um formulário"], a: 1, e: "O usuário não declara explicitamente a preferência." },
    { q: "A fatoração de matrizes…", o: ["Ordena itens alfabeticamente", "Aprende vetores latentes de usuários e itens cujo produto aproxima as interações", "Usa convoluções 2D", "Remove usuários"], a: 1, e: "Base de muitos recomendadores (prêmio Netflix)." },
    { q: "A perda BPR otimiza…", o: ["O erro quadrático das notas", "Que itens positivos fiquem acima dos negativos no ranking de cada usuário", "A acurácia de imagens", "A perplexidade"], a: 1, e: "Ranking por pares." },
    { q: "O problema de cold start é…", o: ["GPU fria", "Dificuldade com usuários/itens novos sem histórico", "Treino lento", "Overfitting"], a: 1, e: "Sem interações, a filtragem colaborativa sofre." },
    { q: "Factorization Machines modelam…", o: ["Só features individuais", "Interações de pares entre features via vetores latentes", "Sequências de imagens", "Recompensas"], a: 1, e: "Muito usadas em previsão de cliques (CTR)." }
  ],
  vf: [
    { s: "Avaliar recomendadores apenas com RMSE é sempre suficiente para problemas de ranking.", v: false, e: "Para ranking usamos métricas como Hit@k e AUC." },
    { s: "O NeuMF combina fatoração (GMF) com um MLP.", v: true, e: "Junta interação linear e não linear." },
    { s: "Modelos sequence-aware consideram a ordem das interações do usuário.", v: true, e: "O que você viu por último importa." }
  ],
  charada: { q: "Desmonto uma tabela gigante e quase vazia de notas em duas tabelinhas: uma de gostos dos usuários, outra de características dos filmes. Multiplicando-as, adivinho as notas que faltam. Quem sou?", r: ["fatoracao de matrizes", "fatoracao de matriz", "fatoracao matricial", "matrix factorization", "mf"], dica: "Fatoração de ________.", e: "Fatoração de matrizes (Matrix Factorization)." },
  missao: { t: "Fatoração de matrizes", d: "Implemente MF com vieses em PyTorch.", code:
`import torch
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
print("RMSE de treino:", loss.sqrt().item())` }
},
/* ------------------------------------------------------------------ 22 */
{
  id: "math", num: 22, region: "math", emoji: "📐",
  title: "Apêndice: Matemática para Deep Learning",
  boss: "O Arquimago da Entropia",
  url: "https://d2l.ai/chapter_appendix-mathematics-for-deep-learning/index.html",
  resumo: `O apêndice aprofunda a matemática que sustenta tudo:<br>
  • <b>Geometria e álgebra linear</b>: produtos escalares, ângulos, projeções, determinantes.<br>
  • <b>Autodecomposição</b>: Av = λv; autovalores revelam como a matriz estica o espaço.<br>
  • <b>Cálculo de uma e várias variáveis</b>: gradientes, <b>Hessiana</b>, Taylor; e <b>cálculo integral</b>.<br>
  • <b>Variáveis aleatórias</b>, esperança, variância e <b>distribuições</b> (Bernoulli, Gaussiana, Poisson…).<br>
  • <b>Máxima verossimilhança (MLE)</b> e <b>Naive Bayes</b>.<br>
  • <b>Estatística</b>: estimadores, viés-variância, testes de hipótese e intervalos de confiança.<br>
  • <b>Teoria da informação</b>: <b>entropia</b>, informação mútua, <b>divergência KL</b> e <b>entropia cruzada</b> — de onde
  vem a perda que você usa desde o capítulo 4!`,
  analogia: "Entropia é a 'surpresa média' de uma loteria: se o resultado é sempre o mesmo, ninguém se surpreende (entropia 0); uma moeda justa é a loteria de 2 opções mais imprevisível (1 bit).",
  conceitos: [
    { t: "Autovalor / autovetor", d: "Av = λv: o vetor v só é esticado (por λ) pela matriz A, sem mudar de direção." },
    { t: "Hessiana", d: "Matriz das segundas derivadas parciais; descreve a curvatura da função." },
    { t: "Esperança e variância", d: "E[X] é a média ponderada; Var[X] = E[(X − E[X])²] mede a dispersão." },
    { t: "MLE", d: "Máxima verossimilhança: escolhe os parâmetros que tornam os dados observados mais prováveis." },
    { t: "Naive Bayes", d: "Classificador que assume features condicionalmente independentes dada a classe." },
    { t: "Entropia", d: "H(p) = −Σ p log p: incerteza (surpresa média) de uma distribuição." },
    { t: "Divergência KL", d: "KL(p‖q) = Σ p log(p/q) ≥ 0; mede quanto q difere de p. Não é simétrica." },
    { t: "Entropia cruzada", d: "H(p,q) = −Σ p log q = H(p) + KL(p‖q)." }
  ],
  formulas: ["Av = λv", "H(p) = −Σᵢ pᵢ log pᵢ", "KL(p‖q) = Σᵢ pᵢ log(pᵢ/qᵢ)", "H(p, q) = H(p) + KL(p‖q)"],
  quiz: [
    { q: "Em Av = λv, v e λ são…", o: ["Matriz e vetor", "Autovetor e autovalor", "Gradiente e Hessiana", "Média e variância"], a: 1, e: "v mantém a direção; λ é o fator de escala." },
    { q: "A entropia de uma moeda é máxima quando…", o: ["p(cara) = 0", "p(cara) = 0,5", "p(cara) = 1", "Nunca"], a: 1, e: "1 bit: máxima imprevisibilidade." },
    { q: "Sobre KL(p‖q), é correto:", o: ["Pode ser negativa", "É ≥ 0, vale 0 só se p = q, e não é simétrica", "É sempre simétrica", "É igual à entropia"], a: 1, e: "KL(p‖q) ≠ KL(q‖p) em geral." },
    { q: "A entropia cruzada H(p, q) é igual a…", o: ["H(p) − KL(p‖q)", "H(p) + KL(p‖q)", "KL(q‖p)", "H(q)"], a: 1, e: "Por isso minimizar a entropia cruzada = minimizar KL (com p fixo)." },
    { q: "O Naive Bayes assume que…", o: ["As classes são equiprováveis", "As features são condicionalmente independentes dada a classe", "Os dados são gaussianos", "Não há rótulos"], a: 1, e: "Por isso é 'ingênuo' — e ainda assim funciona bem." },
    { q: "A Hessiana é…", o: ["O vetor gradiente", "A matriz de segundas derivadas parciais", "Uma distribuição", "Um otimizador"], a: 1, e: "Descreve a curvatura; usada no método de Newton." }
  ],
  vf: [
    { s: "Minimizar a entropia cruzada (com p fixo) equivale a minimizar a divergência KL.", v: true, e: "H(p) é constante em relação a q." },
    { s: "A variância de uma constante é 1.", v: false, e: "É 0: constantes não variam." },
    { s: "Uma matriz real simétrica tem todos os autovalores reais.", v: true, e: "Teorema espectral." }
  ],
  charada: { q: "Meço a surpresa média de uma distribuição. Uma moeda viciada que sempre dá cara me deixa em zero. Quem sou?", r: ["entropia", "entropy", "entropia de shannon", "shannon entropy"], dica: "Shannon me criou em 1948.", e: "Entropia (de Shannon)." },
  missao: { t: "Teoria da informação na prática", d: "Calcule entropia, KL e entropia cruzada e verifique H(p,q) = H(p) + KL(p‖q).", code:
`import numpy as np

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
print("autovalores:", np.linalg.eigvalsh(A))   # [1, 3]` }
}
];
