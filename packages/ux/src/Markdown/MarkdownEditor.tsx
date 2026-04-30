import { Icon } from "@azores/ui";
import { MarkdownView } from "./MarkdownView.js";
import {
  Editor,
  PreviewPane,
  SourceArea,
  SourcePane,
  Pane,
  Toolbar,
  ToolbarButton,
  ToolbarMeta,
  ToolbarSpacer,
} from "./MarkdownEditor.styles.js";

export type MarkdownEditorProps = {
  value: string;
  onChange: (next: string) => void;
};

const TOOLBAR: ReadonlyArray<{ icon: string; label: string }> = [
  { icon: "bold", label: "B" },
  { icon: "italic", label: "I" },
  { icon: "quote", label: ">" },
  { icon: "code", label: "</>" },
  { icon: "link", label: "Link" },
  { icon: "list", label: "List" },
];

export const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps): JSX.Element => (
  <Editor>
    <SourcePane>
      <Toolbar>
        {TOOLBAR.map((t) => (
          <ToolbarButton key={t.icon} type="button" aria-label={t.label}>
            <Icon name={t.icon} size={12} />
            {t.label}
          </ToolbarButton>
        ))}
        <ToolbarSpacer />
        <ToolbarMeta>{value.length} chars</ToolbarMeta>
      </Toolbar>
      <SourceArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        aria-label="Markdown source"
      />
    </SourcePane>
    <Pane>
      <PreviewPane>
        <MarkdownView source={value} />
      </PreviewPane>
    </Pane>
  </Editor>
);
