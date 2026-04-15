import Upgrade from "../Upgrade";
import Values from "../../values/Values";

export default class GraveDigger extends Upgrade {
  constructor(gold: React.RefObject<number>) {
    super(Values.GRAVE_DIGGER_COST, Values.GRAVE_DIGGER_COST_INCREASE, gold);
  }
}
