import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreatePositionDto } from './dto/create-position.dto';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto): Promise<HttpException> {
    const findPosition = await this.positionRepository.findOne({
      where: {
        position: createPositionDto.position,
      },
    });

    if (findPosition) {
      return new HttpException(
        'La posicion ya se encuentra registrada',
        HttpStatus.CONFLICT,
      );
    }

    const position = this.positionRepository.create(createPositionDto);
    const uuidPosition = Buffer.from(uuidv4().replace(/-/g, ''), 'hex');

    return this.positionRepository
      .save({
        id_position: uuidPosition,
        ...position,
      })
      .then(
        () =>
          new HttpException(
            {
              id: uuidPosition.toString('hex'),
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

  async findAll() {
    const positions = await this.positionRepository.findAndCount();
    return new HttpException(
      {
        data: positions[0].map((position) => ({
          ...position,
          id_position: position.id_position.toString('hex'),
        })),
        totalCount: positions[1],
      },
      HttpStatus.OK,
    );
  }
}
