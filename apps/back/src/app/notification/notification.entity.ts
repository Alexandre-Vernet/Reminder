import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubscriptionEntity } from "../subscription/subscription.entity";
import { UserEntity } from "../auth/user.entity";

@Entity('notification', { schema: 'public' })
export class NotificationEntity {

	@PrimaryGeneratedColumn('increment')
	id: number;

	@ManyToOne(() => UserEntity, user => user.id)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@ManyToOne(() => SubscriptionEntity, notification => notification.id, {cascade: true, eager: true})
	@JoinColumn({ name: 'subscription_id' })
	subscription: SubscriptionEntity;

	@Column()
	name: string;

	@Column()
	cron: string;

	@Column()
	status: boolean;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;

	@Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;
}
