import {
  cloneElement,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children?: ReactNode;
}

type ButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: false;
  };

type ButtonLinkProps = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild: true;
    children: ReactElement<AnchorHTMLAttributes<HTMLAnchorElement>>;
  };

type Props = ButtonProps | ButtonLinkProps;

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline:
    "border border-border bg-background text-foreground hover:bg-surface-muted",
  ghost: "bg-transparent text-foreground hover:bg-surface-muted",
};

const baseStyles =
  "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

export function Button({ variant = "primary", className, ...props }: Props) {
  const styles = cn(baseStyles, variants[variant], className);

  if (props.asChild) {
    const child = props.children;

    if (!child) {
      return null;
    }

    return cloneElement(child, {
      className: cn(styles, child.props.className),
    });
  }

  const buttonProps = props;

  return <button {...buttonProps} className={styles} type="button" />;
}
