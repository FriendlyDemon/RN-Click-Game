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
import Farmer from "./classes/Upgrades/Farmer";
import Shovel from "./classes/Upgrades/Shovel";
import Save from "./classes/Save";
import { styles } from "./styles/style";
import Shovels from "./components/Shovels";
import Farmers from "./components/Farmers";
import Scythes from "./components/Scythes";
import values from "./values/Values";
import SmoothNumber from "./components/AnimatedValue";
import Horses from "./components/Horses";
import GraveDiggers from "./components/GraveDiggers";
import { simplifyNumbers } from "./functions/SimplifyNumber";
import { Ionicons } from "@expo/vector-icons";
import GraveDigger from "./classes/Upgrades/GraveDigger";
import Horse from "./classes/Upgrades/Horse";
import Scythe from "./classes/Upgrades/Scythe";
import { images } from "./assets/images";

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
  const farmer = useRef<Farmer>(new Farmer(bones));
  const shovel = useRef<Shovel>(new Shovel(gold));
  const scythe = useRef<Scythe>(new Scythe(gold));
  const horse = useRef<Horse>(new Horse(bones));
  const graveDigger = useRef<GraveDigger>(new GraveDigger(gold));
  const timePass = useRef<boolean>(true);
  const [pauseText, setPauseText] = useState<boolean>(true);
  const lastTime = useRef<number>(Date.now());
  const uiTimer = useRef<number>(0);
  const saveTimer = useRef<number>(0);
  const saveInterval = useRef<number>(15);
  const [showConfig, setShowconfig] = useState<boolean>(false);
  const warriors = useRef<number>(0);

  function changeWarriors(numberToChange?: number) {
    const farmerLevel = farmer.current.getLevel();

    if (numberToChange !== undefined) {
      const newWarriors = warriors.current + numberToChange;

      if (newWarriors < 0 || newWarriors > farmerLevel) return;

      warriors.current = newWarriors;
      calcGPS();
    } else {
      warriors.current = warriors.current === farmerLevel ? 0 : farmerLevel;
      calcGPS();
    }
  }

  function calcGPS() {
    const farmerLevel = farmer.current.getLevel();
    const availableFarmers = farmerLevel - warriors.current;

    const scytheBonus =
      1 + scythe.current.getLevel() * values.SCYTHE_FARMERS_INCREASE;
    const horseBonus = 1 + horse.current.getLevel() * values.HORSE_BONUS;

    const result =
      availableFarmers * scytheBonus * Math.pow(horseBonus, farmerLevel);

    GPS.current = Math.floor(result * 100) / 100;
    updateResources();
  }

  function calcBPS() {
    BPS.current =
      Math.floor(
        ((clickIncrement.current * graveDigger.current.getLevel()) / 2) * 100,
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
        farmer.current.setLevel(save.farmers);
        scythe.current.setLevel(save.scythes);
        horse.current.setLevel(save.horses);
        graveDigger.current.setLevel(save.graveDiggers);
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
        farmer.current.getLevel(),
        scythe.current.getLevel(),
        horse.current.getLevel(),
        graveDigger.current.getLevel(),
        warriors.current,
      ),
    );

    await AsyncStorage.setItem("@save", newSave);
  }

  async function deleteSave() {
    timePass.current = false;
    gold.current = 0;
    bones.current = 0;
    shovel.current.setLevel(0);
    farmer.current.setLevel(0);
    scythe.current.setLevel(0);
    horse.current.setLevel(0);
    graveDigger.current.setLevel(0);
    warriors.current = 0;
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
              <Image style={styles.grave} source={images.grave} />
            </TouchableOpacity>
            <View>
              <Text style={styles.counterText}>
                <Image style={styles.icons} source={images.bone_outline} /> :{" "}
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
                  <Image style={styles.icons} source={images.gold_outline} /> :{" "}
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
                farmers={farmer.current}
                scythe={scythe.current}
                horses={horse.current}
                warriors={warriors}
                calcGPS={calcGPS}
              />
              <Shovels shovel={shovel.current} calcClick={calcClick} />
              <GraveDiggers
                graveDigger={graveDigger.current}
                click={clickIncrement.current}
                calcBPS={calcBPS}
              />
              <Horses horses={horse.current} calcGPS={calcGPS} />
              <Scythes scythes={scythe.current} calcGPS={calcGPS} />
            </ScrollView>
          </View>
        </View>
        <View style={styles.bottom}>
          <Text>{warriors.current}</Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="arrow-back"
              onPress={() => {
                changeWarriors(-1);
              }}
            />
            <Ionicons
              name="square"
              onPress={() => {
                changeWarriors();
              }}
            />
            <Ionicons
              name="arrow-forward"
              onPress={() => {
                changeWarriors(1);
              }}
            />
          </View>
          <Ionicons
            style={styles.optionsCog}
            name="settings-outline"
            onPress={() => {
              setShowconfig((prev) => !prev);
            }}
          />
          {showConfig ? (
            <View style={styles.options}>
              <Text
                onPress={() => {
                  timePass.current = !timePass.current;
                  setPauseText(timePass.current);
                }}
              >
                {pauseText ? "Pause" : "Resume"}
              </Text>
              <Text onPress={deleteSave}>Delete Save</Text>
            </View>
          ) : null}
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
