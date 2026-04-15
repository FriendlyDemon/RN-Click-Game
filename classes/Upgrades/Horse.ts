import Upgrade from "../Upgrade";
import Values from "../../values/Values";

export default class Horse extends Upgrade {
  constructor(bones: React.RefObject<number>) {
    super(Values.HORSE_COST, Values.HORSE_COST_INCREASE, bones);
  }
}
