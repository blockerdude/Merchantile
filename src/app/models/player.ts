import { Controller } from './controller';
import {JsonObject, JsonProperty} from 'json2typescript';

/*
  Defines the data comprising a Player
*/
@JsonObject('Player')
export class Player extends Controller {

  @JsonProperty('goldResource', Number)
  goldResource: number;

  @JsonProperty('woodResource', Number)
  woodResource: number;

  @JsonProperty('oreResource', Number)
  oreResource: number;

}
