import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sales {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	filename: string;

	@Column()
	views: number;

	@Column()
	isPublished: boolean;
}
