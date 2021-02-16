export class NGRCharacterSheet extends ActorSheet {
  constructor(...args) {
    super(...args);
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["ngr", "sheet", "actor", "character"],
      template: "systems/ngr/sheets/character-sheet.html",
      height: 530,
      width: 450,
      resizable: true,
    });
  }
  activateListeners(html) {
    super.activateListeners(html);
  }
}