export default class Save {
  bones: number;
  gold: number;
  shovel: number;
  miners: number;
  pickaxes: number;
  smartMiners: number;
  graveDiggers: number;

  constructor(
    bones: number,
    counter: number,
    shovel: number,
    miners: number,
    pickaxes: number,
    smartMiners: number,
    graveDiggers: number,
  ) {
    this.bones = bones;
    this.gold = counter;
    this.shovel = shovel;
    this.miners = miners;
    this.pickaxes = pickaxes;
    this.smartMiners = smartMiners;
    this.graveDiggers = graveDiggers;
  }
}
