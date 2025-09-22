import { CaretRight } from '@phosphor-icons/react';
import profile from '../../assets/profile/lais_image_2.jpeg';

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
    <section className="p-8 flex flex-col md:flex-row items-center justify-around bg-light-pink">
      <img
        src={profile}
        className="h-[28rem] rounded-md object-cover"
        alt="Dra. Laís Gomes"
      />

      <div className="w-[50%] flex flex-col justify-between h-[28rem]">
        {/* título alinhado ao topo */}
        <h2 className="text-primary font-bold text-4xl mb-4">
          Sobre Dra. Laís Gomes
        </h2>

        {/* lista distribuída no espaço restante */}
        <ul className="flex-1 flex flex-col justify-evenly">
          {bio.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-green-gray text-md font-light">
              <span className="mt-1">
                <CaretRight weight="bold" size={20} />
              </span>
              <span className="text-base leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
