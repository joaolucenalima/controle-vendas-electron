import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SaleItem } from "./sale-item";

@Entity()
export class Sale {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	amountInCents: number
	
	@CreateDateColumn()
	createdAt: Date;

	@OneToMany(() => SaleItem, (item) => item.saleId)
	salesItems: SaleItem[]
}
