export function filterByCaster(object, filter) {
  const result = object.filter(obj => obj.caster.name === filter);

  return result;
}

export function filterByTarget(object, filter) {
  const result = object.filter(obj => obj.target.name === filter);

  return result;
}

export function filterBySpellName(object, filter) {
  const result = object.filter(obj => obj.spell.spellName === filter);

  return result;
}

export function parseSeconds(time) {
  const array = time.split(":");
  return +array[0] * 60 * 60 + +array[1] * 60 + +array[2];
}

export function calculateTotalAmount(object, filter, target) {
  if (!target) {
    const actions = filterByCaster(object, filter);
    let totalAmount = 0;
    actions.forEach(obj => {
      totalAmount += obj.spell.amount;
    });

    return totalAmount;
  } else {
    const actions = filterByTarget(object, filter);
    let totalAmount = 0;
    actions.forEach(obj => {
      totalAmount += obj.spell.amount;
    });

    return totalAmount;
  }
}

export function calculatePerSecond(object, filter, target) {
  if (object.length > 0) {
    const actions = filterByCaster(object, filter);
    const combatLength =
      parseSeconds(actions[actions.length - 1].timestamp.time) -
      parseSeconds(actions[0].timestamp.time);
    const totalAmount = calculateTotalAmount(actions, filter, target);
    return Math.round(totalAmount / combatLength);
  } else return "No data to parse";
}

export function calculateTakenPerSecond(object, filter) {
  if (object.length > 0) {
    const actions = filterBySpellName(object, filter);
    const combatLength =
      parseSeconds(actions[actions.length - 1].timestamp.time) -
      parseSeconds(actions[0].timestamp.time);
    const totalAmount = calculateDamageTotalForAbility(object, filter);
    return Math.round(totalAmount / combatLength);
  } else return "No data to parse";
}

export function getAllCasters(object) {
  const casters = [];
  object.forEach(obj => {
    if (casters.indexOf(obj.caster.name) < 0) {
      casters.push(obj.caster.name);
    }
  });

  return casters;
}

export function getSpellsCast(object) {
  const spells = [];
  object.forEach(obj => {
    if (spells.indexOf(obj.spell.spellName) < 0) {
      spells.push(obj.spell.spellName);
    }
  });

  return spells;
}

export function calculateDamageTotalForAbility(object, spell) {
  let total = 0;
  const spells = filterBySpellName(object, spell);

  spells.forEach(obj => {
    total += obj.spell.amount;
  });

  return total;
}

export function getSpellsCastOnTarget(object) {
  const spells = [];
  object.forEach(obj => {
    if (spells.indexOf(obj.spell.spellName) < 0) {
      spells.push(obj.spell.spellName);
    }
  });

  return spells;
}

export function calculateSpellCrit(object, spell) {
  const spells = filterBySpellName(object, spell);
  const crits = spells.filter(obj => obj.spell.critical);
  const critPercentage = crits.length / spells.length;

  return Math.round(critPercentage * 100);
}

export function getPlayerName(fileName) {
  const fileNameParts = fileName.split("-");
  const playerName = fileNameParts[fileNameParts.length - 1];
  return playerName;
}
