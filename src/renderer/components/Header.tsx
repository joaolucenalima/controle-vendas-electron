import { NavLink } from 'react-router-dom'
import { MdAttachMoney, MdListAlt, MdOutlineLayers, MdOutlineAddBox, MdShoppingCart } from 'react-icons/md'

export default function Header() {
  return (
    <header>

      <NavLink to={'/'} className={({ isActive }) =>
        isActive ? "link active" : "link"
      }>
        <span style={{ color: "#CFC5BC" }}><MdListAlt /></span>
        <span>Relatório</span>
      </NavLink>

      <NavLink to={'/shopping'} className={({ isActive }) =>
        isActive ? "link active" : "link"
      }>
        <span style={{ color: "#ca413c" }}><MdShoppingCart /></span>
        <span>Compras</span>
      </NavLink>

      <NavLink to={'/sales'} className={({ isActive }) =>
        isActive ? "link active" : "link"
      }>
        <span style={{ color: "#00CF22" }}><MdAttachMoney /></span>
        <span>Vendas</span>
      </NavLink>

      <NavLink to={'/materials'} className={({ isActive }) =>
        isActive ? "link active" : "link"
      }>
        <span style={{ color: "#FAC100" }}><MdOutlineLayers /></span>
        <span>Materiais</span>
      </NavLink>

      <NavLink to={'/products'} className={({ isActive }) =>
        isActive ? "link active" : "link"
      }>
        <span style={{ color: "#3254FF" }}><MdOutlineAddBox /></span>
        <span>Produtos</span>
      </NavLink>

    </header>
  )
}