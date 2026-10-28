import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { menu } from '../data/menu'

export default function Navbar() {
  const [active, setActive] = useState(null)        // which desktop menu is open
  const [activeCat, setActiveCat] = useState(0)     // selected category in mega menu
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState(null)
  const navRef = useRef(null)
  const location = useLocation()

  // close everything when the page changes
  useEffect(() => {
    setActive(null)
    setMobileOpen(false)
  }, [location.pathname])

  // close on outside click / Escape
  useEffect(() => {
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActive(null)
    }
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const openMenu = (label) => {
    setActive(label)
    setActiveCat(0)
  }

  const activeItem = menu.find((m) => m.label === active)

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => setActive(null)}
      className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-medium">Test</span>
          </Link>

          {/* Desktop items */}
          <div className="hidden md:flex items-center gap-8">
            {menu.map((item) =>
              item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  onMouseEnter={() => setActive(null)}
                  className="text-gray-300 hover:text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onMouseEnter={() => openMenu(item.label)}
                  onClick={() => (active === item.label ? setActive(null) : openMenu(item.label))}
                  aria-expanded={active === item.label}
                  className={`flex items-center gap-1 hover:text-white ${
                    active === item.label ? 'text-white' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      active === item.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              )
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileOpen((p) => !p)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* ===== Desktop dropdown panel ===== */}
      {activeItem && (
        <div className="hidden md:block absolute left-0 w-full bg-slate-900 border-t border-slate-800 shadow-2xl">
          <div className="max-w-7xl mx-auto px-8 py-8">
            {/* Mega menu: categories left, vehicles right */}
            {activeItem.categories && (
              <div className="flex gap-10">
                <ul className="w-48 shrink-0 space-y-1 border-r border-slate-800 pr-6">
                  {activeItem.categories.map((cat, i) => (
                    <li key={cat.name}>
                      <button
                        onMouseEnter={() => setActiveCat(i)}
                        className={`w-full text-left px-3 py-2 rounded-md ${
                          activeCat === i
                            ? 'bg-slate-800 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {activeItem.categories[activeCat].vehicles.map((v) => (
                    <Link key={v.name} to={v.to} className="group block">
                      <div className="aspect-[16/10] overflow-hidden rounded-lg bg-slate-800">
                        <img
                          src={v.img}
                          alt={v.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="mt-2 font-medium">{v.name}</p>
                      <p className="text-sm text-gray-400">{v.price}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Simple dropdown links */}
            {activeItem.links && (
              <ul className="grid grid-cols-3 gap-4">
                {activeItem.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="block py-2 text-gray-300 hover:text-white">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* ===== Mobile menu (accordion) ===== */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 max-h-[80vh] overflow-y-auto">
          {menu.map((item) => (
            <div key={item.label} className="border-b border-slate-800">
              {item.to ? (
                <Link to={item.to} className="block px-4 py-3 text-gray-200">
                  {item.label}
                </Link>
              ) : (
                <>
                  <button
                    className="w-full flex justify-between items-center px-4 py-3 text-gray-200"
                    onClick={() =>
                      setMobileSection(mobileSection === item.label ? null : item.label)
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileSection === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {mobileSection === item.label && (
                    <div className="px-6 pb-3 space-y-2">
                      {item.categories?.map((cat) => (
                        <div key={cat.name}>
                          <p className="text-xs uppercase tracking-wide text-gray-500 mt-2">
                            {cat.name}
                          </p>
                          {cat.vehicles.map((v) => (
                            <Link key={v.name} to={v.to} className="block py-1.5 text-gray-300">
                              {v.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                      {item.links?.map((l) => (
                        <Link key={l.to} to={l.to} className="block py-1.5 text-gray-300">
                          {l.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}