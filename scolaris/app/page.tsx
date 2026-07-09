import Nav         from '@/components/Nav'
import Hero        from '@/components/sections/Hero'
import TrustBar    from '@/components/sections/TrustBar'
import Roles       from '@/components/sections/Roles'
import Features    from '@/components/sections/Features'
import Stats       from '@/components/sections/Stats'
import Africa      from '@/components/sections/Africa'
import Screenshots from '@/components/sections/Screenshots'
import Download    from '@/components/sections/Download'
import Pricing     from '@/components/sections/Pricing'
import Contact     from '@/components/sections/Contact'
import Footer      from '@/components/Footer'
import WaFloat     from '@/components/WaFloat'

export default function HomePage() {
  return (
    <main className="bg-sco-bg text-sco-text">
      <Nav />
      <Hero />
      <TrustBar />
      <Roles />
      <Features />
      <Stats />
      <Africa />
      <Screenshots />
      <Download />
      <Pricing />
      <Contact />
      <Footer />
      <WaFloat />
    </main>
  )
}
