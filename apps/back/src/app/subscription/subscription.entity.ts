import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NotificationEntity } from "../notification/notification.entity";

@Entity('subscription', { schema: 'public' })
export class SubscriptionEntity {

	@PrimaryGeneratedColumn('increment')
	id: number;

	@ManyToOne(() => NotificationEntity, notification => notification.id)
	@JoinColumn({ name: 'notification_id' })
	notification: NotificationEntity;

	@Column()
	endpoint: string;

	@Column()
	p256dh: string;

	@Column()
	auth: string;

	@Column({ name: 'updated_at', type: 'timestamp' })
	updatedAt: Date;

	@Column({ name: 'created_at', type: 'timestamp' })
	createdAt: Date;
}
