import { ResourceBundle } from './resourceBundle';
import { Controller } from './controller';
import {JsonObject, JsonProperty} from 'json2typescript';

/*
  Defines the data comprising a Player
*/
@JsonObject('Player')
export class Player extends Controller {

  @JsonProperty('resources', ResourceBundle)
  resources: ResourceBundle;

}
