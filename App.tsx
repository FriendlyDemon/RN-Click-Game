import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Upgrade from "./classes/Upgrade";
import Save from "./classes/Save";
import { styles } from "./styles/style";
import Shovel from "./components/Shovel";
import Farmers from "./components/Farmers";
import Scythes from "./components/Scythes";
import values from "./values/Values";
import SmoothNumber from "./components/AnimatedValue";
import Horses from "./components/Horses";
import GraveDiggers from "./components/GraveDiggers";
import { simplifyNumbers } from "./functions/SimplifyNumber";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [displayResources, setDisplayResources] = useState<{
    gold: number;
    bones: number;
    instant: boolean;
  }>({
    gold: 0,
    bones: 0,
    instant: false,
  });
  const bones = useRef<number>(0);
  const gold = useRef<number>(0);
  const GPS = useRef<number>(0);
  const BPS = useRef<number>(0);
  const clickIncrement = useRef<number>(1);
  const shovel = useRef<Upgrade>(
    new Upgrade(values.SHOVELS_COST, values.SHOVELS_COST_INCREASE),
  );
  const farmers = useRef<Upgrade>(
    new Upgrade(values.FARMERS_COST, values.FARMERS_COST_INCREASE),
  );
  const scythes = useRef<Upgrade>(
    new Upgrade(values.SCYTHE_COST, values.SCYTHE_COST_INCREASE),
  );
  const horses = useRef<Upgrade>(
    new Upgrade(values.HORSE_COST, values.HORSE_COST_INCREASE),
  );
  const graveDiggers = useRef<Upgrade>(
    new Upgrade(values.GRAVE_DIGGER_COST, values.GRAVE_DIGGER_COST_INCREASE),
  );
  const timePass = useRef<boolean>(true);
  const [pauseText, setPauseText] = useState<boolean>(true);
  const lastTime = useRef<number>(Date.now());
  const uiTimer = useRef<number>(0);
  const saveTimer = useRef<number>(0);
  const saveInterval = useRef<number>(15);
  const [showConfig, setShowconfig] = useState<boolean>(false);

  function calcGPS() {
    GPS.current =
      Math.floor(
        farmers.current.getLevel() *
          (1 + scythes.current.getLevel() * values.SCYTHE_FARMERS_INCREASE) *
          Math.pow(
            1 + horses.current.getLevel() * values.HORSE_BONUS,
            farmers.current.getLevel(),
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
      instant: true,
    }));
  }

  async function load() {
    timePass.current = false;
    try {
      let savedUpgrades = await AsyncStorage.getItem("@save");
      if (savedUpgrades) {
        let save: Save = JSON.parse(savedUpgrades);

        gold.current = save.gold;
        bones.current = save.bones;
        lastTime.current = save.lastTime;
        saveInterval.current = save.saveInterval;
        shovel.current.setLevel(save.shovel);
        farmers.current.setLevel(save.farmers);
        scythes.current.setLevel(save.scythes);
        horses.current.setLevel(save.horses);
        graveDiggers.current.setLevel(save.graveDiggers);
        calcClick();
        calcGPS();

        timePass.current = true;
      }
    } catch (error) {
      Alert.alert(
        "Error loading save",
        "there was an error loading a save,choose what you want to do:",
        [
          { text: "delete old save", onPress: deleteSave, isPreferred: true },
          {
            text: "load from file",
            onPress: () => {
              Alert.alert("sorry", "not implemented yet");
            },
          },
          { text: "do nothing", onPress: () => {} },
        ],
      );
    }
  }

  async function save() {
    const newSave: string = JSON.stringify(
      new Save(
        bones.current,
        gold.current,
        lastTime.current,
        saveInterval.current,
        shovel.current.getLevel(),
        farmers.current.getLevel(),
        scythes.current.getLevel(),
        horses.current.getLevel(),
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
    farmers.current.setLevel(0);
    scythes.current.setLevel(0);
    horses.current.setLevel(0);
    graveDiggers.current.setLevel(0);
    calcClick();
    calcGPS();
    setDisplayResources({ bones: 0, gold: 0, instant: true });

    await AsyncStorage.removeItem("@save");
    timePass.current = true;
  }

  function updateResources() {
    if (!timePass.current) return;
    setDisplayResources({
      gold: gold.current,
      bones: bones.current,
      instant: false,
    });
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
        instant: false,
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
            <TouchableOpacity
              style={styles.clicker}
              onPress={click}
              activeOpacity={0.7}
            >
              <Image
                style={styles.grave}
                source={require("./assets/grave.png")}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.counterText}>
                <Image
                  style={styles.icons}
                  source={require("./assets/bone_outline.png")}
                />{" "}
                :{" "}
                <SmoothNumber
                  style={styles.counterText}
                  value={displayResources.bones}
                  instant={displayResources.instant}
                />{" "}
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
                  :{" "}
                  <SmoothNumber
                    style={styles.counterText}
                    value={displayResources.gold}
                    instant={displayResources.instant}
                  />{" "}
                  {GPS.current ? (
                    <Text style={styles.counterText}>
                      ({simplifyNumbers(GPS.current)}/s)
                    </Text>
                  ) : null}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles.upgradesContainer}>
            <ScrollView
              contentContainerStyle={styles.upgradeScroll}
              style={styles.upgradeScrollParent}
            >
              <Farmers
                farmers={farmers.current}
                scythe={scythes.current}
                horses={horses.current}
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
              <Horses horses={horses.current} bones={bones} calcGPS={calcGPS} />
              <Scythes
                scythes={scythes.current}
                gold={gold}
                calcGPS={calcGPS}
              />
            </ScrollView>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              setShowconfig((prev) => !prev);
            }}
          >
            <Ionicons name="settings-outline" size={40} color="#cccccc" />
          </TouchableOpacity>
          {showConfig ? (
            <view>
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
                  setPauseText(timePass.current);
                }}
              >
                <Text>{pauseText ? "pause" : "resume"}</Text>
              </TouchableOpacity>
            </view>
          ) : null}
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
