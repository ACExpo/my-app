export type Card = {
  id: string;
  front: string;
  back: string;
  tags?: string[];
};

export type Set = {
  id: string;
  title: string;
  description?: string;
  license?: string;
  cards: Card[];
};

export const SETS: Set[] = [
  {
    id: "js-basics",
    title: "JavaScript Basics",
    description: "Tipos, arrays, funções",
    license: "CC BY 4.0",
    cards: [
      { id: "c1", front: "O que é hoisting?", back: "Elevação de declarações de var/função para o topo do escopo." },
      { id: "c2", front: "typeof null === ?", back: "`object` (peculiaridade histórica da linguagem)." },
      { id: "c3", front: "Array vs Object?", back: "Array é indexado por números; Object por chaves string/symbol." },
    ],
  },
  {
    id: "py-basics",
    title: "Python Basics",
    description: "Listas, dicionários, funções",
    license: "CC BY 4.0",
    cards: [
      { id: "p1", front: "List comprehension?", back: "Sintaxe concisa para criar listas: `[x*x for x in range(5)]`." },
      { id: "p2", front: "dict.get(k, default)?", back: "Retorna valor de k ou default sem lançar KeyError." },
      { id: "p3", front: "Função é…", back: "Um objeto de primeira classe; pode ir em variáveis, params, retorno." },
    ],
  },
];
