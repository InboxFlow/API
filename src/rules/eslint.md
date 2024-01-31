# Regrar do eslint revogadas.

- @typescript-eslint/no-explicit-any
  . É possível utilizar a tipagem "any"
  . Body enviado pelo front-end é indefinido.
  . É obrigatório a validação pelo Zod.

- eslint-enable no-var
  . É possível usar `var` em apenas um arquivo `~/shared/services/db`.
  . Para que o arquivo não gere mais de um prismaClient.
  . É obrigatório que seja _apenas_ nesse arquivo.
