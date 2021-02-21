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

    for (let [c, pie] of Object.entries(data.actor.data.classPie)) {
      pie.label = CONFIG.NGR.classPie[c];
    }

    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}
