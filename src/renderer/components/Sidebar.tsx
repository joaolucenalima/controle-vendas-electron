import { GoGear } from "react-icons/go";
import {
  MdAttachMoney,
  MdListAlt,
  MdOutlineLayers,
  MdShoppingCart,
} from "react-icons/md";
import { TbBox } from "react-icons/tb";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="navigation-links">
        <NavLink to={"/"} className="link" title="Dashboard">
          <MdListAlt style={{ color: "#CFC5BC" }} />
        </NavLink>

        <NavLink to={"/shopping"} className="link" title="Compras">
          <MdShoppingCart style={{ color: "#ca413c" }} />
        </NavLink>

        <NavLink to={"/sales"} className="link" title="Vendas">
          <MdAttachMoney style={{ color: "#00CF22" }} />
        </NavLink>

        <NavLink to={"/materials"} className="link" title="Materiais">
          <MdOutlineLayers style={{ color: "#FAC100" }} />
        </NavLink>

        <NavLink to={"/products"} className="link" title="Produtos">
          <TbBox style={{ color: "#3254FF" }} />
        </NavLink>
      </div>

      <NavLink to={"/config"} className="link" title="Configurações">
        <GoGear />
      </NavLink>
    </div>
  );
}
