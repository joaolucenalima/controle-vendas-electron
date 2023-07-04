import { GoGear } from "react-icons/go";
import {
  MdAttachMoney,
  MdListAlt,
  MdOutlineLayers,
  MdOutlineShoppingCart
} from "react-icons/md";
import { TbBox } from "react-icons/tb";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="navigation-links">
        <NavLink to={"/"} className="link" title="Dashboard">
          <MdListAlt />
        </NavLink>

        <NavLink to={"/shopping"} className="link" title="Compras">
          <MdOutlineShoppingCart />
        </NavLink>

        <NavLink to={"/sales"} className="link" title="Vendas">
          <MdAttachMoney />
        </NavLink>

        <NavLink to={"/materials"} className="link" title="Materiais">
          <MdOutlineLayers />
        </NavLink>

        <NavLink to={"/products"} className="link" title="Produtos">
          <TbBox />
        </NavLink>
      </div>

      <NavLink to={"/config"} className="link" title="Configurações">
        <GoGear />
      </NavLink>
    </div>
  );
}
