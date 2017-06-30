
import { IsIn, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name!: string;

  @IsIn(['Planned', 'In Progress', 'Completed'])
  status!: string;
}
