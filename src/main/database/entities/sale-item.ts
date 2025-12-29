import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";
import { Sale } from "./sale";

@Entity()
export class SaleItem {
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@Column()
	quantity: number

	@Column()
	productSalePrice: number
	
	@ManyToOne(() => Sale, (sale) => sale.id)
  saleId: Sale

	@ManyToOne(() => Product, (product) => product.id)
  productId: Product
}