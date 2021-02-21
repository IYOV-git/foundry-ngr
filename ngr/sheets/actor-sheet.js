import * as Dice from "../dice.js";

export class ActorSheetNGR extends ActorSheet {
  constructor(...args) {
    super(...args);
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["ngr", "sheet", "actor", "character"],
      template: "systems/ngr/sheets/actor-sheet.html",
      width: 720,
      height: 680,
      resizable: true,
    });
  }

  getData() {
    const data = super.getData();

    for (let [a, att] of Object.entries(data.actor.data.attributes)) {
      att.label = CONFIG.NGR.attributes[a];
    }

    for (let [p, pie] of Object.entries(data.actor.data.classPie)) {
      pie.label = CONFIG.NGR.classPie[p];
    }

    for (let [c, cMods] of Object.entries(data.actor.data.conflictMods)) {
      cMods.label = CONFIG.NGR.conflictMods[c];
    }

    return data;
  }

  activateListeners(html) {
    if (this.actor.owner) {
      html.find(".attribute-roll").click((e) => this._onAttributeCheck(e));
      html.find(".att-mod-roll").click((e) => this._onAttributeCheck(e));
      html.find(".att-die-roll").click((e) => this._onAttributeRoll(e));
    }

    super.activateListeners(html);
  }

  _onAttributeCheck(event) {
    event.preventDefault();
    const att = event.currentTarget.dataset.attribute;
    const attMod = this.actor.data.data.attributes[att].mod;
    const status = this.actor.data.data.status;
    Dice.attributeCheck(attMod, status);
  }

  _onAttributeRoll(event) {
    event.preventDefault();
    const att = event.currentTarget.dataset.attribute;
    const attDie = this.actor.data.data.attributes[att].die;
    Dice.attributeRoll(attDie);
  }
}
