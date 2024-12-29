import { ConflictException, Injectable } from '@nestjs/common';
import { User } from "../../../../libs/interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { FindOneOptions, Repository } from "typeorm";
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private jwtService: JwtService,
	) {
	}

	async signUp(user: User) {
		const option: FindOneOptions = {
			where: {
				email: user.email
			}
		};

		// Hash password
		const hashedPassword = await bcrypt.hash(user.password, 10);
		if (!hashedPassword) {
			throw new ConflictException('Something went wrong. Please try again later.');
		}
		user.password = hashedPassword;

		return await this.userRepository.findOne(option) ?? await this.userRepository.save(user);
	}

	async signIn(user: User) {
		const option: FindOneOptions = {
			where: {
				email: user.email,
				password: user.password
			}
		};

		const userFound = await this.userRepository.findOne(option);
		if (!userFound) {
			throw new ConflictException('Email or password is incorrect');
		}

		const matchPassword = await bcrypt.compare(user.password, userFound.password);
		if (!matchPassword) {
			throw new ConflictException('Invalid credentials');
		}

		delete userFound.password;

		return {
			accessToken: await this.jwtService.signAsync({ userFound }),
			user: userFound
		};
	}

	update(id: number, user: User) {
		return this.userRepository.update(id, user);
	}

	remove(id: number) {
		return this.userRepository.delete(id);
	}
}
