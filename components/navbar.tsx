// components/Navbar.js
"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image'; // If you have a logo image

const Navbar = () => {


  const router = usePathname();
     // Checks if the current page is the Home page

  return (
    <nav className="shadow-lg bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500">
  <div className="flex justify-center items-center w-full py-5">
    {/* Logo */}
    <Link href="/" passHref>
      <div className="flex items-center">
        {/* Replace with your logo image */}
        <Image src="/logo.svg" alt="Logo" width={400} height={200} />
      </div>
    </Link>
  </div>
</nav>

  
  );
};

export default Navbar;
