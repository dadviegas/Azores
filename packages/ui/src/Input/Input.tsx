import {
  forwardRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from "react";
import {
  StyledInput,
  StyledTextarea,
  StyledSelect,
  StyledField,
  StyledLabel,
  StyledHelp,
} from "./Input.styles.js";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ invalid, ...rest }, ref) => (
    <StyledInput ref={ref} $invalid={invalid} aria-invalid={invalid} {...rest} />
  ),
);
Input.displayName = "Input";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ invalid, ...rest }, ref) => (
    <StyledTextarea ref={ref} $invalid={invalid} aria-invalid={invalid} {...rest} />
  ),
);
Textarea.displayName = "Textarea";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;
export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => (
  <StyledSelect ref={ref} {...props} />
));
Select.displayName = "Select";

export type FieldProps = { children: ReactNode; className?: string };
export const Field = ({ children, className }: FieldProps): JSX.Element => (
  <StyledField className={className}>{children}</StyledField>
);

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;
export const Label = (props: LabelProps): JSX.Element => <StyledLabel {...props} />;

export type HelpProps = { children: ReactNode; error?: boolean };
export const Help = ({ children, error }: HelpProps): JSX.Element => (
  <StyledHelp $error={error}>{children}</StyledHelp>
);
