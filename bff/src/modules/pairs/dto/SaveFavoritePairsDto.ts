import { IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CharacterDto {
  @IsString({ message: 'A propriedade name deve ser uma string' })
  @IsNotEmpty({ message: 'A propriedade name é obrigatória' })
  @ApiProperty({
    description: 'nome do personagem',
    example: 'Rick',
  })
  name: string;

  @IsUrl()
  @IsNotEmpty({ message: 'A propriedade name deve ser uma string' })
  @ApiProperty({
    description: 'url da imagem do personagem',
    example: 'https://rickandmortyapi.com/api/character/avatar/12.jpeg',
  })
  image: string;

  @IsString({ message: 'A propriedade species deve ser uma string' })
  @IsNotEmpty({ message: 'A propriedade species é obrigatória' })
  @ApiProperty({
    description: 'espécie do personagem',
    example: 'Human',
  })
  species: string;
}

class CatDto {
  @IsString({ message: 'A propriedade id deve ser uma string' })
  @IsNotEmpty({ message: 'A propriedade id é obrigatória' })
  @ApiProperty({
    description: 'Id da raça do gato',
    example: 'abys',
  })
  id: string;

  @IsUrl()
  @IsNotEmpty({ message: 'A propriedade image é obrigatória' })
  @ApiProperty({
    description: 'url da imagem raça do gato',
    example: 'https://cdn2.thecatapi.com/images/6v3.jpg',
  })
  image: string;
}

export class SaveFavoritePairsDto {
  @ValidateNested()
  @Type(() => CharacterDto)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Objeto do personagem',
    example: {
      name: 'Rick',
      image: 'https://rickandmortyapi.com/api/character/avatar/12.jpeg',
      species: 'Human',
    },
  })
  character: CharacterDto;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CatDto)
  @ApiProperty({
    description: 'Objeto do gato',
    example: {
      id: 'abys',
      image: 'https://cdn2.thecatapi.com/images/6v3.jpg',
    },
  })
  cat: CatDto;
}
