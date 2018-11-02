import {JsonObject, JsonProperty} from 'json2typescript';

/*
  Defines the different resources a player has access to
*/
@JsonObject('ResourceBundle')
export class ResourceBundle {

  @JsonProperty('goldResource', Number)
  goldResource: number;

  @JsonProperty('woodResource', Number)
  woodResource: number;

  @JsonProperty('oreResource', Number)
  oreResource: number;

}
