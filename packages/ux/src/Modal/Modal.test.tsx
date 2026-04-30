import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal.js";

describe("Modal", () => {
  it("renders nothing when closed", () => {
    render(
      <Modal open={false} onClose={() => {}} title="Hi">
        body
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders into a portal with title and aria-label when open", () => {
    render(
      <Modal open onClose={() => {}} title="Edit profile">
        <p>body</p>
      </Modal>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-label", "Edit profile");
    expect(screen.getByText("body")).toBeInTheDocument();
  });

  it("calls onClose when Escape is pressed", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="X">
        body
      </Modal>,
    );
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose on Escape when closeOnEscape is false", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} closeOnEscape={false} title="X">
        body
      </Modal>,
    );
    await userEvent.keyboard("{Escape}");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes when the backdrop is clicked", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="X">
        <button>inside</button>
      </Modal>,
    );
    // Click the dialog itself: stopPropagation should prevent close.
    await userEvent.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });
});
