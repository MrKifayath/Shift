import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserPreferences } from './entities/user-preferences.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserPreferences)
    private preferencesRepository: Repository<UserPreferences>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      email: createUserDto.email,
      username: createUserDto.username,
      passwordHash: createUserDto.password,
    });

    const savedUser = await this.usersRepository.save(user);

    // Create default preferences
    const preferences = this.preferencesRepository.create({
      userId: savedUser.id,
    });
    await this.preferencesRepository.save(preferences);

    return this.findById(savedUser.id);
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['preferences'],
    });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['preferences'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async updatePreferences(userId: string, updatePreferencesDto: UpdatePreferencesDto): Promise<UserPreferences> {
    await this.preferencesRepository.update(userId, updatePreferencesDto);
    
    const preferences = await this.preferencesRepository.findOne({
      where: { userId },
    });
    
    if (!preferences) {
      throw new NotFoundException('User preferences not found');
    }
    
    return preferences;
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}