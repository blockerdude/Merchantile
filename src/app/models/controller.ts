import { JsonObject, JsonProperty } from 'json2typescript';
/**
 * Defines a controller for a zone
 */

@JsonObject('Hexagon')
export class Controller {

  @JsonProperty('id', Number, false)
  id: number;

  @JsonProperty('name', String)
  name: string;

  @JsonProperty('isPlayer', Boolean)
  isPlayer: boolean;
}
