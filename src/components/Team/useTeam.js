import { useRef, useState, useEffect } from "react";
import ApexCharts from "apexcharts";
import playerData from "../../data/player.json";
import { GAME_TYPES, ANIMATION_DURATION } from "../../constants";
import { partitionPlayers } from "../../utils/dataAccessors";
import { getCSChartConfig, getR6ChartConfig } from "./chartConfig";

/**
 * Custom hook that encapsulates all Team component state management and side-effects.
 * @returns {Object} Team state and handlers
 */
export function useTeam() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setAnimating] = useState(false);
  const [showExtraPlayers, setShowExtraPlayers] = useState(false);
  const [game, setGame] = useState(GAME_TYPES.R6);

  const { active: activePlayers, hidden: hiddenPlayers } = partitionPlayers(
    playerData.data,
  );

  const contentRef = useRef({
    lastIndex: 0,
    lastTimeout: null,
    charts: [],
  });

  const onChangePlayer = (index) => {
    if (contentRef.current.lastTimeout) {
      clearTimeout(contentRef.current.lastTimeout);
    }
    setSelectedIndex(index);
    setAnimating(true);
    contentRef.current.lastTimeout = setTimeout(() => {
      contentRef.current.lastIndex = index;
      setAnimating(false);
    }, ANIMATION_DURATION);
  };

  const onExpand = () => {
    setShowExtraPlayers(true);
  };

  const onChangeGame = () => {
    const gameList = Object.values(GAME_TYPES);
    const currentIndex = gameList.findIndex((item) => item === game);
    setGame(gameList[(currentIndex + 1) % gameList.length]);
    contentRef.current.charts = [];
  };

  // Render charts when game mode changes
  useEffect(() => {
    if (game === GAME_TYPES.CS) {
      for (let i = 0; i < 3; ++i) {
        const element = document.querySelector("#player-chart-" + i);
        if (!element) return;
        const chart = new ApexCharts(element, {
          ...getCSChartConfig(),
          labels: playerData.label[i].data.map((x) => x.name),
          series: playerData.data[selectedIndex].game.cs.chart[i],
          colors: playerData.label[i].data.map((x) => x.color),
        });
        chart.render();
        contentRef.current.charts.push(chart);
      }
    } else {
      const element = document.querySelector("#player-chart-atk");
      if (!element) return;
      const chart = new ApexCharts(element, {
        ...getR6ChartConfig(),
        series: playerData.data[selectedIndex].game.r6.chart[0],
      });
      chart.render();
      contentRef.current.charts.push(chart);
    }
  }, [playerData, game]);

  // Update chart series when selected player changes
  useEffect(() => {
    if (game === GAME_TYPES.CS) {
      for (let i = 0; i < 3; ++i) {
        contentRef.current.charts?.[i]?.updateSeries(
          playerData.data[selectedIndex].game.cs.chart[i],
        );
      }
    } else {
      for (let i = 0; i < 2; ++i) {
        contentRef.current.charts?.[i]?.updateSeries(
          playerData.data[selectedIndex].game.r6?.chart?.[i] || [0, 0, 0, 0],
        );
      }
    }
  }, [selectedIndex, game]);

  return {
    selectedIndex,
    isAnimating,
    showExtraPlayers,
    game,
    activePlayers,
    hiddenPlayers,
    onChangePlayer,
    onExpand,
    onChangeGame,
    contentRef,
  };
}
