import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SaleItem } from "./sale-item";

@Entity()
export class Product {
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@Column()
	name: string
	
	@Column()
	priceInCents: number

	@Column({
		nullable: true
	})
	imgUrl: string

	@OneToMany(() => SaleItem, (item) => item.saleId)
	salesItems: SaleItem[]
}
