
export default function Footer(){
  return (
    <footer className="container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg mt-10 border-t border-gray-100 dark:border-gray-800 ">
      <div className="text-sm text-center">
        Copyright © {new Date().getFullYear()}. All
        rights reserved.
      </div>
      <div className="mt-1 text-sm text-center text-gray-400 dark:text-gray-600">
        Made by ECE Master Student
      </div>
    </footer>
  )
}
