export function attributeCheck(attMod, status) {
  let dX = "10";
  if (status == "onEdge") dX = "3d6";
  else if (status == "reckless") dX = "1d20";

  const rollFormula = "@dX + @attMod";
  const rollData = { dX, attMod };

  const messageData = {
    speaker: ChatMessage.getSpeaker(),
  };

  new Roll(rollFormula, rollData).roll().toMessage(messageData);
}

export function attributeRoll(attDie) {
  const rollFormula = "@attDie";
  const rollData = { attDie };

  const messageData = {
    speaker: ChatMessage.getSpeaker(),
  };

  new Roll(rollFormula, rollData).roll().toMessage(messageData);
}
