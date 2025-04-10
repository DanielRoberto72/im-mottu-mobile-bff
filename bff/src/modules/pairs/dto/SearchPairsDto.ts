import { IsString } from 'class-validator';

export class GetPairsParamsDto {
  @IsString()
  characterName: string;

  @IsString()
  catBreed: string;
}
