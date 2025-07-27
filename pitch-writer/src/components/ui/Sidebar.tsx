'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { cn } from '@/lib/utils'
import { Zap, Info, LogIn, LogOut, Rocket } from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()
  const { user } = useAuth()

  const navItems = [
    { href: '/about', label: 'About', icon: Info },
    ...(user ? [{ href: '/dashboard', label: 'New Pitch', icon: Zap }] : []),
    user ? { href: '/logout', label: 'Logout', icon: LogOut } : { href: '/login', label: 'Login', icon: LogIn },
  ]

  return (
    <aside className="fixed top-0 left-0 h-full w-64 p-4 z-50 hidden lg:flex flex-col glass-container  bg-black/30">
      <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 mb-10 p-2">
        <Rocket className="text-purple-400" size={28}/>
        <h1 className="text-2xl font-bold font-orbitron">PitchPro</h1>
      </Link>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200",
                pathname === item.href && "bg-gradient-to-r from-purple-600 to-blue-500 text-white border-l-2 border-blue-400"
            )}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar