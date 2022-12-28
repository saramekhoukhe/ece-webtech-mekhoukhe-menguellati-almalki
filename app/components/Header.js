
import Link from 'next/link'
import Image from 'next/image'
import Login from './Login'
import Logo from "../public/logo.png";
import UserContext from './UserContext'
import { useContext } from 'react'

export default function Header(){
  const { user, logout, loading } = useContext(UserContext)

  return (
    <header className="container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg">
        <div className="flex ustify-between md:gap-10 md:flex-nowrap">
          <div className="flex-col items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none md:flex-1">
            <Link href="/" className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
              Home
            </Link>
            
            <Link href="/articles" className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
              Articles
            </Link>
            
            {user ?
              <Link href="/myarticles" className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
                My Articles
              </Link>
              :
              <Link href="/myarticles" className="hidden px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
                My Articles
              </Link> 
            }
          </div>
          <div className="flex justify-between w-full md:w-auto">
            <Link href="/" className="w-40">
              <Image
                  src={Logo}
                  alt="logo"
              />
            </Link>
          </div>

          <div className="flex-col items-center justify-start order-2 hidden w-full md:flex md:flex-row md:w-auto md:flex-1 md:order-none">
            <Link href="/contact" key="" className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
                  Contact
            </Link>
            <Link href="/about" key="" className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
              About
            </Link>
            <li className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
              <Login />
            </li>
          </div>
        </div>
        
    </header>
  )
}
