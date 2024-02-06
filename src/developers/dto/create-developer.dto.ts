export class CreateDeveloperDto {
  name: string;
  lastname?: string;
  position_id: Buffer | string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
