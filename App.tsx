import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SaveClass, { Upgrade } from "./classes/Upgrades";
import { styles } from "./styles/style";
import Shovel from "./components/Shovel";
import Miners from "./components/Miners";
import Pickaxes from "./components/Pickaxes";
import values from "./values/Values";
import SmoothNumber from "./components/AnimatedValue";
import { Resources } from "./types/Resources";
import SmartMiners from "./components/SmartMiners";

export default function App() {
  const [displayResources, setDisplayResources] = useState<Resources>({
    gold: 0,
    bones: 0,
  });
  const bones: React.RefObject<number> = useRef(1000);
  const gold: React.RefObject<number> = useRef(1000);
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
  const smartMiners = useRef(
    new Upgrade(values.SMART_MINER_COST, values.SMART_MINER_COST_INCREASE),
  );
  const timePass: React.RefObject<boolean> = useRef(true);

  function calcGPS() {
    GPS.current =
      miners.current.getLevel() *
      (1 + pickaxes.current.getLevel() * values.PICKAXE_MINERS_INCREASE) *
      Math.pow(
        1 + smartMiners.current.getLevel() * values.SMART_MINER_BONUS,
        miners.current.getLevel(),
      );
  }

  function buyMiners() {
    if (bones.current >= miners.current.getCurrentCost()) {
      bones.current -= miners.current.getCurrentCost();
      miners.current.setLevel(miners.current.getLevel() + 1);
      calcGPS();
      updateResources();
    }
  }

  function buyShovel() {
    if (gold.current >= shovel.current.getCurrentCost()) {
      gold.current -= shovel.current.getCurrentCost();
      shovel.current.setLevel(shovel.current.getLevel() + 1);
      clickIncrement.current = shovel.current.getLevel() + 1;
      updateResources();
    }
  }

  function buyPick() {
    if (gold.current >= pickaxes.current.getCurrentCost()) {
      gold.current -= pickaxes.current.getCurrentCost();
      pickaxes.current.setLevel(pickaxes.current.getLevel() + 1);
      calcGPS();
      updateResources();
    }
  }

  function buySmartMiners() {
    if (bones.current >= smartMiners.current.getCurrentCost()) {
      bones.current -= smartMiners.current.getCurrentCost();
      smartMiners.current.setLevel(smartMiners.current.getLevel() + 1);
      calcGPS();
      updateResources();
    }
  }

  function click() {
    bones.current += clickIncrement.current;

    setDisplayResources((prev) => ({
      ...prev,
      bones: bones.current,
    }));
  }

  function calcClick() {
    clickIncrement.current = shovel.current.getLevel() + 1;
  }

  async function load() {
    timePass.current = false;
    let savedUpgrades = await AsyncStorage.getItem("@save");
    if (savedUpgrades) {
      let save: SaveClass = JSON.parse(savedUpgrades);

      gold.current = Number(save.gold);
      shovel.current.setLevel(save.shovel);
      miners.current.setLevel(save.miners);
      calcClick();
      calcGPS();
    }
    timePass.current = true;
  }

  async function save() {
    const upgrades: string = JSON.stringify(
      new SaveClass(
        bones.current,
        gold.current,
        shovel.current.getLevel(),
        miners.current.getLevel(),
        pickaxes.current.getLevel(),
        smartMiners.current.getLevel(),
      ),
    );

    await AsyncStorage.setItem("@save", upgrades);
  }

  function increment() {
    if (timePass.current) {
      gold.current += GPS.current / 10;
      bones.current += BPS.current / 10;
    }
  }

  function updateResources() {
    setDisplayResources({
      gold: gold.current,
      bones: bones.current,
    });
  }

  useEffect(() => {
    load();

    const incrementTimer = setInterval(increment, 100);
    const updateDisplay = setInterval(updateResources, 200);
    //const saveTimer = setInterval(save,15000)

    return () => {
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
                source={require("./assets/bone.png")}
              />{" "}
              : <SmoothNumber value={displayResources.bones} />
            </Text>
            {gold.current || GPS.current ? (
              <Text style={styles.counterText}>
                <Image
                  style={styles.icons}
                  source={require("./assets/gold.png")}
                />{" "}
                : <SmoothNumber value={displayResources.gold} />
              </Text>
            ) : null}

            {GPS.current ? (
              <Text style={styles.counterText}>
                <Image
                  style={styles.icons}
                  source={require("./assets/gold.png")}
                />{" "}
                per second {GPS.current.toFixed(2)}
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
                buy={buyMiners}
              />
              <Shovel clicker={shovel.current} buy={buyShovel} />
              <Pickaxes pickaxes={pickaxes.current} buy={buyPick} />
              <SmartMiners
                smartMiners={smartMiners.current}
                buy={buySmartMiners}
              />
            </ScrollView>
          </View>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
