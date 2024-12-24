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
        <NavLink to={"/"} className="link">
          <MdListAlt />
          Dashboard
        </NavLink>

        <NavLink to={"/shopping"} className="link">
          <MdOutlineShoppingCart />
          Compras
        </NavLink>

        <NavLink to={"/sales"} className="link">
          <MdAttachMoney />
          Vendas
        </NavLink>

        <NavLink to={"/materials"} className="link">
          <MdOutlineLayers />
          Materiais
        </NavLink>

        <NavLink to={"/products"} className="link">
          <TbBox />
          Produtos
        </NavLink>
      </div>

      <NavLink to={"/config"} className="link">
        <GoGear />
        Configurações
      </NavLink>
    </div>
  );
}
