import {JsonObject, JsonProperty} from 'json2typescript';

/*
  Defines the data comprising a Player
*/
@JsonObject('Player')
export class Player {
  @JsonProperty('name', String)
  name: string;

  @JsonProperty('goldResource', Number)
  goldResource: number;

  @JsonProperty('woodResource', Number)
  woodResource: number;

  @JsonProperty('oreResource', Number)
  oreResource: number;

}
