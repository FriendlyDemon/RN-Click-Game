export default class Save {
  bones: number;
  gold: number;
  lastTime: number;
  saveInterval: number;
  shovel: number;
  miners: number;
  pickaxes: number;
  smartMiners: number;
  graveDiggers: number;

  constructor(
    bones: number,
    gold: number,
    lastTime: number,
    saveInterval: number,
    shovel: number,
    miners: number,
    pickaxes: number,
    smartMiners: number,
    graveDiggers: number,
  ) {
    this.bones = bones;
    this.gold = gold;
    this.lastTime = lastTime;
    this.saveInterval = saveInterval;
    this.shovel = shovel;
    this.miners = miners;
    this.pickaxes = pickaxes;
    this.smartMiners = smartMiners;
    this.graveDiggers = graveDiggers;
  }
}
