import { Calendar, Clock, ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function NewsDetail() {
    //const { id } = useParams();

    const news = {
        id: 1,
        title: "Nova pesquisa mostra benefícios da alimentação balanceada",
        content: `
      <p>Um estudo revolucionário publicado no Journal of Nutritional Science revelou que indivíduos que mantêm uma alimentação balanceada apresentam melhorias significativas na qualidade de vida. A pesquisa, conduzida com mais de 5.000 participantes, acompanhou os hábitos alimentares durante um período de dois anos.</p>
      
      <h2>Metodologia da Pesquisa</h2>
      <p>Os participantes foram divididos em dois grupos: um que seguiu uma dieta balanceada baseada nas diretrizes nutricionais internacionais, e outro que manteve seus hábitos alimentares habituais. A dieta balanceada incluía:</p>
      
      <ul>
        <li>5 porções diárias de frutas e vegetais</li>
        <li>Grãos integrais como principal fonte de carboidratos</li>
        <li>Proteínas magras de origem animal e vegetal</li>
        <li>Gorduras saudáveis como azeite e abacate</li>
        <li>Limitação de alimentos ultraprocessados</li>
      </ul>
      
      <h2>Resultados Impressionantes</h2>
      <p>Após 24 meses de acompanhamento, o grupo que seguiu a dieta balanceada apresentou:</p>
      
      <ul>
        <li>40% de melhora na qualidade de vida geral</li>
        <li>35% de redução nos níveis de estresse</li>
        <li>28% de melhora na qualidade do sono</li>
        <li>22% de aumento nos níveis de energia</li>
        <li>18% de redução nos índices de massa corporal</li>
      </ul>
      
      <p>Os pesquisadores destacam que estes resultados demonstram a importância fundamental da alimentação não apenas para a saúde física, mas também para o bem-estar mental e emocional.</p>
    `,
        date: "15 de Março de 2024",
        readTime: "3 min",
        category: "Pesquisa Científica",
        author: "Dr. Ana Silva",
        authorRole: "Nutricionista e Pesquisadora",
        image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800"
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-light-sage shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/all-news-page" className="flex items-center gap-2 text-muted-pink hover:text-pink-800 transition-colors">
                            <ArrowLeft size={20} />
                            Voltar para notícias
                        </Link>

                    </div>
                </div>
            </header>

            <article className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-pink-100 text-muted-pink text-sm font-medium rounded-full">
                            {news.category}
                        </span>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Calendar size={16} />
                            {news.date}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Clock size={16} />
                            {news.readTime} de leitura
                        </div>
                    </div>

                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        {news.title}
                    </h1>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-muted-pink">AS</span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{news.author}</p>
                            <p className="text-sm text-gray-600">{news.authorRole}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-8 rounded-xl overflow-hidden">
                    <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-64 lg:h-96 object-cover"
                    />
                </div>
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    />
                </div>
            </article>
        </div>
    );
}