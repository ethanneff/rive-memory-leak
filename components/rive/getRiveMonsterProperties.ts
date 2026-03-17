import { type StudentMonster, type StudentMonsterItem } from "./monster";

const monsterPartPropertyGroup1 = [
  "baseballHat",
  "catHat",
  "cheeseHat",
  "chefHat",
  "cowboyHat",
  "heroCrown",
  "jesterHat",
  "knightHelm",
  "painterHat",
  "pirateHat",
  "topHat",
  "wizardHat",
] as const;

const monsterPartPropertyGroup2 = [
  "blueScarf",
  "bowTie",
  "championMedal",
  "cowboyVest",
  "knightArmour",
  "necklace",
  "pirateBelt",
  "tuxedo",
] as const;

const monsterPartPropertyGroup3 = [
  "cowboyBoots",
  "jesterShoes",
  "snowBoots",
] as const;

const monsterPartPropertyGroup4 = [
  "baseballBat",
  "baseballGlove",
  "chefGlove",
  "chefSpoon",
  "fanHand",
  "knightShield",
  "magicWand",
  "paintBrush",
  "paintPalette",
  "popcorn",
  "royalScepter",
] as const;

type PropertyGroup1 = "none" | (typeof monsterPartPropertyGroup1)[number];
type PropertyGroup2 = "none" | (typeof monsterPartPropertyGroup2)[number];
type PropertyGroup3 = "none" | (typeof monsterPartPropertyGroup3)[number];
type PropertyGroup4 = "none" | (typeof monsterPartPropertyGroup4)[number];

const propertyGroupSets = [
  new Set<string>(monsterPartPropertyGroup1),
  new Set<string>(monsterPartPropertyGroup2),
  new Set<string>(monsterPartPropertyGroup3),
  new Set<string>(monsterPartPropertyGroup4),
] as const;

type RiveMonsterColor = "color1" | "color2" | "color3" | "color4" | "color5";

type RiveMonsterEyes = "eyes1" | "eyes2" | "eyes3" | "eyes4" | "eyes5";

type RiveMonsterHeadpart =
  | "headpart1"
  | "headpart2"
  | "headpart3"
  | "headpart4"
  | "headpart5";

type RiveMonsterMouth = "mouth1" | "mouth2" | "mouth3" | "mouth4" | "mouth5";

type RiveMonsterPattern =
  | "pattern1"
  | "pattern2"
  | "pattern3"
  | "pattern4"
  | "pattern5";

type RiveMonsterType =
  | "monster1"
  | "monster2"
  | "monster3"
  | "monster4"
  | "monster5";

const legacyIdToRivePropertyName: Readonly<Partial<Record<number, string>>> = {
  1: "wizardHat",
  2: "knightShield",
  3: "pirateHat",
  4: "knightHelm",
  5: "knightArmour",
  6: "pirateBelt",
  7: "baseballGlove",
  8: "heroCrown",
  9: "baseballHat",
  10: "baseballBat",
  11: "chefHat",
  12: "chefGlove",
  13: "chefSpoon",
  14: "bowTie",
  15: "magicWand",
  16: "topHat",
  17: "painterHat",
  18: "paintBrush",
  19: "paintPalette",
  20: "cowboyHat",
  21: "cowboyVest",
  22: "cowboyBoots",
  23: "jesterHat",
  24: "necklace",
  25: "royalScepter",
  26: "jesterShoes",
  27: "cheeseHat",
  28: "championMedal",
  29: "fanHand",
  30: "popcorn",
  31: "catHat",
  32: "blueScarf",
  33: "snowBoots",
  34: "tuxedo",
};

const clampPartIndex = (legacyNumber: number | undefined) =>
  Math.min(5, Math.max(1, legacyNumber ?? 1));

const nameToRiveCamelCase = (name: string): string => {
  const noSpaces = name.replaceAll(/\s+/gu, "");
  return noSpaces.replace(/^./u, (match) => match.toLowerCase());
};

const toRivePropertyName = (item: StudentMonsterItem): string => {
  const { metadata, monster_item: monsterItem } = item;
  const byLegacyId = legacyIdToRivePropertyName[monsterItem.legacy_id];
  if (byLegacyId !== undefined) return byLegacyId;
  const { imageName } = metadata;
  if (imageName !== "") return nameToRiveCamelCase(imageName);
  return nameToRiveCamelCase(monsterItem.name);
};

const getPropertyGroupFromItems = (
  items: null | StudentMonsterItem[],
  position: 1 | 2 | 3 | 4
) => {
  const entry = items?.find(
    (studentMonsterItem) =>
      studentMonsterItem.is_shown &&
      studentMonsterItem.metadata.position === position
  );
  if (!entry) return "none";
  const name = toRivePropertyName(entry);
  const set = propertyGroupSets[position - 1];
  return set.has(name) ? name : "none";
};

export const getRiveMonsterProperties = (studentMonster: StudentMonster) => {
  const items = studentMonster.student_monster_items ?? null;
  return {
    color: `color${clampPartIndex(
      studentMonster.color_monster_part?.legacy_number
    )}`,
    eyes: `eyes${clampPartIndex(
      studentMonster.eyes_monster_part?.legacy_number
    )}`,
    headpart: `headpart${clampPartIndex(
      studentMonster.headpart_monster_part?.legacy_number
    )}`,
    monsterType: `monster${clampPartIndex(
      studentMonster.body_monster_part?.legacy_number
    )}`,
    mouth: `mouth${clampPartIndex(
      studentMonster.mouth_monster_part?.legacy_number
    )}`,
    pattern: `pattern${clampPartIndex(
      studentMonster.pattern_monster_part?.legacy_number
    )}`,
    propGroup1: getPropertyGroupFromItems(items, 1),
    propGroup2: getPropertyGroupFromItems(items, 2),
    propGroup3: getPropertyGroupFromItems(items, 3),
    propGroup4: getPropertyGroupFromItems(items, 4),
  } as RiveMonsterProperties;
};

export type RiveMonsterProperties = {
  readonly color: RiveMonsterColor;
  readonly eyes: RiveMonsterEyes;
  readonly headpart: RiveMonsterHeadpart;
  readonly monsterType: RiveMonsterType;
  readonly mouth: RiveMonsterMouth;
  readonly pattern: RiveMonsterPattern;
  readonly propGroup1: PropertyGroup1;
  readonly propGroup2: PropertyGroup2;
  readonly propGroup3: PropertyGroup3;
  readonly propGroup4: PropertyGroup4;
};
