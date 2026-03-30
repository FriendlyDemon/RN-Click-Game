import Upgrade from "../classes/Upgrade";

export function buyOne(
  resource: React.RefObject<number>,
  upgrade: Upgrade,
): boolean {
  if (resource.current >= upgrade.getCurrentCost()) {
    resource.current -= upgrade.getCurrentCost();
    upgrade.setLevel(upgrade.getLevel() + 1);
    return true;
  } else {
    return false;
  }
}
