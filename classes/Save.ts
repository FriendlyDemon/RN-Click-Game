export default class Save {
  bones: number;
  gold: number;
  lastTime: number;
  saveInterval: number;
  shovel: number;
  farmers: number;
  scythes: number;
  horses: number;
  graveDiggers: number;
  warriors: number;

  constructor(
    bones: number,
    gold: number,
    lastTime: number,
    saveInterval: number,
    shovel: number,
    farmers: number,
    scythes: number,
    horses: number,
    graveDiggers: number,
    warriors: number,
  ) {
    this.bones = bones;
    this.gold = gold;
    this.lastTime = lastTime;
    this.saveInterval = saveInterval;
    this.shovel = shovel;
    this.farmers = farmers;
    this.scythes = scythes;
    this.horses = horses;
    this.graveDiggers = graveDiggers;
    this.warriors = warriors;
  }
}
