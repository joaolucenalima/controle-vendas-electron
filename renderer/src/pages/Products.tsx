import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Product } from "../api/product";
import NoImgAvailable from '../assets/imagem-nao-disponivel.jpg';
import { Button } from "../components/button";
import { PageTopbar } from "../components/page-topbar";
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
    <div>
      <PageTopbar title="Produtos">
        <Button onClick={() => openProductModal()}>
          Adicionar
          <Plus size={20} />
        </Button>
      </PageTopbar>

      <div className="flex flex-wrap p-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col gap-1 w-60 p-3 rounded-lg bg-white border border-gray-400"
          >
            <img
              src={product.imgUrl || NoImgAvailable}
              className="min-h-48 aspect-square object-contain bg-zinc-200 rounded-lg border-2 border-zinc-200"
              alt={product.name}
            />

            <h2
              className="mt-2 font-semibold text-xl"
              title="Ver detalhes"
            >
              {product.name}
            </h2>

            <div className="flex justify-between items-center gap-2">
              <p>Preço</p>

              <p className="text-gray-600">
                {(product.priceInCents / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <Button variant="danger">
                  <Trash2 size={20} />
              </Button>

              <Button onClick={() => openProductModal(product.id)} className="flex-1">
                Editar <Pencil size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
