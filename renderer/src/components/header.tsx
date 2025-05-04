import { CreditCard, LayoutDashboard, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { NavLink } from "react-router";

export function Header() {
  useEffect(() => {
    const activeLine = document.getElementById('active-link-bottom-line');
    const activeLink = document.querySelector('nav a.active')?.getBoundingClientRect();

    if (!activeLine || !activeLink) return;

    const navElement = document.querySelector('nav');

    activeLine.style.width = `${activeLink.width}px`;
    activeLine.style.transform = `translateX(${activeLink.left - navElement!.getBoundingClientRect().left}px)`;

    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const navLeft = navElement!.getBoundingClientRect().left;
        const activeLink = (e.currentTarget as HTMLElement)?.getBoundingClientRect();
        activeLine.style.width = `${activeLink.width}px`;
        activeLine.style.transform = `translateX(${activeLink.left - navLeft}px)`;
      });
    });
  }, []);

  return (
    <header className="flex items-center px-4 gap-16">
      <div>
        <h1 className="text-2xl font-extrabold">Oficina de arte</h1>
      </div>

      <nav className="relative flex-1 flex items-center gap-6">
        <NavLink to="/" className="py-3 flex items-center gap-1 [&.active]:*:text-green-700">
          <LayoutDashboard size={18}/>
          <span>Relatório</span>
        </NavLink>

        <NavLink to="/sales" className="py-3 flex items-center gap-1 [&.active]:*:text-green-700">
          <ShoppingCart size={18}/>
          <span>Vendas</span>
        </NavLink>

        <NavLink to="/expenses" className="py-3 flex items-center gap-1 [&.active]:*:text-green-700">
          <CreditCard size={18}/>
          <span>Gastos</span>
        </NavLink>

        <span 
          id="active-link-bottom-line"
          className="absolute top-[calc(100%-2px)] left-0 h-1 bg-green-700 rounded transition-all"
        />
      </nav>

      <div>
         Olá, João
      </div>
    </header>
  )
}