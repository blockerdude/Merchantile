import { Influence } from './../../models/influence';
import { JsonCustomConvert } from 'json2typescript/src/json2typescript/json-custom-convert';
import { JsonConverter } from 'json2typescript/src/json2typescript/json-convert-decorators';

@JsonConverter
export class InfluenceConverter implements JsonCustomConvert<Map<number, Map<number, Influence>>> {
  serialize(influenceMatrix: Map<number, Map<number, Influence>>): any {
      return {test: 'this is a test'};
    }

    deserialize(influenceMatrix: Map<number, Map<number, Influence>>): Map<number, Map<number, Influence>> {
        return new Map<number, Map<number, Influence>>(influenceMatrix);
    }
}
