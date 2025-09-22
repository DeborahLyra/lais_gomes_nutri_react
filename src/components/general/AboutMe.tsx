import { CaretRight } from '@phosphor-icons/react';
import profile from '../../assets/profile/lais_image_2.jpeg';
import nutitionImage from '../../assets/nutrition_imgs/aboutMeImg.jpeg';

const bio = [
    "Faladeira e curiosa",
    "Amo testar receitinhas e experimentar comidas",
    "Adoro fazer planejamento até de roteiro da viagem",
    "Apaixonada pela educação alimentar e nutricional",
    "Prezo por resultados possíveis de se manter",
    "Defendo dieta além de calorias e modinhas sem evidência científica",
    "Acredito num trabalho com espaço para escuta, acolhimento e respeito, livre de julgamentos"
];

export function AboutMe() {
    return (
        <section className="w-full p-8 bg-light-pink flex flex-col items-center ">
            <div className="w-full flex flex-col md:flex-row items-center justify-around">
                <img
                    src={profile}
                    className="h-[28rem] rounded-md object-cover"
                    alt="Dra. Laís Gomes"
                />

                <div className="flex flex-col justify-between h-[28rem]">
                    <h2 className="text-primary font-bold text-4xl mb-4">
                        Sobre Dra. Laís Gomes
                    </h2>

                    <ul className="flex-1 flex flex-col justify-evenly">
                        {bio.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-green-gray text-lg font-light">
                                <span className="mt-1">
                                    <CaretRight weight="bold" size={20} />
                                </span>
                                <span className="text-base leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-8 w-full flex flex-col md:flex-row items-center justify-around bg-light-sage p-4 rounded-md">


                <div className="flex flex-col justify-center w-[50%]">
                    <h2 className="text-light-pink font-bold text-xl mb-4">
                        Por que nutricionista? Como cheguei aqui?

                    </h2>
                    <p className='text-slate-700 text-lg font-light mb-8'>Não me identifiquei com meu primeiro curso,
                        estava com medo de abandonar e encarar outra
                        faculdade, mas não conseguia permanecer onde não gostava.
                        Meti a cara e arrisquei.
                    </p>
                    <p className='text-slate-700 text-lg font-light'>Sempre ouvia que dieta era sofrimento e percebia que
                        as pessoas tinham uma relação ruim com a alimentação,
                        "essa comida é saudável e o outro é um veneno". Eu não
                        conseguia aceitar que isso fosse verdade, sabia que a alimentação
                        era muito mais do que achavam. Por isso escolhi a nutrição. E eu quero
                        te mostrar que dieta pode ser gostosa, sem sofrimento e com resultado
                        duradouro. Vamos juntos melhorar esse padrão alimentar!
                    </p>

                </div>
                <img
                    src={ nutitionImage}
                    className="w-[30rem] h-[28rem] rounded-md object-cover"
                    alt="Dra. Laís Gomes"
                />
            </div>
        </section>
    );
}
