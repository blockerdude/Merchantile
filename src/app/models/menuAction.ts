import { JsonObject, JsonProperty } from 'json2typescript';
/**
 * Defines the properties required for the context menus
 */

@JsonObject('MenuAction')
export class MenuAction {

  @JsonProperty('isEnabled', Boolean)
  isEnabled: boolean;

  @JsonProperty('isDivider', Boolean)
  isDivider: boolean;

  @JsonProperty('isVisible', Boolean)
  isVisible: boolean;

  @JsonProperty('displayName', String)
  displayName: string;

  constructor(displayName: string, isEnable: boolean, isDivider: boolean, isVisible: boolean) {
    this.isEnabled = isEnable;
    this.isDivider = isDivider;
    this.isVisible = isVisible;
    this.displayName = displayName;

  }

}
