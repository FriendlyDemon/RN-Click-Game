import Upgrade from "../Upgrade";
import Values from "../../values/Values";

export default class Shovel extends Upgrade {
  constructor(gold: React.RefObject<number>) {
    super(Values.SHOVELS_COST, Values.SHOVELS_COST_INCREASE, gold);
  }
}
