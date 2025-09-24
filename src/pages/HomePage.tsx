import { AboutMe } from '../components/general/AboutMe'
import { Banner } from '../components/general/Banner'
import { Footer } from '../components/general/Footer'
import { MyServirces } from '../components/general/MyServirces'
import { Navbar } from '../components/general/Navbar'

export function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />
      <AboutMe />
      <MyServirces />
      <Footer />
    </>
  )
}
