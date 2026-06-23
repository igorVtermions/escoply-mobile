# Escoply App Guidelines

Este arquivo define o padrao que qualquer pessoa ou IA deve seguir ao mexer no app Escoply. Ele foi derivado da referencia visual principal do produto e deve orientar design, UX, fluxo, arquitetura de codigo, pastas e componentizacao.

## Produto

Escoply e um app mobile-first para freelancers controlarem o trabalho do briefing ate a entrega. O app deve parecer claro, organizado, produtivo e confiavel.

Frase do produto:

```txt
Do briefing a entrega, tudo no controle.
```

Fluxo principal do produto:

```txt
Cliente -> Projeto -> Escopo -> Orcamento -> Aprovacao -> Entrega -> Pagamento
```

Sempre que uma tela ou componente novo for criado, ele deve apoiar esse fluxo. Evite telas soltas que nao se conectam a cliente, projeto, prazo, escopo, financeiro ou acompanhamento.

## Principios de UX

- Clareza acima de complexidade.
- Informacao agrupada por contexto.
- Dashboard direto, com resumo do dia e pendencias reais.
- Poucos passos para registrar algo.
- Visual consistente, moderno e limpo.
- Acoes principais sempre visiveis e faceis de tocar.
- Evite excesso de texto explicativo dentro da interface.
- Mostre status, prazos e valores de forma escaneavel.
- Priorize cards compactos, listas claras e hierarquia visual simples.

## Identidade Visual

O visual base usa fundo claro, superficies brancas, bordas suaves, sombra leve e azul escuro como cor principal.

Tokens principais ja refletidos em `tailwind.config.js` e `constants/Colors.ts`:

```txt
primary: #071E63
primaryDark: #041342
primaryLight: #123A9C
secondary: #8B5CF6
background: #F8FAFC
surface: #FFFFFF
surfaceMuted: #F1F5F9
text: #0F172A
textMuted: #64748B
textLight: #94A3B8
border: #E2E8F0
success: #22C55E
warning: #F59E0B
danger: #EF4444
info: #3B82F6
```

Regras visuais:

- Fundo padrao: `bg-background`.
- Cards: `bg-surface`, borda `border-border`, raio moderado, sombra discreta.
- Botao primario: azul escuro, texto branco.
- Estados positivos usam verde; pendencias usam amarelo/laranja; erro/cancelado usa vermelho.
- Nao criar layouts pesados, escuros ou com gradientes fortes.
- Nao usar muitos tons novos fora da paleta.
- Icones devem ser consistentes, preferencialmente `lucide-react-native`.
- Telas devem ter bastante respiro, mas sem parecer landing page.

## Navegacao

Navegacao principal esperada por tabs:

```txt
Dashboard
Clientes
Projetos
Lembretes
Configuracoes
```

Modulos principais do produto:

```txt
Clientes
Projetos
Escopo
Orcamentos
Aprovacoes
Materiais
Lembretes
Obrigacoes
Pagamentos
```

O Dashboard deve ser a primeira tela util do app, com:

- saudacao do usuario;
- clientes ativos;
- projetos em andamento;
- prazos proximos;
- valor a receber;
- lembretes de hoje;
- proximos prazos;
- orcamentos pendentes.

## Padrao De Telas

Cada tela de listagem deve ter:

- titulo claro;
- campo de busca quando houver lista;
- filtro simples quando fizer sentido;
- lista em cards ou linhas agrupadas;
- status visivel;
- botao flutuante ou botao primario para criar novo item.

Cada tela de detalhe deve ter:

- header com voltar;
- nome principal do recurso;
- status;
- informacoes essenciais no topo;
- secoes/tabs relacionadas;
- CTA principal no final ou fixo quando fizer sentido.

Exemplos:

- Detalhe do cliente mostra contato, observacoes, projetos, orcamentos, lembretes e materiais.
- Detalhe do projeto mostra prazo, valor, progresso do escopo, escopo, orcamento, aprovacoes, materiais, lembretes e pagamentos.

## Entidades Principais

Modelo inicial sugerido:

```txt
Profile
Client
Project
ScopeItem
Budget
BudgetItem
Approval
ProjectAsset
Reminder
Obligation
Payment
```

Campos comuns:

```txt
id
userId
createdAt
updatedAt
```

Status sugeridos:

```txt
Client: active, prospect, inactive
Project: briefing, budget, approved, in_progress, review, done, canceled
Budget: draft, sent, approved, rejected
Approval: pending, approved, rejected
Payment: pending, paid, overdue, canceled
Reminder: pending, done, overdue
Obligation: pending, paid, overdue
```

## Arquitetura De Pastas

Use Expo Router para rotas e mantenha regra clara: `app/` define navegacao; `src/` contem produto, dados, componentes e regras.

Estrutura recomendada:

```txt
app/
  _layout.tsx
  index.tsx
  (auth)/
    login.tsx
    register.tsx
  (tabs)/
    _layout.tsx
    dashboard.tsx
    clients.tsx
    projects.tsx
    reminders.tsx
    settings.tsx
  clients/
    [id].tsx
  projects/
    [id].tsx

src/
  components/
    ui/
    layout/
    feedback/
    forms/
    domain/
  features/
    auth/
    dashboard/
    clients/
    projects/
    budgets/
    approvals/
    reminders/
    obligations/
    settings/
  hooks/
  lib/
    supabase.ts
    query-client.ts
  providers/
  services/
  types/
  utils/
  constants/
```

Regras:

- Componentes genericos ficam em `src/components/ui`.
- Componentes de negocio ficam dentro de `src/features/<modulo>/components`.
- Hooks de negocio ficam em `src/features/<modulo>/hooks`.
- Funcoes de acesso a dados ficam em `src/features/<modulo>/api` ou `src/services` quando forem compartilhadas.
- Tipos compartilhados ficam em `src/types`.
- Rotas em `app/` devem ser finas: buscam componentes de `src/features`.

## Componentizacao

Criar componentes pequenos, nomeados pelo papel real na interface.

Componentes base esperados:

```txt
Button
IconButton
Card
Input
Select
Badge
StatusBadge
Screen
Header
EmptyState
LoadingState
ErrorState
ListItem
Section
BottomSheet
```

Componentes de dominio esperados:

```txt
ClientCard
ProjectCard
BudgetCard
ReminderItem
ScopeChecklist
ApprovalList
MaterialList
PaymentSummary
DashboardMetricCard
```

Regras:

- Nao duplicar estilo de botao, card, badge e input em varias telas.
- Se o mesmo padrao aparecer 2 vezes, extraia componente.
- Componentes de UI nao devem conhecer Supabase.
- Componentes de tela nao devem conter logica pesada de banco.
- Use TypeScript estrito e props explicitas.

## Supabase E Back-End

Padrao recomendado:

```txt
React Native -> Supabase Auth -> Postgres com RLS -> Storage
```

Use Edge Functions apenas para:

- operacoes com `service_role`;
- webhooks;
- envio de email;
- notificacoes push;
- integracoes externas;
- tarefas agendadas;
- regras que nao podem rodar no cliente.

CRUD normal deve ir direto ao Supabase com RLS.

Toda tabela multiusuario deve ter `user_id` e RLS habilitado. Nunca confiar apenas no filtro do front-end.

## Qualidade

Antes de concluir uma alteracao relevante:

- rodar TypeScript;
- checar se a tela segue a paleta;
- checar se o fluxo ainda respeita Cliente -> Projeto -> Escopo -> Orcamento -> Aprovacao -> Entrega -> Pagamento;
- evitar componentes sem reaproveitamento;
- manter nomes consistentes em ingles no codigo e portugues apenas no texto exibido ao usuario.

Scripts desejados no projeto:

```txt
typecheck
lint
test
```

## O Que Evitar

- Criar landing page no lugar da experiencia real do app.
- Colocar regras de negocio complexas diretamente em arquivos de rota.
- Misturar chamadas Supabase dentro de componentes visuais genericos.
- Criar cores novas sem necessidade.
- Criar telas que nao pertencem ao fluxo do produto.
- Usar Edge Functions para CRUD simples.
- Deixar textos longos explicando a interface dentro do app.
- Duplicar cards/list items com pequenas variacoes.

