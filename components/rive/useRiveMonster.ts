import {
  type RiveViewRef,
  useRiveEnum,
  type ViewModelInstance,
} from "@rive-app/react-native";
import { useCallback, useEffect } from "react";
import { getRiveMonsterProperties } from "./getRiveMonsterProperties";
import { type StudentMonster } from "./monster";

type Properties = {
  dataBind: null | ViewModelInstance;
  key: string;
  riveViewRef: null | RiveViewRef;
  studentMonster?: null | StudentMonster;
};

export const useRiveMonster = ({
  dataBind,
  key,
  riveViewRef,
  studentMonster,
}: Properties) => {
  const { setValue: setPropertyGroup4 } = useRiveEnum(
    `${key}propGroup4`,
    dataBind
  );
  const { setValue: setPropertyGroup3 } = useRiveEnum(
    `${key}propGroup3`,
    dataBind
  );
  const { setValue: setPropertyGroup2 } = useRiveEnum(
    `${key}propGroup2`,
    dataBind
  );
  const { setValue: setPropertyGroup1 } = useRiveEnum(
    `${key}propGroup1`,
    dataBind
  );
  const { setValue: setMouth } = useRiveEnum(`${key}mouth`, dataBind);
  const { setValue: setPattern } = useRiveEnum(`${key}pattern`, dataBind);
  const { setValue: setHeadpart } = useRiveEnum(`${key}headpart`, dataBind);
  const { setValue: setColor } = useRiveEnum(`${key}color`, dataBind);
  const { setValue: setEyes } = useRiveEnum(`${key}eyes`, dataBind);
  const { setValue: setMonsterType } = useRiveEnum(
    `${key}monsterType`,
    dataBind
  );

  const loadMonster = useCallback(
    (monster: StudentMonster) => {
      const {
        color,
        eyes,
        headpart,
        monsterType,
        mouth,
        pattern,
        propGroup1,
        propGroup2,
        propGroup3,
        propGroup4,
      } = getRiveMonsterProperties(monster);
      setPropertyGroup1(propGroup1);
      setPropertyGroup2(propGroup2);
      setPropertyGroup3(propGroup3);
      setPropertyGroup4(propGroup4);
      setMouth(mouth);
      setPattern(pattern);
      setHeadpart(headpart);
      setColor(color);
      setEyes(eyes);
      setMonsterType(monsterType);
      riveViewRef?.playIfNeeded();
    },
    [
      setPropertyGroup4,
      setPropertyGroup3,
      setPropertyGroup2,
      setPropertyGroup1,
      setMouth,
      setPattern,
      setHeadpart,
      setColor,
      setEyes,
      setMonsterType,
      riveViewRef,
    ]
  );

  useEffect(() => {
    if (!studentMonster) return;
    loadMonster(studentMonster);
  }, [loadMonster, studentMonster]);
};
