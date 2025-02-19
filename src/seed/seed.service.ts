import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from './../pokemon/pokemon.service';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor( 
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter
  ) {}

  async executedSeed() {

    await this.pokemonService.deleteAllPokemon();

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

    //const insertPromisesArray: any = [];
    const pokemonToInsert: {name: string, no: number}[] = [];
    
    data.results.forEach( ({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[ segments.length - 2 ];
      const pokemon = { name, no }
      pokemonToInsert.push(pokemon);
      //this.pokemonService.create( pokemon );
      /*insertPromisesArray.push( 
        this.pokemonService.create( pokemon )
      );*/
    });

    //await Promise.all( insertPromisesArray );
    await this.pokemonService.insertManyPakemon(pokemonToInsert);
    
    return 'Seed executed';
  }

}
