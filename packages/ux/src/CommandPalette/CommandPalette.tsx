import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Icon, Kbd } from "@azores/ui";
import { Modal } from "../Modal/Modal.js";
import {
  Empty,
  FooterBar,
  FooterSpacer,
  GroupLabel,
  Item,
  ItemLabel,
  PaletteInput,
  PaletteList,
  PaletteSearch,
} from "./CommandPalette.styles.js";

export type Command = {
  id: string;
  label: string;
  group?: string;
  icon?: string;
  keywords?: string;
  hint?: ReactNode;
  run: () => void;
};

export type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
  commands: ReadonlyArray<Command>;
  placeholder?: string;
};

const DEFAULT_GROUP = "Commands";

export const CommandPalette = ({
  open,
  onClose,
  commands,
  placeholder = "Type a command, search anything…",
}: CommandPaletteProps): JSX.Element => {
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIdx(0);
      const id = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const s = query.trim().toLowerCase();
    if (!s) return commands;
    return commands.filter((c) => {
      const hay = `${c.label} ${c.keywords ?? ""} ${c.group ?? ""}`.toLowerCase();
      return hay.includes(s);
    });
  }, [query, commands]);

  useEffect(() => setSelectedIdx(0), [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        const cmd = filtered[selectedIdx];
        if (cmd) {
          e.preventDefault();
          cmd.run();
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, selectedIdx, onClose]);

  const grouped = useMemo(() => {
    const out = new Map<string, Array<{ cmd: Command; index: number }>>();
    filtered.forEach((cmd, index) => {
      const g = cmd.group ?? DEFAULT_GROUP;
      const list = out.get(g) ?? [];
      list.push({ cmd, index });
      out.set(g, list);
    });
    return Array.from(out.entries());
  }, [filtered]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      align="top"
      width="600px"
      ariaLabel="Command palette"
      padded={false}
    >
      <div>
        <PaletteSearch>
          <Icon name="search" size={16} style={{ color: "var(--az-text-3)" }} />
          <PaletteInput
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label="Search commands"
          />
          <Kbd>ESC</Kbd>
        </PaletteSearch>
        <PaletteList role="listbox" aria-label="Commands">
          {filtered.length === 0 ? (
            <Empty>No results for &ldquo;{query}&rdquo;</Empty>
          ) : (
            grouped.map(([group, items]) => (
              <div key={group}>
                <GroupLabel>{group}</GroupLabel>
                {items.map(({ cmd, index }) => (
                  <Item
                    key={cmd.id}
                    role="option"
                    aria-selected={selectedIdx === index}
                    $active={selectedIdx === index}
                    onMouseEnter={() => setSelectedIdx(index)}
                    onClick={() => {
                      cmd.run();
                      onClose();
                    }}
                  >
                    {cmd.icon ? (
                      <Icon name={cmd.icon} size={14} style={{ color: "var(--az-text-3)" }} />
                    ) : null}
                    <ItemLabel>{cmd.label}</ItemLabel>
                    {selectedIdx === index ? (
                      <span style={{ fontSize: 11, color: "var(--az-text-3)" }}>↵</span>
                    ) : null}
                    {cmd.hint}
                  </Item>
                ))}
              </div>
            ))
          )}
        </PaletteList>
        <FooterBar>
          <span>
            <Kbd>↑</Kbd> <Kbd>↓</Kbd> Navigate
          </span>
          <span>
            <Kbd>↵</Kbd> Select
          </span>
          <FooterSpacer />
          <span style={{ fontFamily: "var(--az-font-mono)" }}>{filtered.length} results</span>
        </FooterBar>
      </div>
    </Modal>
  );
};
