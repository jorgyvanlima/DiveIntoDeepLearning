// Gera docs/GUIA_DE_ESTUDO.md a partir de js/data.js
// Uso (macOS):  /System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc scripts/gerar_guia.js > docs/GUIA_DE_ESTUDO.md
// Uso (Node):   node scripts/gerar_guia.js > docs/GUIA_DE_ESTUDO.md
var window = {};
if (typeof load === "function") load("js/data.js");
else { require("vm").runInNewContext(require("fs").readFileSync("js/data.js", "utf8"), { window: window }); }
var out = typeof print === "function" ? print : console.log;
var W = window.D2L_WORLDS, R = window.D2L_REGIONS;
function txt(h) {
  return h.replace(/<br\s*\/?>/g, "\n").replace(/<\/?b>/g, "**").replace(/<\/?i>/g, "_")
          .replace(/<code>(.*?)<\/code>/g, "`$1`").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
          .replace(/<[^>]+>/g, "").split("\n").map(function (l) { return l.trim(); }).join("\n").replace(/\n{3,}/g, "\n\n");
}
var L = [];
L.push("# 📘 Guia de Estudo — Dive into Deep Learning (d2l.ai)");
L.push("");
L.push("> Guia complementar ao **D2L Quest**. Para cada capítulo do livro [Dive into Deep Learning](https://d2l.ai): resumo em linguagem simples, analogia, conceitos-chave, fórmulas, perguntas de autoavaliação (com gabarito) e uma missão prática em PyTorch.");
L.push("");
L.push("_Este arquivo é gerado automaticamente a partir de `js/data.js` por `scripts/gerar_guia.js`. Edite o conteúdo lá e gere de novo._");
L.push("");
L.push("## Como usar este guia");
L.push("");
L.push("1. **Antes** de ler o capítulo no livro, leia o resumo e a analogia aqui (5 min) para montar o mapa mental.");
L.push("2. Leia o capítulo no d2l.ai com o notebook aberto e **rode o código**.");
L.push("3. Cubra as definições dos conceitos e tente explicá-los em voz alta (recordação ativa + técnica Feynman).");
L.push("4. Responda às perguntas de autoavaliação **sem olhar** o gabarito. Meta: ≥ 70% (igual ao chefão do app).");
L.push("5. Faça a missão prática e **modifique** algo no código.");
L.push("6. Revise no dia seguinte, depois em 3, 7 e 14 dias (repetição espaçada — a Arena de Revisão do app faz isso por você).");
L.push("");
L.push("## Sumário");
L.push("");
R.forEach(function (r) {
  L.push("**" + r.emoji + " " + r.name + "**");
  L.push("");
  W.filter(function (w) { return w.region === r.id; }).forEach(function (w) {
    // âncora no padrão do GitHub: minúsculas, mantém acentos, remove pontuação, espaço -> hífen
    var a = (w.num + ". " + w.title).toLowerCase().replace(/[^\p{L}\p{N} -]/gu, "").replace(/ /g, "-");
    L.push("- [" + w.num + ". " + w.title + "](#" + a + ")");
  });
  L.push("");
});
W.forEach(function (w) {
  L.push("---");
  L.push("");
  L.push("## " + w.num + ". " + w.title);
  L.push("");
  L.push(w.emoji + " **Chefão:** " + w.boss + " · 📖 [Ler o capítulo no d2l.ai](" + w.url + ")");
  L.push("");
  L.push("### Resumo");
  L.push("");
  L.push(txt(w.resumo));
  L.push("");
  L.push("> 💡 **Analogia:** " + w.analogia);
  L.push("");
  L.push("### Conceitos-chave");
  L.push("");
  L.push("| Conceito | Definição |");
  L.push("|---|---|");
  w.conceitos.forEach(function (c) { L.push("| **" + c.t + "** | " + c.d.replace(/\|/g, "\\|") + " |"); });
  L.push("");
  L.push("### Fórmulas");
  L.push("");
  L.push("```text");
  w.formulas.forEach(function (f) { L.push(f); });
  L.push("```");
  L.push("");
  L.push("### Autoavaliação");
  L.push("");
  w.quiz.forEach(function (q, i) {
    L.push((i + 1) + ". " + q.q);
    q.o.forEach(function (o, k) { L.push("   - " + "abcd"[k] + ") " + o); });
  });
  L.push("");
  L.push("**Verdadeiro ou falso?**");
  L.push("");
  w.vf.forEach(function (v) { L.push("- " + v.s); });
  L.push("");
  L.push("<details><summary>✅ Gabarito</summary>");
  L.push("");
  w.quiz.forEach(function (q, i) { L.push((i + 1) + ". **" + "abcd"[q.a] + ")** " + q.o[q.a] + " — " + q.e); });
  L.push("");
  w.vf.forEach(function (v) { L.push("- **" + (v.v ? "V" : "F") + "** — " + v.e); });
  L.push("");
  L.push("</details>");
  L.push("");
  L.push("### 🧩 Charada");
  L.push("");
  L.push("> " + w.charada.q);
  L.push("");
  L.push("<details><summary>Resposta</summary>");
  L.push("");
  L.push("**" + w.charada.r[0] + "** — " + w.charada.e);
  L.push("");
  L.push("</details>");
  L.push("");
  L.push("### 💻 Missão: " + w.missao.t);
  L.push("");
  L.push(w.missao.d);
  L.push("");
  L.push("```python");
  L.push(w.missao.code);
  L.push("```");
  L.push("");
});
L.push("---");
L.push("");
L.push("Créditos: conteúdo de estudo original em português, baseado na estrutura do livro *Dive into Deep Learning* de Aston Zhang, Zachary C. Lipton, Mu Li e Alexander J. Smola ([d2l.ai](https://d2l.ai)).");
out(L.join("\n"));
