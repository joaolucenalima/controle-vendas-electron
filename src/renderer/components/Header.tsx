import { Link } from 'react-router-dom'
import { MdAttachMoney, MdListAlt, MdOutlineLayers, MdOutlineAddBox } from 'react-icons/md'

export default function Header() {
  return (
    <header>

      <Link to={'/'} className="link">
        <span style={{ color: "#FAC100" }}><MdListAlt /></span>
        <span>Relatório</span>
      </Link>

      <Link to={'/materials'} className="link">
        <span style={{ color: "rgb(233, 113, 113)" }}><MdOutlineLayers /></span>
        <span>Materiais</span>
      </Link>

      <Link to={'/sales'} className="link">
        <span style={{ color: "#00CF66" }}><MdAttachMoney /></span>
        <span>Vendas</span>
      </Link>

      <Link to={'/products'} className="link">
        <span style={{ color: "rgb(77, 77, 236)" }}><MdOutlineAddBox /></span>
        <span>Produtos</span>
      </Link>
    </header>
  )
}