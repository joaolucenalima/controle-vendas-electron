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
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
          title="Relatório"
        >
          <span style={{ color: "#CFC5BC" }}>
            <MdListAlt />
          </span>
        </NavLink>

        <NavLink
          to={"/shopping"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
          title="Compras"
        >
          <span style={{ color: "#ca413c" }}>
            <MdShoppingCart />
          </span>
        </NavLink>

        <NavLink
          to={"/sales"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
          title="Vendas"
        >
          <span style={{ color: "#00CF22" }}>
            <MdAttachMoney />
          </span>
        </NavLink>

        <NavLink
          to={"/materials"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
          title="Materiais"
        >
          <span style={{ color: "#FAC100" }}>
            <MdOutlineLayers />
          </span>
        </NavLink>

        <NavLink
          to={"/products"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
          title="Produtos"
        >
          <span style={{ color: "#3254FF" }}>
            <TbBox />
          </span>
        </NavLink>
      </div>

      <NavLink
        to={"/config"}
        className={({ isActive }) => (isActive ? "link active" : "link")}
        title="Configurações"
      >
        <GoGear />
      </NavLink>
    </div>
  );
}
