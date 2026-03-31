import {
  Fit,
  RiveView,
  useRive,
  useRiveFile,
  useRiveNumber,
  useRiveTrigger,
  useViewModelInstance,
} from "@rive-app/react-native";
import { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { getRiveAssets } from "./riveAssets";

type Properties = {
  readonly incentive: 1 | 2 | 3;
  readonly milestoneNumber: number;
  readonly onComplete: () => void;
};

export const RiveMilestone = ({ milestoneNumber, onComplete }: Properties) => {
  const { uri } = getRiveAssets.chest;
  const { error, riveFile } = useRiveFile(uri);
  const { riveRef, setHybridRef } = useRive();
  const { instance } = useViewModelInstance(riveFile);
  const { setValue: setMilestoneNumber } = useRiveNumber("milestone", instance);

  const handleComplete = useCallback(async () => {
    await riveRef.current?.pause();
    onComplete();
  }, [onComplete, riveRef]);

  useRiveTrigger("animationComplete", instance, {
    onTrigger: handleComplete,
  });

  useEffect(() => {
    if (!instance) return;
    if (!riveFile) return;
    setMilestoneNumber(milestoneNumber);
    riveRef.current?.playIfNeeded();
  }, [instance, milestoneNumber, riveFile, riveRef, setMilestoneNumber]);

  useEffect(() => {
    if (!error) return;
    void handleComplete();
  }, [handleComplete, error]);

  return (
    <View style={{ flex: 1 }}>
      {instance && riveFile ? (
        <RiveView
          autoPlay
          dataBind={instance}
          file={riveFile}
          fit={Fit.Cover}
          hybridRef={setHybridRef}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
    </View>
  );
};
