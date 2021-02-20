export class ActorSheetNGR extends ActorSheet {
  constructor(...args) {
    super(...args);
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["ngr", "sheet", "actor", "character"],
      template: "systems/ngr/sheets/actor-sheet.html",
      height: 530,
      width: 450,
      resizable: true,
    });
  }

  getData() {
    let isOwner = this.entity.owner;
    const data = {
      owner: isOwner,
      options: this.options,
      editable: this.isEditable,
      cssClass: isOwner ? "editable" : "locked",
      config: CONFIG.NGR,
    };

    data.actor = duplicate(this.actor.data);
    data.data = data.actor.data;
    data.labels = this.actor.labels || {};

    for (let [a, att] of Object.entries(data.actor.data.attributes)) {
      att.label = CONFIG.NGR.attributes[a];
      const x = this._getAttModAndDie(att.score);
      att.mod = x.mod;
      att.die = x.die;
    }

    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);
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
}
