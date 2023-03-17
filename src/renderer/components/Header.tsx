import { Link } from 'react-router-dom'
import { MdAttachMoney, MdListAlt, MdOutlineLayers, MdOutlineAddBox, MdShoppingCart } from 'react-icons/md'

export default function Header() {
  return (
    <header>

      <Link to={'/'} className="link">
        <span style={{ color: "#CFC5BC" }}><MdListAlt /></span>
        <span>Relatório</span>
      </Link>

      <Link to={'/shopping'} className="link">
        <span style={{ color: "#ca413c" }}><MdShoppingCart /></span>
        <span>Compras</span>
      </Link>

      <Link to={'/sales'} className="link">
        <span style={{ color: "#00CF22" }}><MdAttachMoney /></span>
        <span>Vendas</span>
      </Link>

      <Link to={'/materials'} className="link">
        <span style={{ color: "#FAC100" }}><MdOutlineLayers /></span>
        <span>Materiais</span>
      </Link>

      <Link to={'/products'} className="link">
        <span style={{ color: "#3254FF" }}><MdOutlineAddBox /></span>
        <span>Produtos</span>
      </Link>
    </header>
  )
}