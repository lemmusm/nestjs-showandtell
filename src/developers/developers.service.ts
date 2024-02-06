import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { Developer } from './entities/developer.entity';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer)
    private developerRepository: Repository<Developer>,
  ) {}

  async createDeveloper(
    createDeveloperDto: CreateDeveloperDto,
  ): Promise<HttpException> {
    const user = this.developerRepository.create(createDeveloperDto);
    const uuidDeveloper = Buffer.from(uuidv4().replace(/-/g, ''), 'hex');
    const uuidPosition = Buffer.from(user.position_id as string, 'hex');

    return await this.developerRepository
      .save({
        ...user,
        id_developer: uuidDeveloper,
        position_id: uuidPosition,
      })
      .then(
        () =>
          new HttpException(
            {
              id: uuidDeveloper.toString('hex'),
              message: 'Registro creado correctamente',
            },
            HttpStatus.CREATED,
          ),
      )
      .catch(
        (error) =>
          new HttpException(
            {
              error: error.message ?? 'Error al crear registro',
            },
            HttpStatus.BAD_REQUEST,
          ),
      );
  }

  async getDeveloperByID(id: string): Promise<HttpException | Developer> {
    const bufferUUID = Buffer.from(id, 'hex');

    const queryBuilder = this.developerRepository
      .createQueryBuilder('developer')
      .leftJoinAndSelect('developer.position', 'position')
      .where('developer.id_developer = :id', { id: bufferUUID })
      .select([
        'developer.id_developer',
        'developer.name',
        'developer.updatedAt',
        'position.position',
      ]);

    const findDeveloper = await queryBuilder.getOne();

    if (!findDeveloper) {
      return new HttpException(
        {
          error: 'Registro no encontrado',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      ...findDeveloper,
      id_developer: findDeveloper.id_developer.toString('hex'),
    };
  }
}
