import {JsonObject, JsonProperty} from 'json2typescript';

/*
  Defines the data comprising a hex zone, a defined area on the grid
*/
@JsonObject('Zone')
export class Zone {

  @JsonProperty('zoneId', Number)
  zoneId: number;

  // TODO: Think about moving this property under the controller object
  @JsonProperty('tintColorString', String)
  tintColorString: string;

  @JsonProperty('controllerId', Number)
  controllerId: number;

}
