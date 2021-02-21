export class ActorNGR extends Actor {
  prepareData() {
    super.prepareData();

    const data = this.data.data;

    for (let [_, att] of Object.entries(data.attributes)) {
      const x = this._getAttModAndDie(att.score);
      att.mod = x.mod;
      att.die = x.die;
    }

    data.level = this._getLevel(data.xp);

    for (let [_, pie] of Object.entries(data.classPie)) {
      const x = this._getPieModAndPow(pie.pieces, data.level, 1);
      pie.powers = x.powers;
      pie.mod = x.mod;
    }

    data.combat =
      this.data.data.attributes.str.mod + this.data.data.classPie.war.mod;
    data.presence =
      this.data.data.attributes.cha.mod + this.data.data.classPie.bar.mod;
    data.stealth =
      this.data.data.attributes.agi.mod + this.data.data.classPie.rog.mod;
    data.occult =
      this.data.data.attributes.int.mod + this.data.data.classPie.wiz.mod;
    data.faith =
      this.data.data.attributes.wil.mod + this.data.data.classPie.pri.mod;

    return data;
  }

  _getAttModAndDie(score) {
    switch (score) {
      case 1:
        return { mod: -3, die: "1d4" };
      case 2:
      case 3:
      case 4:
      case 5:
        return { mod: -2, die: "1d4" };
      case 6:
        return { mod: -1, die: "1d4" };
      case 7:
      case 8:
      case 9:
        return { mod: -1, die: "1d6" };
      case 10:
      case 11:
        return { mod: 0, die: "1d6" };
      case 12:
      case 13:
      case 14:
      case 15:
        return { mod: 1, die: "1d8" };
      case 16:
      case 17:
      case 18:
        return { mod: 2, die: "1d10" };
      case 19:
        return { mod: 2, die: "1d12" };
      case 20:
        return { mod: 3, die: "1d12" };
      case 30:
        return { mod: 7, die: "1d20" };
      default:
        return { mod: undefined, die: undefined };
    }
  }

  _getLevel(xp) {
    if (xp < 1000) return 0;
    if (xp < 2000) return 1;
    if (xp < 4000) return 2;
    if (xp < 8000) return 3;
    if (xp < 16000) return 4;
    if (xp < 32000) return 5;
    if (xp < 64000) return 6;
    if (xp < 125000) return 7;
    if (xp < 250000) return 8;
    if (xp < 500000) return 9;
    return 10;
  }

  _getPieModAndPow(pieces, level, milestones) {
    switch (pieces) {
      case 0:
        return {
          powers: 0,
          allowLocked: false,
          mod: Math.floor(level * (1 / 3)),
        };
      case 1:
        return {
          powers: 1,
          allowLocked: false,
          mod: Math.floor(level * (2 / 3)),
        };
      case 2:
        return {
          powers: 3,
          allowLocked: false,
          mod: level,
        };
      case 3:
        return {
          powers: 6,
          allowLocked: false,
          mod: level + milestones,
        };
      case 4:
        return {
          powers: 7,
          allowLocked: true,
          mod: level + milestones,
        };
      default:
        return {
          powers: undefined,
          allowLocked: undefined,
          mod: undefined,
        };
    }
  }
}
