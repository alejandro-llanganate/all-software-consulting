import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  hint?: string;
  error?: string;
  icon?: ReactNode;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { multiline?: false };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

export function FormField(props: InputProps | TextareaProps) {
  const { label, hint, error, icon, className, ...rest } = props;
  const fieldClass = cn(
    "w-full rounded-2xl border border-primary/10 bg-white/80 px-4 py-3.5 text-sm text-foreground",
    "placeholder:text-foreground/35 outline-none transition-all duration-200",
    "focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10",
    icon && "pl-11",
    error && "border-red-400 focus:ring-red-100",
    className,
  );

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground/80">{label}</label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-primary/50">
            {icon}
          </span>
        )}
        {"multiline" in props && props.multiline ? (
          <textarea {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} className={fieldClass} />
        ) : (
          <input {...(rest as InputHTMLAttributes<HTMLInputElement>)} className={fieldClass} />
        )}
      </div>
      {hint && !error && <p className="text-xs text-foreground/45">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
