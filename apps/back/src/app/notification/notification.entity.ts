import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubscriptionEntity } from "../subscription/subscription.entity";
import { UserEntity } from "../user/user.entity";

@Entity('notification', { schema: 'public' })
export class NotificationEntity {

	@PrimaryGeneratedColumn('increment')
	id: number;

	@ManyToOne(() => UserEntity, user => user.id)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@OneToMany(() => SubscriptionEntity, subscription => subscription.id)
	subscriptions: SubscriptionEntity[];

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

	@Column({ name: 'updated_at', type: 'timestamp' })
	updatedAt: Date;

	@Column({ name: 'created_at', type: 'timestamp' })
	createdAt: Date;
}
