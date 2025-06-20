export function SaleDetails({ id }: { id: number }) {
  const sale = {
    id: id,
    createdAt: "2025-05-04",
    totalProducts: 6,
    amount_in_cents: 200000,
    products: [
      {
        id: 1,
        name: "Arandela",
        priceInCents: 50000,
        quantity: 2,
      },
      {
        id: 2,
        name: "Redondinha",
        priceInCents: 30000,
        quantity: 3,
      },
      {
        id: 3,
        name: "Redondinha com pé",
        priceInCents: 70000,
        quantity: 1,
      },
    ],
  };

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100);
  }

  return (
    <div className="flex flex-col gap-2 mt-2 px-2">
      <div className="flex items-center justify-between p-2">
        <span className="font-semibold">Data da venda:</span>
        <span>{new Date(sale.createdAt).toLocaleDateString()}</span>
      </div>

      <hr className="bg-zinc-300" />

      <table>
        <thead>
          <tr className="[&>*]:font-semibold [&>*]:text-gray-800 [&>*]:p-2 border-b border-b-zinc-300">
            <th className="text-start">Produto</th>
            <th className="text-end">Qtd.</th>
            <th className="text-end">Preço</th>
            <th className="text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {sale.products.map((product) => (
            <tr
              key={product.id}
              className="[&>*]:p-2 [&>*]:font-medium hover:bg-[#eee] border-b border-b-zinc-300"
            >
              <td className="text-start">{product.name}</td>
              <td className="text-end">{product.quantity}</td>
              <td className="text-end">{formatCurrency(product.priceInCents)}</td>
              <td className="text-end">
                {formatCurrency(product.priceInCents * product.quantity)}
              </td>
            </tr>
          ))}

          <tr className="bg-[#eee]">
            <td colSpan={3} className="text-start font-semibold p-2">
              Total:
            </td>
            <td className="text-end font-semibold p-2">
              {formatCurrency(sale.amount_in_cents)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
