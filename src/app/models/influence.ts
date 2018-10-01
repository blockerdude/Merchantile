import { Modifier } from './modifier';
import { JsonObject, JsonProperty } from 'json2typescript';
/**
 * Holds the information required to describe influence for a player controller relationship
 */
@JsonObject('Influence')
export class Influence {

  @JsonProperty('calculatedValue', Number)
  calculatedValue: number;

  @JsonProperty('baseValue', Number)
  baseValue: number;

  // TODO: Might change to hold a 'resource bundle' object
  @JsonProperty('resourceCount', Number)
  resourceCount: number;

  @JsonProperty('modifier', [Modifier])
  modifiers: Modifier[];
}
