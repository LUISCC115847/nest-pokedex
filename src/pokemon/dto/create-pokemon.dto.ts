import { IsPositive, IsString, Min, MinLength, IsInt } from 'class-validator';


export class CreatePokemonDto {

    //number, positive, min 1
    @IsInt()
    @IsPositive()
    @Min(1)
    readonly no: number;

    @IsString()
    @MinLength(1)
    name: string;
}
