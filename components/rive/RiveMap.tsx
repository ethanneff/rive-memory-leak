import {
  Fit,
  RiveView,
  useRive,
  useRiveBoolean,
  useRiveFile,
  useRiveNumber,
  useRiveTrigger,
  useViewModelInstance,
} from "@rive-app/react-native";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { type StudentMonster } from "./monster";
import { getRiveAssets } from "./riveAssets";
import { useRiveMonster } from "./useRiveMonster";

const monsterKey = "studentMonsterAvatarVM/";

type Properties = {
  readonly height: number;
  readonly hop: boolean;
  readonly level: number;
  readonly onComplete: () => void;
  readonly studentMonster?: null | StudentMonster;
  readonly waiting: boolean;
};

export const RiveMap = ({
  height,
  hop,
  level,
  onComplete,
  studentMonster,
  waiting,
}: Properties) => {
  const { riveFile } = useRiveFile(getRiveAssets.map.uri, {
    referencedAssets: getRiveAssets.map.referencedAssets,
  });
  const dataBind = useViewModelInstance(riveFile);
  const { setValue: setCurrentLevel } = useRiveNumber("currentLevel", dataBind);
  const { setValue: setWaiting } = useRiveBoolean("waiting", dataBind);
  const { setValue: setHop } = useRiveBoolean("avatarHop", dataBind);
  const { riveViewRef, setHybridRef } = useRive();

  useRiveTrigger("animationComplete", dataBind, { onTrigger: onComplete });
  useRiveMonster({ dataBind, key: monsterKey, riveViewRef, studentMonster });

  useEffect(() => {
    setHop(hop);
  }, [hop, setHop]);

  useEffect(() => {
    setWaiting(waiting);
  }, [waiting, setWaiting]);

  useEffect(() => {
    if (level > 37) {
      setCurrentLevel(37);
    } else if (level < 0) {
      setCurrentLevel(0);
    } else {
      setCurrentLevel(level);
    }
    riveViewRef?.playIfNeeded();
  }, [level, setCurrentLevel, riveViewRef]);

  return (
    <View style={{ height }}>
      {dataBind && riveFile ? (
        <RiveView
          dataBind={dataBind}
          file={riveFile}
          fit={Fit.Cover}
          hybridRef={setHybridRef}
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};
