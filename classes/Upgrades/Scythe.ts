import Upgrade from "../Upgrade";
import Values from "../../values/Values";

export default class Scythe extends Upgrade {
  constructor(gold: React.RefObject<number>) {
    super(Values.SCYTHE_COST, Values.SCYTHE_COST_INCREASE, gold);
  }
}
