
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'

export default function Layout({
  children
}){
  return (
    <div>
      <Header />
      <main className="container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg">
      {children}
      </main>
      <Footer />
    </div>
  )
}
