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
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [displayResources, setDisplayResources] = useState<{
    gold: number;
    bones: number;
  }>({
    gold: 0,
    bones: 0,
  });
  const bones = useRef<number>(0);
  const gold = useRef<number>(0);
  const GPS = useRef<number>(0);
  const BPS = useRef<number>(0);
  const clickIncrement = useRef<number>(1);
  const shovel = useRef<Upgrade>(
    new Upgrade(values.SHOVELS_COST, values.SHOVELS_COST_INCREASE),
  );
  const miners = useRef<Upgrade>(
    new Upgrade(values.MINERS_COST, values.MINERS_COST_INCREASE),
  );
  const pickaxes = useRef<Upgrade>(
    new Upgrade(values.PICKAXE_COST, values.PICKAXE_COST_INCREASE),
  );
  const smartMiners = useRef<Upgrade>(
    new Upgrade(values.SMART_MINER_COST, values.SMART_MINER_COST_INCREASE),
  );
  const graveDiggers = useRef<Upgrade>(
    new Upgrade(values.GRAVE_DIGGER_COST, values.GRAVE_DIGGER_COST_INCREASE),
  );
  const timePass = useRef<boolean>(true);
  const lastTime = useRef<number>(Date.now());
  const uiTimer = useRef<number>(0);
  const saveTimer = useRef<number>(0);
  const saveInterval = useRef<number>(15);

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
      lastTime.current = save.lastTime;
      saveInterval.current = save.saveInterval;
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
    const newSave: string = JSON.stringify(
      new Save(
        bones.current,
        gold.current,
        lastTime.current,
        saveInterval.current,
        shovel.current.getLevel(),
        miners.current.getLevel(),
        pickaxes.current.getLevel(),
        smartMiners.current.getLevel(),
        graveDiggers.current.getLevel(),
      ),
    );

    await AsyncStorage.setItem("@save", newSave);
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

    await AsyncStorage.removeItem("@save");
    timePass.current = true;
  }

  function updateResources() {
    if (timePass.current) {
      setDisplayResources({
        gold: gold.current,
        bones: bones.current,
      });
    }
  }

  function tick(deltaTime: number) {
    if (!timePass.current) return;

    gold.current += GPS.current * deltaTime;
    bones.current += BPS.current * deltaTime;

    uiTimer.current += deltaTime;

    if (uiTimer.current >= 0.2) {
      setDisplayResources({
        gold: gold.current,
        bones: bones.current,
      });
      uiTimer.current = 0;
    }

    saveTimer.current += deltaTime;

    if (saveTimer.current >= saveInterval.current) save();
  }

  useEffect(() => {
    let animationFrameId: number;

    async function init() {
      await load();

      function gameLoop() {
        const now = Date.now();
        const deltaTime = (now - lastTime.current) / 1000;
        lastTime.current = now;

        tick(deltaTime);

        animationFrameId = requestAnimationFrame(gameLoop);
      }

      gameLoop();
    }

    init();

    return () => cancelAnimationFrame(animationFrameId);
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
                bones={bones}
                calcGPS={calcGPS}
              />
              <Shovel
                shovel={shovel.current}
                gold={gold}
                calcClick={calcClick}
              />
              <GraveDiggers
                graveDigger={graveDiggers.current}
                click={clickIncrement.current}
                gold={gold}
                calcBPS={calcBPS}
              />
              <SmartMiners
                smartMiners={smartMiners.current}
                bones={bones}
                calcGPS={calcGPS}
              />
              <Pickaxes
                pickaxes={pickaxes.current}
                gold={gold}
                calcGPS={calcGPS}
              />
            </ScrollView>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              deleteSave();
            }}
          >
            <Text>Delete Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              timePass.current = !timePass.current;
            }}
          >
            <Text>{timePass.current ? "pause" : "resume"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="settings-outline" size={40} color="#cccccc" />
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
