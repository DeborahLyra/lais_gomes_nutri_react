import { WhatsappLogoIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion';

import { AboutMe } from '../components/general/AboutMe'
import { Banner } from '../components/general/Banner'
import { Footer } from '../components/general/Footer'
import { MyServirces } from '../components/general/MyServirces'

export function HomePage() {
  return (
    <>
      <Banner />
      <AboutMe />
      <MyServirces />
      <Footer />
      <motion.a
        href="https://wa.me/551199999999"
        target="_blank"
        rel="noreferrer"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="fixed right-4 bottom-4 z-50 cursor-pointer"
      >
        <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
          <WhatsappLogoIcon size={32} className="text-white" />
        </div>
      </motion.a>
    </>
  )
}
