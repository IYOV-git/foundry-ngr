import { NGRCharacterSheet } from "./sheets/character-sheet.js";
import { NGRActor } from "./actor.js";

Hooks.once("init", async function () {

  CONFIG.Actor.entityClass = NGRActor;
  
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