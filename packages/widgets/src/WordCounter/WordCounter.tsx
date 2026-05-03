import { useMemo, useState } from "react";
import { Area, Box, Label, Num, Stats, Wrap } from "./WordCounter.styles.js";

export const WordCounter = (): JSX.Element => {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const words = (text.trim().match(/\S+/g) ?? []).length;
    const chars = text.length;
    const sentences = (text.match(/[.!?]+(\s|$)/g) ?? []).length;
    const minutes = Math.max(1, Math.round(words / 200)); // ~200 wpm
    return { words, chars, sentences, minutes };
  }, [text]);
  return (
    <Wrap>
      <Area
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type…"
        aria-label="Text"
      />
      <Stats>
        <Box><Num>{stats.words}</Num><Label>Words</Label></Box>
        <Box><Num>{stats.chars}</Num><Label>Chars</Label></Box>
        <Box><Num>{stats.sentences}</Num><Label>Sentences</Label></Box>
        <Box><Num>{stats.minutes}m</Num><Label>Read</Label></Box>
      </Stats>
    </Wrap>
  );
};

export default WordCounter;
