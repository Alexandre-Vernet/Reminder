import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../auth/user.entity";

@Entity('subscription', { schema: 'public' })
export class SubscriptionEntity {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ManyToOne(() => UserEntity, user => user.notifications)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

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
