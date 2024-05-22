import { IsString, IsArray, IsOptional, ArrayNotEmpty } from "class-validator";

export class CreateCharacterDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  episodes: string[];

  @IsOptional()
  @IsString()
  planet?: string;
}
