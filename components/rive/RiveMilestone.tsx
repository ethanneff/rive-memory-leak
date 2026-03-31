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
  const dataBind = useViewModelInstance(riveFile);
  const { setValue: setMilestoneNumber } = useRiveNumber("milestone", dataBind);

  const handleComplete = useCallback(async () => {
    await riveRef.current?.pause();
    onComplete();
  }, [onComplete, riveRef]);

  useRiveTrigger("animationComplete", dataBind, {
    onTrigger: handleComplete,
  });

  useEffect(() => {
    if (!dataBind) return;
    if (!riveFile) return;
    setMilestoneNumber(milestoneNumber);
    riveRef.current?.playIfNeeded();
  }, [dataBind, milestoneNumber, riveFile, riveRef, setMilestoneNumber]);

  useEffect(() => {
    if (!error) return;
    void handleComplete();
  }, [handleComplete, error]);

  return (
    <View style={{ flex: 1 }}>
      {dataBind && riveFile ? (
        <RiveView
          autoPlay
          dataBind={dataBind}
          file={riveFile}
          fit={Fit.Cover}
          hybridRef={setHybridRef}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
    </View>
  );
};
