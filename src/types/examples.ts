import type { Client, News, Recipe } from "./supabase";

export const news: News[] = [
    {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      title: "Nova pesquisa mostra benefícios da alimentação balanceada",
      content: `Um estudo revolucionário publicado no Journal of Nutritional Science revelou que indivíduos que mantêm uma alimentação balanceada apresentam melhorias significativas na qualidade de vida. A pesquisa, conduzida com mais de 5.000 participantes, acompanhou os hábitos alimentares durante um período de dois anos.
  
  ## Metodologia da Pesquisa
  Os participantes foram divididos em dois grupos: um que seguiu uma dieta balanceada baseada nas diretrizes nutricionais internacionais, e outro que manteve seus hábitos alimentares habituais.
  
  ## Resultados Impressionantes
  Após 24 meses de acompanhamento, o grupo que seguiu a dieta balanceada apresentou:
  - 40% de melhora na qualidade de vida geral
  - 35% de redução nos níveis de estresse
  - 28% de melhora na qualidade do sono`,
      excerpt: "Estudo recente revela como uma dieta equilibrada pode melhorar a qualidade de vida em até 40% com benefícios significativos para saúde mental e física.",
      category: "Pesquisa",
      image_url: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=400&fit=crop",
      status: "published",
      created_at: "2024-03-15T10:00:00.000Z",
      updated_at: "2024-03-15T10:00:00.000Z"
    },
    {
      id: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
      title: "Guia prático: como planejar refeições da semana",
      content: `Planejar as refeições da semana é uma das estratégias mais eficazes para manter uma alimentação saudável e economizar tempo. Neste guia, vamos te mostrar passo a passo como organizar seu cardápio semanal.
  
  ## Passo 1: Defina Seus Objetivos
  Antes de começar, identifique seus objetivos nutricionais. Você busca:
  - Perda de peso?
  - Ganho de massa muscular?
  - Manutenção da saúde?
  
  ## Passo 2: Faça um Inventário
  Verifique o que você já tem na despensa e geladeira. Isso evita compras desnecessárias e ajuda no aproveitamento de alimentos.
  
  ## Passo 3: Escolha as Receitas
  Selecione receitas que:
  - Sejam práticas para seu dia a dia
  - Utilizem ingredientes similares
  - Possam ser preparadas com antecedência`,
      excerpt: "Aprenda técnicas simples para organizar sua alimentação semanal, economizar tempo e garantir refeições nutritivas todos os dias.",
      category: "Dicas",
      image_url: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&h=400&fit=crop",
      status: "published",
      created_at: "2024-03-12T14:30:00.000Z",
      updated_at: "2024-03-12T14:30:00.000Z"
    },
    {
      id: "c3d4e5f6-g7h8-9012-cdef-345678901234",
      title: "O impacto do sono na sua saúde nutricional",
      content: `Muitas pessoas não percebem, mas a qualidade do sono tem um impacto direto na forma como nosso corpo processa os nutrientes. Dormir bem é tão importante para a saúde nutricional quanto escolher os alimentos certos.
  
  ## Como o Sono Afeta a Nutrição
  
  ### 1. Regulação Hormonal
  Durante o sono, nosso corpo regula importantes hormônios:
  - **Leptina**: controla a sensação de saciedade
  - **Grelina**: estimula o apetite
  - **Cortisol**: gerencia o estresse
  
  ### 2. Metabolismo Energético
  O sono inadequado pode reduzir em até 30% a capacidade do corpo de processar glicose, aumentando o risco de resistência à insulina.
  
  ### 3. Escolhas Alimentares
  Pessoas com privação de sono tendem a:
  - Consumir mais alimentos calóricos
  - Preferir carboidratos simples
  - Comer porções maiores`,
      excerpt: "Descubra como as horas de descanso influenciam no seu metabolismo, absorção de nutrientes e nas escolhas alimentares do dia a dia.",
      category: "Saúde",
      image_url: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=400&fit=crop",
      status: "draft",
      created_at: "2024-03-10T09:15:00.000Z",
      updated_at: "2024-03-10T09:15:00.000Z"
    },
    {
      id: "d4e5f6g7-h8i9-0123-defg-456789012345",
      title: "Superalimentos: mitos e verdades",
      content: `Nos últimos anos, os chamados "superalimentos" ganharam popularidade nas redes sociais e na mídia. Mas o que realmente a ciência diz sobre esses alimentos?
  
  ## O Que São Superalimentos?
  O termo "superalimento" não é uma classificação científica, mas sim um conceito de marketing para alimentos ricos em nutrientes.
  
  ## Análise de Alguns Superalimentos Populares
  
  ### 1. Açaí
  **Verdades:**
  - Rico em antioxidantes
  - Boa fonte de fibras
  - Contém gorduras saudáveis
  
  **Mitos:**
  - Não é milagroso para emagrecimento
  - A versão com xaropes pode ser calórica
  
  ### 2. Chia
  **Verdades:**
  - Excelente fonte de ômega-3
  - Rica em fibras solúveis
  - Boa para saúde intestinal
  
  **Mitos:**
  - Sozinha não promove emagrecimento
  - Precisa de hidratação adequada`,
      excerpt: "Analisamos os alimentos da moda e seus reais benefícios para a saúde, separando o que é ciência do que é apenas marketing.",
      category: "Análise",
      image_url: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=400&fit=crop",
      status: "published",
      created_at: "2024-03-08T16:45:00.000Z",
      updated_at: "2024-03-08T16:45:00.000Z"
    },
    {
      id: "e5f6g7h8-i9j0-1234-efgh-567890123456",
      title: "Intolerâncias alimentares: como identificar",
      content: `As intolerâncias alimentares afetam uma parcela significativa da população, mas muitas pessoas convivem com os sintomas sem saber a causa.
  
  ## Diferença Entre Intolerância e Alergia
  
  ### Intolerância Alimentar
  - Reação do sistema digestório
  - Sintomas graduais
  - Relacionada à quantidade consumida
  - Exemplo: intolerância à lactose
  
  ### Alergia Alimentar
  - Reação do sistema imunológico
  - Sintomas imediatos e potencialmente graves
  - Pequenas quantidades podem desencadear
  - Exemplo: alergia ao amendoim
  
  ## Sinais Comuns de Intolerância
  - Inchaço abdominal
  - Gases excessivos
  - Diarreia ou constipação
  - Dores de cabeça
  - Fadiga inexplicável
  
  ## Como Identificar
  1. Mantenha um diário alimentar
  2. Faça dieta de eliminação
  3. Consulte um profissional
  4. Considere testes específicos`,
      excerpt: "Guia completo para reconhecer e lidar com restrições alimentares, diferenciando intolerâncias de alergias e identificando os sinais.",
      category: "Saúde",
      image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      status: "published",
      created_at: "2024-03-05T11:20:00.000Z",
      updated_at: "2024-03-05T11:20:00.000Z"
    }
  ];

  export const recipes: Recipe[] = [
    {
      id: "f1a2b3c4-d5e6-7890-abcd-ef1234567890",
      title: "Smoothie energético de frutas vermelhas",
      description: "Perfeito para começar o dia com energia e antioxidantes. Uma opção rápida, nutritiva e deliciosa para o café da manhã.",
      category: "Café da Manhã",
      difficulty: "easy",
      preparation_time: "10 min",
      calories: "180 kcal",
      ingredients: [
        "1 xícara de frutas vermelhas congeladas (morango, framboesa, mirtilo)",
        "1 banana madura",
        "1/2 xícara de iogurte grego natural",
        "1/2 xícara de leite de amêndoas",
        "1 colher de sopa de sementes de chia",
        "1 colher de chá de mel (opcional)",
        "Gelo a gosto"
      ],
      instructions: [
        "Lave bem as frutas vermelhas se estiver usando frescas",
        "Descasque a banana e corte em pedaços",
        "Adicione todos os ingredientes no liquidificador",
        "Bata em velocidade alta até obter uma mistura homogênea",
        "Se necessário, adicione mais leite para atingir a consistência desejada",
        "Sirva imediatamente e aproveite!"
      ],
      image_url: "https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=800&h=600&fit=crop",
      status: "published",
      created_at: "2024-03-15T08:00:00.000Z",
      updated_at: "2024-03-15T08:00:00.000Z"
    },
    {
      id: "g2b3c4d5-e6f7-8901-bcde-f23456789012",
      title: "Bowl nutritivo com quinoa e legumes",
      description: "Refeição completa e balanceada para o almoço, rica em proteínas, fibras e nutrientes essenciais.",
      category: "Almoço",
      difficulty: "medium",
      preparation_time: "25 min",
      calories: "320 kcal",
      ingredients: [
        "1 xícara de quinoa cozida",
        "1/2 abobrinha em cubos",
        "1/2 cenoura ralada",
        "1/4 xícara de milho verde",
        "1/4 xícara de grão-de-bico cozido",
        "1 colher de sopa de azeite de oliva",
        "Suco de 1/2 limão",
        "Sal e pimenta a gosto",
        "Salsinha fresca picada",
        "1 colher de sopa de sementes de girassol"
      ],
      instructions: [
        "Cozinhe a quinoa conforme instruções da embalagem e reserve",
        "Em uma panela, refogue a abobrinha com um fio de azeite até ficar al dente",
        "Adicione a cenoura ralada e o milho, refogue por mais 2 minutos",
        "Misture a quinoa cozida com os legumes refogados",
        "Adicione o grão-de-bico e tempere com azeite, suco de limão, sal e pimenta",
        "Finalize com salsinha fresca e sementes de girassol",
        "Sirva quente ou frio, conforme preferência"
      ],
      image_url: "https://images.unsplash.com/photo-1602881917445-0b1ba001addf?w=800&h=600&fit=crop",
      status: "published",
      created_at: "2024-03-14T12:30:00.000Z",
      updated_at: "2024-03-14T12:30:00.000Z"
    },
    {
      id: "h3c4d5e6-f7g8-9012-cdef-345678901234",
      title: "Muffin integral de banana e aveia",
      description: "Lanche saudável e sem açúcar refinado, perfeito para o lanche da tarde ou café da manhã rápido.",
      category: "Lanche",
      difficulty: "easy",
      preparation_time: "35 min",
      calories: "210 kcal",
      ingredients: [
        "2 bananas maduras amassadas",
        "1 xícara de aveia em flocos",
        "1/2 xícara de farinha de trigo integral",
        "1/4 xícara de mel ou xarope de bordo",
        "1 ovo",
        "1/4 xícara de leite",
        "1 colher de chá de fermento em pó",
        "1 colher de chá de canela em pó",
        "1/2 colher de chá de essência de baunilha",
        "1 pitada de sal",
        "1/4 xícara de nozes picadas (opcional)"
      ],
      instructions: [
        "Pré-aqueça o forno a 180°C e unte uma forma de muffin",
        "Em uma tigela, amasse bem as bananas até formar um purê",
        "Adicione o ovo, leite, mel e essência de baunilha, misturando bem",
        "Incorpore a aveia, farinha integral, canela, fermento e sal",
        "Misture até obter uma massa homogênea",
        "Adicione as nozes picadas se desejar",
        "Distribua a massa nas forminhas de muffin, enchendo até 2/3 da capacidade",
        "Asse por 20-25 minutos ou até dourar",
        "Deixe esfriar antes de servir"
      ],
      image_url: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&h=600&fit=crop",
      status: "draft",
      created_at: "2024-03-13T15:45:00.000Z",
      updated_at: "2024-03-13T15:45:00.000Z"
    },
    {
      id: "i4d5e6f7-g8h9-0123-defg-456789012345",
      title: "Salmão grelhado com aspargos",
      description: "Jantar sofisticado e rico em ômega-3, perfeito para uma refeição leve mas nutritiva.",
      category: "Jantar",
      difficulty: "medium",
      preparation_time: "20 min",
      calories: "280 kcal",
      ingredients: [
        "2 filés de salmão (150g cada)",
        "1 maço de aspargos",
        "2 colheres de sopa de azeite de oliva",
        "1 dente de alho picado",
        "Suco de 1 limão",
        "Sal marinho a gosto",
        "Pimenta-do-reino moída na hora",
        "Ramos de alecrim fresco",
        "1 colher de chá de mostiga Dijon"
      ],
      instructions: [
        "Tempere os filés de salmão com sal, pimenta e metade do suco de limão",
        "Lave os aspargos e retire as pontas duras",
        "Em uma tigela, misture os aspargos com azeite, alho picado e sal",
        "Aqueça uma grelha ou frigideira antiaderente",
        "Grelhe o salmão por 4-5 minutos de cada lado, até dourar",
        "Adicione os aspargos na grelha e cozinhe por 5-7 minutos, virando ocasionalmente",
        "Em uma tigela pequena, misture o restante do suco de limão com mostarda para fazer o molho",
        "Sirva o salmão com os aspargos e regue com o molho de limão e mostarda"
      ],
      image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop",
      status: "published",
      created_at: "2024-03-12T19:20:00.000Z",
      updated_at: "2024-03-12T19:20:00.000Z"
    },
    {
      id: "j5e6f7g8-h9i0-1234-efgh-567890123456",
      title: "Pasta de grão-de-bico com vegetais",
      description: "Opção vegetariana proteica e saborosa, ideal para um jantar rápido durante a semana.",
      category: "Jantar",
      difficulty: "easy",
      preparation_time: "15 min",
      calories: "190 kcal",
      ingredients: [
        "1 lata de grão-de-bico escorrido",
        "2 colheres de sopa de tahine",
        "Suco de 1 limão",
        "1 dente de alho",
        "1 colher de sopa de azeite de oliva",
        "1/2 colher de chá de cominho em pó",
        "Sal e pimenta a gosto",
        "2 colheres de sopa de água (se necessário)",
        "Páprica doce para finalizar",
        "Salsinha fresca picada"
      ],
      instructions: [
        "Escorra e lave bem o grão-de-bico",
        "No processador, adicione o grão-de-bico, tahine, suco de limão, alho e cominho",
        "Bata até obter uma pasta homogênea",
        "Se necessário, adicione água aos poucos até atingir a consistência desejada",
        "Tempere com sal, pimenta e azeite de oliva",
        "Transfira para um recipiente e finalize com azeite, páprica e salsinha fresca",
        "Sirva com pães integrais, torradas ou vegetais frescos"
      ],
      image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop",
      status: "published",
      created_at: "2024-03-11T18:15:00.000Z",
      updated_at: "2024-03-11T18:15:00.000Z"
    }
  ];

  export const clients: Client[] = [
    {
      id: "k6f7g8h9-i0j1-2345-fghi-678901234567",
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "(11) 99999-9999",
      plan: "premium",
      status: "active",
      address: "Rua das Flores, 123 - Jardim Paulista, São Paulo - SP, 01415-000",
      birth_date: "1985-08-15",
      created_at: "2024-03-15T14:20:00.000Z",
      updated_at: "2024-03-15T14:20:00.000Z"
    },
    {
      id: "l7g8h9i0-j1k2-3456-ghij-789012345678",
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "(11) 98888-8888",
      plan: "basic",
      status: "active",
      address: "Avenida Brasil, 456 - Moema, São Paulo - SP, 04017-030",
      birth_date: "1990-03-22",
      created_at: "2024-03-10T10:15:00.000Z",
      updated_at: "2024-03-10T10:15:00.000Z"
    },
    {
      id: "m8h9i0j1-k2l3-4567-hijk-890123456789",
      name: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      phone: "(11) 97777-7777",
      plan: "premium",
      status: "inactive",
      address: "Rua Augusta, 789 - Consolação, São Paulo - SP, 01305-000",
      birth_date: "1988-11-30",
      created_at: "2024-03-01T09:00:00.000Z",
      updated_at: "2024-03-20T16:45:00.000Z"
    },
    {
      id: "n9i0j1k2-l3m4-5678-ijkl-901234567890",
      name: "Ana Costa",
      email: "ana.costa@email.com",
      phone: "(11) 96666-6666",
      plan: "premium",
      status: "active",
      address: "Alameda Santos, 101 - Cerqueira César, São Paulo - SP, 01418-100",
      birth_date: "1992-07-10",
      created_at: "2024-03-18T11:30:00.000Z",
      updated_at: "2024-03-18T11:30:00.000Z"
    },
    {
      id: "o0j1k2l3-m4n5-6789-jklm-012345678901",
      name: "Carlos Rodrigues",
      email: "carlos.rodrigues@email.com",
      phone: "(11) 95555-5555",
      plan: "basic",
      status: "active",
      address: "Rua Haddock Lobo, 222 - Jardins, São Paulo - SP, 01414-000",
      birth_date: "1983-12-05",
      created_at: "2024-03-12T15:45:00.000Z",
      updated_at: "2024-03-12T15:45:00.000Z"
    },
    {
      id: "p1k2l3m4-n5o6-7890-klmn-123456789012",
      name: "Fernanda Lima",
      email: "fernanda.lima@email.com",
      phone: "(11) 94444-4444",
      plan: "basic",
      status: "inactive",
      address: "Rua Oscar Freire, 333 - Pinheiros, São Paulo - SP, 01426-000",
      birth_date: "1995-04-18",
      created_at: "2024-02-28T13:20:00.000Z",
      updated_at: "2024-03-25T10:10:00.000Z"
    },
    {
      id: "q2l3m4n5-o6p7-8901-lmno-234567890123",
      name: "Ricardo Almeida",
      email: "ricardo.almeida@email.com",
      phone: "(11) 93333-3333",
      plan: "premium",
      status: "active",
      address: "Avenida Paulista, 444 - Bela Vista, São Paulo - SP, 01310-100",
      birth_date: "1979-09-25",
      created_at: "2024-03-22T08:50:00.000Z",
      updated_at: "2024-03-22T08:50:00.000Z"
    }
  ];