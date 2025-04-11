import { IsString } from 'class-validator';

export class GetPairsParamsDto {
  @IsString({ message: 'A propriedade characterName deve ser uma string' })
  characterName: string;

  @IsString({ message: 'A propriedade catBreed deve ser uma string' })
  catBreed: string;
}
