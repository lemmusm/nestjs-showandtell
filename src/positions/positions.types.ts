import { Position } from './entities/position.entity';

export type AllPositionsResponse = {
  data: Position[];
  totalCount: number;
};
