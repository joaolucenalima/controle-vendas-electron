import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sale } from "./sale";
import { Product } from "./product";

@Entity()
export class SaleItem {
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@Column()
	amountInCents: number

	@Column()
	quantity: number

	@Column()
	productSalePrice: number
	
	@ManyToOne(() => Sale, (sale) => sale.id)
  saleId: Sale

	@ManyToOne(() => Product, (product) => product.id)
  productId: Product
}