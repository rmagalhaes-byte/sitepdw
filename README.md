# PDW Site V1

Estrutura dedicada para a versao 1 do website da Portuguese Digital Wallet.

## Objetivo
Centralizar implementacao, conteudo e deploy do MVP institucional em um unico local.

## Estrutura recomendada
- `src/app`: rotas/paginas
- `src/components`: componentes PDW
- `src/content`: conteudo em markdown/json
- `src/styles`: tema global, tokens e utilitarios
- `public`: assets (logos, imagens, icones)
- `docs`: documentacao tecnica do site

## Sitemap MVP alvo
- `/` Home
- `/sobre`
- `/solucao`
- `/casos-de-uso`
- `/casos-de-uso/diplomas-digitais`
- `/contactos`
- `/privacidade`
- `/termos`

## Convencoes
- Nome de componentes em PascalCase.
- Nome de rotas em minusculas com hifen.
- Todo texto institucional deve seguir o PRD e os docs da raiz do projeto.
- Nao editar templates de origem diretamente; migrar para componentes proprios da PDW.

## Deploy
- Preparado para deploy estatico/SSR (conforme stack escolhida).
- Antes de deploy, validar:
  - links e navegacao,
  - formularios,
  - metadados SEO basicos,
  - acessibilidade minima (contraste, labels, foco).
