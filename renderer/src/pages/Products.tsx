import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Product } from "../api/product";
import { PageTopbar } from "../components/page-topbar";
import { PrimaryButton } from "../components/primary-button";
import { ProductForm } from "../components/products/product-form";
import { useModal } from "../contexts/ModalContext";

export function Products() {
  const { openModal } = useModal();
  const [products, setProducts] = useState<Product[]>([]);

  const openProductModal = (productId?: string) => {
    openModal({
      title: productId ? "Editar produto" : "Novo produto",
      modalElement: <ProductForm id={productId} fetchProducts={fetchProducts} />,
    });
  };

  async function fetchProducts() {
    window.api.product.getAll().then((response) => {
      setProducts(response);
    });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr] h-full">
      <PageTopbar title="Produtos">
        <PrimaryButton handleClick={() => openProductModal()}>
          <Plus size={18} />
          Novo
        </PrimaryButton>
      </PageTopbar>

      <div className="grid grid-cols-6 p-4 gap-4 overflow-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="h-max flex flex-col overflow-hidden rounded-lg border border-gray-400 hover:shadow-lg transition-shadow"
          >
            <img
              src={product.imgUrl}
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
              <p className="text-gray-600">
                {(product.priceInCents / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
