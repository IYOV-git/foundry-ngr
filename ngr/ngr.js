import { NGRCharacterSheet } from "./sheets/character-sheet.js";

Hooks.once("init", async function () {
  
  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("ngr", NGRCharacterSheet, {
    types: ["character"],
    makeDefault: true,
  });

  await loadTemplates([
    "systems/ngr/sheets/character-sheet.html"  
  ]);
});