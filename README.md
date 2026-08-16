# 🔧 Seletor de Chavetas

Aplicação web para seleção de chavetas paralelas a partir do diâmetro
do eixo, comprimento, variação dimensional e tipo.

## Funcionalidades

- Seleção automática do perfil da chaveta pelo diâmetro do eixo.
- Cálculo das dimensões da chaveta.
- Cálculo das dimensões do eixo e cubo.
- Importação de uma tabela `.csv`.
- Filtro por:
  - Perfil
  - Comprimento
  - Tipo
- Exibição das chavetas compatíveis.

## Como usar

1. Abra o `index.html` no navegador.
2. Informe o diâmetro do eixo.
3. Selecione o tipo da chaveta.
4. Informe o comprimento desejado.
5. Informe a variação permitida.
6. Carregue o arquivo CSV.
7. Clique em **Filtrar valores compatíveis**.

## Formato do CSV

O arquivo deve possuir as seguintes colunas:

```text
codigo,perfil,comprimento,tipo