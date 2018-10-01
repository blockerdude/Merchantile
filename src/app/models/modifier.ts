import {JsonObject, JsonProperty} from 'json2typescript';
import { Operand } from './operand.enum';

/*
  Defines the structure of a modifier to influence.
*/
@JsonObject('Modifier')
export class Modifier {

  @JsonProperty('operand', Operand)
  operand: Operand;

  @JsonProperty('value', Number)
  value: number;

  @JsonProperty('description', String)
  description: string;
}
