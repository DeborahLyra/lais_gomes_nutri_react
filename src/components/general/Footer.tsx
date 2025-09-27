import { EnvelopeIcon, InstagramLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import logo from '../../assets/profile/logoLais.png'

export function Footer() {
    return (
        <div className="w-full bg-light-pink">
            <div id="schedule" className="p-8 flex flex-col items-center">
                <h2 className="text-primary font-bold text-4xl mb-4">Pronto para transformar sua saúde?</h2>
                <p className=" text-green-gray text-lg font-light">Agende sua consulta e dê o primeiro passo para uma vida mais saudável</p>
                <button className='w-40 h-10 text-white bg-primary mt-8 p-2 rounded-md cursor-pointer hover:bg-light-green'>
                    Agendar consulta
                </button>
            </div>

            <div className="w-full mt-8 p-8 bg-primary flex flex-col md:flex-row items-center justify-between">
                <div>
                    <img src={logo} className="h-20" />
                    <p className=" text-light-gray text-lg font-light">Transformando vidas através da nutrição personalizada e cuidado integral com a saúde.</p>
                </div>
                <div className="text-light-gray">
                    <h3 className="font-bold text-xl mb-2">Contato</h3>
                    <span className="flex items-center gap-1 font-light text-xl mb-1">
                        <InstagramLogoIcon size={24}/>
                        <p>@laisgomes</p>
                    </span>
                    <span className="flex items-center gap-1 font-light text-xl mb-1">
                        <WhatsappLogoIcon size={24}/>
                        <p>(81)999999999</p>
                    </span>
                    <span className="flex items-center gap-1 font-light text-xl">
                        <EnvelopeIcon size={24}/>
                        <p>laisgomes@email.com</p>
                    </span>
                </div>
            </div>
        </div>
    )
}
