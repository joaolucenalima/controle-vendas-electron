import { Link } from 'react-router-dom'
import { MdAttachMoney, MdPeople, MdOutlineLayers, MdShoppingCart } from 'react-icons/md'

export default function Header() {
  return (
    <header>
      <Link to={'/clientes'} className="link">
        <span style={{ color: "#FAC100" }}><MdPeople /></span>
        <span>Clientes</span>
      </Link>

      <Link to={'/materiais'} className="link">
        <span style={{ color: "rgb(233, 113, 113)" }}><MdOutlineLayers /></span>
        <span>Materiais</span>
      </Link>

      <Link to={'/compras'} className="link">
        <span style={{ color: "rgb(143, 143, 255)" }}><MdShoppingCart /></span>
        <span>Compras</span>
      </Link>

      <Link to={'/vendas'} className="link">
        <span style={{ color: "#00CF66" }}><MdAttachMoney /></span>
        <span>Vendas</span>
      </Link>
    </header>
  )
}