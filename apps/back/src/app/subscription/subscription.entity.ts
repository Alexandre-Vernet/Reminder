import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NotificationEntity } from "../notification/notification.entity";

@Entity('subscription', { schema: 'public' })
export class SubscriptionEntity {

	@PrimaryGeneratedColumn('increment')
	id: number;

	@OneToMany(() => NotificationEntity, notification => notification.id)
	notifications: NotificationEntity[];

	@Column()
	endpoint: string;

	@Column()
	p256dh: string;

	@Column()
	auth: string;

	@Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;

	@Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
