import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Upgrade from "./classes/Upgrade";
import Save from "./classes/Save";
import { styles } from "./styles/style";
import Shovel from "./components/Shovel";
import Miners from "./components/Miners";
import Pickaxes from "./components/Pickaxes";
import values from "./values/Values";
import SmoothNumber from "./components/AnimatedValue";
import SmartMiners from "./components/SmartMiners";
import GraveDiggers from "./components/GraveDiggers";
import { simplifyNumbers } from "./functions/SimplifyNumber";

export default function App() {
  const [displayResources, setDisplayResources] = useState<{
    gold: number;
    bones: number;
  }>({
    gold: 0,
    bones: 0,
  });
  const bones: React.RefObject<number> = useRef(0);
  const gold: React.RefObject<number> = useRef(0);
  const GPS: React.RefObject<number> = useRef(0);
  const BPS: React.RefObject<number> = useRef(0);
  const clickIncrement: React.RefObject<number> = useRef(1);
  const shovel: React.RefObject<Upgrade> = useRef(
    new Upgrade(values.SHOVELS_COST, values.SHOVELS_COST_INCREASE),
  );
  const miners: React.RefObject<Upgrade> = useRef(
    new Upgrade(values.MINERS_COST, values.MINERS_COST_INCREASE),
  );
  const pickaxes: React.RefObject<Upgrade> = useRef(
    new Upgrade(values.PICKAXE_COST, values.PICKAXE_COST_INCREASE),
  );
  const smartMiners: React.RefObject<Upgrade> = useRef(
    new Upgrade(values.SMART_MINER_COST, values.SMART_MINER_COST_INCREASE),
  );
  const graveDiggers: React.RefObject<Upgrade> = useRef(
    new Upgrade(values.GRAVE_DIGGER_COST, values.GRAVE_DIGGER_COST_INCREASE),
  );
  const timePass: React.RefObject<boolean> = useRef(true);
  const saveInterval: React.RefObject<number> = useRef(500);
  let saveTimer: NodeJS.Timeout;

  function calcGPS() {
    GPS.current =
      Math.floor(
        miners.current.getLevel() *
          (1 + pickaxes.current.getLevel() * values.PICKAXE_MINERS_INCREASE) *
          Math.pow(
            1 + smartMiners.current.getLevel() * values.SMART_MINER_BONUS,
            miners.current.getLevel(),
          ) *
          100,
      ) / 100;
    updateResources();
  }

  function calcBPS() {
    BPS.current =
      Math.floor(
        ((clickIncrement.current * graveDiggers.current.getLevel()) / 2) * 100,
      ) / 100;
    updateResources();
  }

  function calcClick() {
    clickIncrement.current = shovel.current.getLevel() + 1;
    calcBPS();
  }

  function click() {
    bones.current += clickIncrement.current;

    setDisplayResources((prev) => ({
      ...prev,
      bones: bones.current,
    }));
  }

  async function load() {
    timePass.current = false;
    let savedUpgrades = await AsyncStorage.getItem("@save");
    if (savedUpgrades) {
      let save: Save = JSON.parse(savedUpgrades);

      gold.current = save.gold;
      bones.current = save.bones;
      shovel.current.setLevel(save.shovel);
      miners.current.setLevel(save.miners);
      pickaxes.current.setLevel(save.pickaxes);
      smartMiners.current.setLevel(save.smartMiners);
      graveDiggers.current.setLevel(save.graveDiggers);
      calcClick();
      calcGPS();
    }
    timePass.current = true;
  }

  async function save() {
    const upgrades: string = JSON.stringify(
      new Save(
        bones.current,
        gold.current,
        shovel.current.getLevel(),
        miners.current.getLevel(),
        pickaxes.current.getLevel(),
        smartMiners.current.getLevel(),
        graveDiggers.current.getLevel(),
      ),
    );

    await AsyncStorage.setItem("@save", upgrades);
  }

  function changeSaveInterval(newIenterval: number) {
    saveInterval.current = newIenterval;
    clearInterval(saveTimer);
    setInterval(save, newIenterval);
  }

  async function deleteSave() {
    timePass.current = false;
    gold.current = 0;
    bones.current = 0;
    shovel.current.setLevel(0);
    miners.current.setLevel(0);
    pickaxes.current.setLevel(0);
    smartMiners.current.setLevel(0);
    graveDiggers.current.setLevel(0);
    calcClick();
    calcGPS();

    await AsyncStorage.removeItem("@save", load);
    timePass.current = true;
  }

  function increment() {
    if (timePass.current) {
      gold.current += GPS.current / 10;
      bones.current += BPS.current / 10;
    }
  }

  function updateResources() {
    if (timePass.current) {
      setDisplayResources({
        gold: gold.current,
        bones: bones.current,
      });
    }
  }

  useEffect(() => {
    load();

    const incrementTimer = setInterval(increment, 100);
    const updateDisplay = setInterval(updateResources, 200);
    saveTimer = setInterval(save, saveInterval.current);

    return () => {
      clearInterval(saveTimer);
      clearInterval(incrementTimer);
      clearInterval(updateDisplay);
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.incrementalContainer}>
          <View style={styles.clickContainer}>
            <TouchableOpacity style={styles.clicker} onPress={click}>
              <Image
                style={styles.grave}
                source={require("./assets/grave.png")}
              />
            </TouchableOpacity>
            <Text style={styles.counterText}>
              <Image
                style={styles.icons}
                source={require("./assets/bone_outline.png")}
              />{" "}
              : <SmoothNumber value={displayResources.bones} />{" "}
              {BPS.current ? (
                <Text style={styles.counterText}>
                  ({simplifyNumbers(BPS.current)}/s)
                </Text>
              ) : null}
            </Text>

            {gold.current || GPS.current ? (
              <Text style={styles.counterText}>
                <Image
                  style={styles.icons}
                  source={require("./assets/gold_outline.png")}
                />{" "}
                : <SmoothNumber value={displayResources.gold} />{" "}
                {GPS.current ? (
                  <Text style={styles.counterText}>
                    ({simplifyNumbers(GPS.current)}/s)
                  </Text>
                ) : null}
              </Text>
            ) : null}
          </View>
          <View style={styles.upgradesContainer}>
            <ScrollView
              contentContainerStyle={styles.upgradeScroll}
              style={styles.upgradeScrollParent}
            >
              <Miners
                miners={miners.current}
                pickaxe={pickaxes.current}
                smartMiners={smartMiners.current}
                bones={bones.current}
              />
              <Shovel shovel={shovel.current} gold={gold.current} />
              <GraveDiggers
                graveDigger={graveDiggers.current}
                click={clickIncrement.current}
                gold={gold.current}
              />
              <SmartMiners
                smartMiners={smartMiners.current}
                bones={bones.current}
              />
              <Pickaxes pickaxes={pickaxes.current} gold={gold.current} />
            </ScrollView>
          </View>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
