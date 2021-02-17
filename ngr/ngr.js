import { ActorSheetNGR } from "./sheets/actor-sheet.js";
import { ActorNGR } from "./actor.js";

Hooks.once("init", async function () {

  CONFIG.Actor.entityClass = ActorNGR;
  
  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("ngr", ActorSheetNGR, {
    types: ["character"],
    makeDefault: true,
  });

  await loadTemplates([
    "systems/ngr/sheets/actor-sheet.html"  
  ]);
});