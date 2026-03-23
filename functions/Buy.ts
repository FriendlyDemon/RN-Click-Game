import Upgrade from "../classes/Upgrade";

export function buyOne(resource: number, upgrade: Upgrade) {
  if (resource >= upgrade.getCurrentCost()) {
    resource -= upgrade.getCurrentCost();
    upgrade.setLevel(upgrade.getLevel() + 1);
  }
}
