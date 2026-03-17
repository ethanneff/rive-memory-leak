export type MonsterItem = {
  award_amount: number;
  cost: number;
  created_at: string;
  id: number;
  image_url: string;
  legacy_id: number;
  locked_image_url: string;
  metadata: MonsterItemMetadata;
  name: string;
  science_habitat_id: number;
  student_monster_items?: StudentMonsterItem[];
  subject_id: number;
  type: string;
  unlock_level: number;
  updated_at: string;
};

export type MonsterItemMetadata = {
  imageName: string;
  leftPosition: string;
  position: number;
  topPosition: string;
  width: string;
  zIndex: number;
};

export type MonsterMakerParts = MonsterPart[];

export type MonsterPart<Key extends MonsterPartType = MonsterPartType> = {
  created_at: string;
  id: number;
  legacy_number: number;
  prefix_url: string;
  preview_url: string;
  type: Key;
  updated_at: string;
};

export type MonsterPartsMap = Record<MonsterPartType, MonsterPart[]>;

export type MonsterPartType =
  | "body"
  | "color"
  | "eyes"
  | "headpart"
  | "mouth"
  | "pattern";

export type PurchaseMonsterResponse = {
  incentives: unknown;
  monster_items: MonsterItem[];
  student_monster: StudentMonster;
  student_monster_item: StudentMonsterItem;
};

export type StudentMonster = {
  body_monster_part?: MonsterPart;
  body_monster_part_id?: number;
  color_monster_part?: MonsterPart;
  color_monster_part_id?: number;
  created_at?: string;
  eyes_monster_part?: MonsterPart;
  eyes_monster_part_id?: number;
  headpart_monster_part?: MonsterPart;
  headpart_monster_part_id?: number;
  id?: number;
  mouth_monster_part?: MonsterPart;
  mouth_monster_part_id?: number;
  pattern_monster_part?: MonsterPart;
  pattern_monster_part_id?: number;
  student_id?: number;
  student_monster_items: null | StudentMonsterItem[];
  updated_at?: string;
};

export type StudentMonsterItem = {
  created_at: string;
  id: number;
  is_shown: boolean;
  metadata: MonsterItemMetadata;
  monster_item: MonsterItem;
  monster_item_id: number;
  student_monster_id: number;
  updated_at: string;
};

export type StudentMonsterParts = {
  body: string;
  color: string;
  eyes: string;
  headpart: string;
  mouth: string;
  pattern: string;
};

export type UpdateMonsterResponse = {
  student_monster: StudentMonster;
  student_monster_item: StudentMonsterItem;
};
