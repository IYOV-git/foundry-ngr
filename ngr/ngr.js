import { NGR } from "./config.js";
import { ActorNGR } from "./actor.js";
import { ActorSheetNGR } from "./sheets/actor-sheet.js";

Hooks.once("init", async function () {

  CONFIG.NGR = NGR;
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

Hooks.once("setup", function() {

  // Localize CONFIG objects once up-front
  const toLocalize = [
    "attributes", "attributeAbbreviations"
  ];

  // Exclude some from sorting where the default order matters
  const noSort = [
    "attributes"
  ];

  // Localize and sort CONFIG objects
  for ( let o of toLocalize ) {
    const localized = Object.entries(CONFIG.NGR[o]).map(e => {
      return [e[0], game.i18n.localize(e[1])];
    });
    if ( !noSort.includes(o) ) localized.sort((a, b) => a[1].localeCompare(b[1]));
    CONFIG.NGR[o] = localized.reduce((obj, e) => {
      obj[e[0]] = e[1];
      return obj;
    }, {});
  }
});