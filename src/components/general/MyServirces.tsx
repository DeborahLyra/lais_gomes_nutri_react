import { ArrowRightIcon } from "@phosphor-icons/react"

const services =[
    {
        title: "Consulta individual",
        text: "Avação completa e plano alimentar personalizado para suas necessidades específicas.",
        bgColor:'bg-dusty-red'
    },
    {
        title: "Acompanhamento",
        text: "Monitoramento contínuo da sua evolução com ajustes personalizados no plano.",
        bgColor:'bg-primary'
    },
    {
        title: "Receitas exclusivas",
        text: "Acesso a receitas saudáveis e saborosas desenvolvidas especialmente para você.",
        bgColor:'bg-muted-pink'
    }
]

export function MyServirces() {
  return (
    <section className="bg-light-gray p-8 text-center">
          <h2 className="text-primary font-bold text-4xl mb-4">
              Nossos Serviços
          </h2>
          <p className="text-green-gray text-lg font-light">Soluções personalizadas para sua jornada de saúde</p>

          <div className="flex mt-8 gap-4 items-center justify-center">
            {
                services.map((service)=>{
                    return(
                        <div className={`${service.bgColor} rounded-md p-4 text-light-pink`}>
                            <h3 className="font-bold text-xl mt-4 mb-8">{service.title}</h3>
                            <p className="mb-8">{service.text}</p>
                            <span className="mt-8 flex items-center justify-center gap-2 text-slate-700 hover:translate-1.5">
                                Saiba mais
                                <ArrowRightIcon size={16}/>
                                </span>
                        </div>
                    )
                })
            }
      
          </div>
      
    </section>
  )
}
