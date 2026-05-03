import { useMemo, useState } from "react";
import { Area, List, Row, Val, Wrap } from "./TextStats.styles.js";

export const TextStats = (): JSX.Element => {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const words = (text.toLowerCase().match(/[a-z0-9']+/g) ?? []) as string[];
    const unique = new Set(words);
    const sentences = (text.match(/[.!?]+(\s|$)/g) ?? []).length;
    const lines = text.split(/\r?\n/).length;
    const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
    const avg = words.length
      ? (words.reduce((s, w) => s + w.length, 0) / words.length).toFixed(2)
      : "0";
    return {
      chars: text.length,
      noSpaces: text.replace(/\s/g, "").length,
      words: words.length,
      unique: unique.size,
      sentences,
      lines,
      longest: longest || "—",
      avg,
    };
  }, [text]);
  return (
    <Wrap>
      <Area
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text…"
        aria-label="Text"
      />
      <List>
        <Row>Characters <Val>{stats.chars}</Val></Row>
        <Row>Without spaces <Val>{stats.noSpaces}</Val></Row>
        <Row>Words <Val>{stats.words}</Val></Row>
        <Row>Unique words <Val>{stats.unique}</Val></Row>
        <Row>Sentences <Val>{stats.sentences}</Val></Row>
        <Row>Lines <Val>{stats.lines}</Val></Row>
        <Row>Longest word <Val>{stats.longest}</Val></Row>
        <Row>Avg word length <Val>{stats.avg}</Val></Row>
      </List>
    </Wrap>
  );
};

export default TextStats;
