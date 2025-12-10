import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Expense {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	description: string;

	@Column()
	amountInCents: number;

	@Column()
	installments: number;

	@Column()
	installmentsNumber: number;

	@Column()
	dueData: string;

	@Column()
	paid: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@Column()
	isRefunded: boolean;

	@Column({ type: 'date' })
	refundedAt: string;
}
