import Upgrade from "../Upgrade";
import Values from "../../values/Values";

export default class Farmer extends Upgrade {
  constructor(bones: React.RefObject<number>) {
    super(Values.FARMERS_COST, Values.FARMERS_COST_INCREASE, bones);
  }
}
