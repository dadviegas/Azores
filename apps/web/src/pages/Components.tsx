import { type ReactNode, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Background,
  BACKGROUNDS,
  Box,
  BrandMark,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Field,
  Help,
  Icon,
  Inline,
  Input,
  Kbd,
  Label,
  Select,
  Stack,
  Textarea,
} from "@azores/ui";

type DemoCardProps = { label: string; children: ReactNode };
const DemoCard = ({ label, children }: DemoCardProps): JSX.Element => (
  <div className="az-demo-card">
    <div className="az-demo-stage">{children}</div>
    <div className="az-demo-label">{label}</div>
  </div>
);

export const Components = (): JSX.Element => {
  const [email, setEmail] = useState("catarina@azores.app");
  const [region, setRegion] = useState("lis");
  const [notes, setNotes] = useState("");

  return (
    <div className="az-content">
      <div className="az-page-eyebrow">COMPONENTS</div>
      <h1 className="az-page-title">A complete, composable kit.</h1>
      <p className="az-page-lead">
        Every primitive a corporate product needs — buttons, forms, navigation, overlays,
        feedback, data — built on the same tokens and ready to drop into any surface.
      </p>

      <section className="az-section">
        <div className="az-section-head">
          <h2 className="az-section-title">Buttons</h2>
        </div>
        <div className="az-demo">
          <DemoCard label="Variants">
            <Button variant="primary">Primary</Button>
            <Button variant="ocean">Ocean</Button>
            <Button variant="accent">Lava</Button>
            <Button>Default</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Delete</Button>
          </DemoCard>
          <DemoCard label="Sizes">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary">Default</Button>
            <Button variant="primary" size="lg">Large</Button>
          </DemoCard>
          <DemoCard label="With icons">
            <Button variant="primary"><Icon name="plus" />New project</Button>
            <Button><Icon name="copy" />Copy</Button>
            <Button iconOnly aria-label="more"><Icon name="morev" /></Button>
          </DemoCard>
          <DemoCard label="States">
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="ghost" disabled>Disabled ghost</Button>
          </DemoCard>
        </div>
      </section>

      <section className="az-section">
        <div className="az-section-head">
          <h2 className="az-section-title">Form controls</h2>
        </div>
        <div className="az-demo">
          <DemoCard label="Text input">
            <Field>
              <Label>Email</Label>
              <Input
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Help>We'll never share your email.</Help>
            </Field>
          </DemoCard>
          <DemoCard label="Select">
            <Field>
              <Label>Region</Label>
              <Select value={region} onChange={(e) => setRegion(e.target.value)}>
                <option value="lis">Lisbon (eu-west-1)</option>
                <option value="fra">Frankfurt (eu-central-1)</option>
                <option value="iad">N. Virginia (us-east-1)</option>
              </Select>
            </Field>
          </DemoCard>
          <DemoCard label="Textarea">
            <Field>
              <Label>Notes</Label>
              <Textarea
                placeholder="Anything we should know?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </Field>
          </DemoCard>
          <DemoCard label="Validation">
            <Field>
              <Label>Slug</Label>
              <Input invalid defaultValue="My Project!!" />
              <Help error>Only lowercase letters, numbers and dashes.</Help>
            </Field>
          </DemoCard>
        </div>
      </section>

      <section className="az-section">
        <div className="az-section-head">
          <h2 className="az-section-title">Badges & Avatars</h2>
        </div>
        <div className="az-demo">
          <DemoCard label="Status badges">
            <Badge tone="moss"><Icon name="check" size={10} />Healthy</Badge>
            <Badge tone="ocean">In review</Badge>
            <Badge tone="lava">Beta</Badge>
            <Badge tone="amber">Throttled</Badge>
            <Badge tone="coral">Down</Badge>
            <Badge tone="solid">v2.4.1</Badge>
          </DemoCard>
          <DemoCard label="Avatars">
            <AvatarGroup>
              <Avatar style={{ background: "var(--az-ocean-500)" }}>CR</Avatar>
              <Avatar style={{ background: "var(--az-lava-400)" }}>JM</Avatar>
              <Avatar style={{ background: "var(--az-moss-500)" }}>SP</Avatar>
              <Avatar style={{ background: "var(--az-amber-500)" }}>+4</Avatar>
            </AvatarGroup>
          </DemoCard>
          <DemoCard label="Sizes">
            <Avatar size="sm">SM</Avatar>
            <Avatar size="md">MD</Avatar>
            <Avatar size="lg">LG</Avatar>
            <Avatar size="xl">XL</Avatar>
          </DemoCard>
        </div>
      </section>

      <section className="az-section">
        <div className="az-section-head">
          <h2 className="az-section-title">Layout primitives</h2>
        </div>
        <div className="az-demo">
          <DemoCard label="Stack">
            <Stack gap={3} style={{ width: "100%" }}>
              <Box p={3} bg="var(--az-bg-2)" border radius="sm">One</Box>
              <Box p={3} bg="var(--az-bg-2)" border radius="sm">Two</Box>
              <Box p={3} bg="var(--az-bg-2)" border radius="sm">Three</Box>
            </Stack>
          </DemoCard>
          <DemoCard label="Inline">
            <Inline gap={2} wrap>
              <Box px={3} py={2} bg="var(--az-bg-2)" border radius="sm">tag</Box>
              <Box px={3} py={2} bg="var(--az-bg-2)" border radius="sm">tag</Box>
              <Box px={3} py={2} bg="var(--az-bg-2)" border radius="sm">tag</Box>
            </Inline>
          </DemoCard>
          <DemoCard label="Card">
            <Card style={{ width: "100%" }}>
              <CardHeader>
                <CardTitle>Project: azores-prod</CardTitle>
              </CardHeader>
              <CardBody>
                <span style={{ fontSize: 13, color: "var(--az-text-2)" }}>
                  Five services, two regions.
                </span>
              </CardBody>
            </Card>
          </DemoCard>
        </div>
      </section>

      <section className="az-section">
        <div className="az-section-head">
          <h2 className="az-section-title">Brand & keyboard</h2>
        </div>
        <div className="az-demo">
          <DemoCard label="BrandMark">
            <Inline gap={3} align="center">
              <BrandMark size="sm" />
              <BrandMark size="md" />
              <BrandMark size="lg" />
            </Inline>
          </DemoCard>
          <DemoCard label="Kbd">
            <Inline gap={2} align="center">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
              <span style={{ fontSize: 13, color: "var(--az-text-3)" }}>open palette</span>
            </Inline>
          </DemoCard>
          <DemoCard label="Icon set">
            <Inline gap={3} align="center" style={{ color: "var(--az-text-2)" }}>
              <Icon name="home" size={20} />
              <Icon name="search" size={20} />
              <Icon name="settings" size={20} />
              <Icon name="bell" size={20} />
              <Icon name="user" size={20} />
            </Inline>
          </DemoCard>
        </div>
      </section>

      <section className="az-section">
        <div className="az-section-head">
          <h2 className="az-section-title">Backgrounds</h2>
          <span className="az-section-sub">{BACKGROUNDS.length} variants · adapts to theme</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {BACKGROUNDS.map((bg) => (
            <div key={bg.id} className="az-bg-card">
              <Background variant={bg.id} className="az-bg-preview" />
              <div className="az-bg-meta">
                <div className="az-bg-name">{bg.name}</div>
                <div className="az-bg-desc">{bg.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
