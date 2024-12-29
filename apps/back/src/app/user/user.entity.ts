import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NotificationEntity } from "../notification/notification.entity";

@Entity('user', { schema: 'public' })
export class UserEntity {

	@PrimaryGeneratedColumn('increment')
	id: number;

	@OneToMany(() => NotificationEntity, notification => notification.id)
	notifications: NotificationEntity[];

	@Column()
	email: string;

	@Column()
	password: string;

	@Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;

	@Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
