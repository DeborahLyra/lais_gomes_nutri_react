import profile from '../../assets/profile/lais_image_3.jpeg';

export function Banner() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-[550px] bg--light-gray p-6 md:p-10">
            <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Laís Gomes</h1>
                <h3 className="text-md md:text-kl text-green-gray mb-6">Descubra o poder de uma alimentação equilibrada e personalizada para você. Juntos, vamos construir hábitos saudáveis que transformarão sua vida.</h3>
                <div className='flex items-center gap-8'>
                    <button className='w-40 h-10 text-white bg-primary p-2 rounded-md cursor-pointer hover:bg-light-green'>
                        Agendar consulta
                    </button>
                    <button className='w-40 h-10 text-primary border border-primary p-2 rounded-md cursor-pointer hover:bg-primary hover:text-white'>
                        Saiba mais
                    </button>


                </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
                <div className="relative">
                    <img
                        src={profile}
                        alt="Semíramis Profile"
                        className="h-[300px] md:h-[500px] w-auto rounded-xl shadow-lg object-cover"
                    />
                    <div className="absolute top-[-10px] left-[-10px] w-full h-full border-4 border-roseTea rounded-xl -z-10 border-primary"></div>
                </div>
            </div>
        </div>
    );
}
