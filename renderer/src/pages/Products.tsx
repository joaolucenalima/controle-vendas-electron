import { Plus } from "lucide-react";
import { PageTopbar } from "../components/page-topbar";
import { PrimaryButton } from "../components/primary-button";
import { ProductForm } from "../components/products/product-form";
import { useModal } from "../contexts/ModalContext";

export function Products() {
  const { openModal } = useModal()
  
  const exampleProducts = [
    {
      id: 1,
      name: "Arandela de parede rústica",
      price: 72.00,
      imageUrl: "https://http2.mlstatic.com/D_Q_NP_2X_685590-MLB44447262520_122020-E-arandela-de-parede-rustica-revestida-em-bambu-p.webp"
    },
    {
      id: 2,
      name: "Luminária cilíndrica de mesa",
      price: 74.00,
      imageUrl: "https://http2.mlstatic.com/D_Q_NP_2X_712433-MLB70078563541_062023-E-abajur-luminaria-cilindrico-mesa-bambu-japons-sala-quarto.webp"
    },
    {
      id: 3,
      name: "Lustre pendente rústico",
      price: 78.00,
      imageUrl: "https://http2.mlstatic.com/D_Q_NP_2X_774064-MLB73327393328_122023-E-lustre-pendente-luminaria-tabaco-revestimento-beje-rustico.webp"
    }
  ]

  const openProductModal = (productId?: string) => {
    openModal({
      title: productId ? "Editar produto" : "Novo produto",
      modalElement: <ProductForm id={productId} />
    })
  }

  return (
    <div className="grid grid-rows-[auto_1fr] h-full">
      <PageTopbar className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Produtos</h1>

        <PrimaryButton handleClick={() => openProductModal()}>
          <Plus size={18} />
          Novo
        </PrimaryButton>
      </PageTopbar>

      <div className="grid grid-cols-6 p-4 gap-4 overflow-auto">
        {exampleProducts.map(product => (
          <div key={product.id} className="h-max flex flex-col overflow-hidden rounded-lg border border-gray-400 hover:shadow-lg transition-shadow">
            <img
              src={product.imageUrl}
              className="w-full h-60 object-contain border-b border-gray-400 shadow-sm cursor-pointer"
              alt={product.name}
              onClick={() => openProductModal(product.id.toString())}
            />
            <div className="px-3 py-2 bg-white">
              <h2
                className="w-max font-semibold hover:text-sky-700 hover:underline cursor-pointer"
                title="Ver detalhes"
                onClick={() => openProductModal(product.id.toString())}
              >
                {product.name}
              </h2>
              <p className="text-gray-600">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}