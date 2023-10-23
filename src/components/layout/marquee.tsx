import React  from "react";
import { cn } from "~/utils";

interface MarqueeElementProps<T> {
  hidden?: boolean;
  elements: Array<{ label: string } | T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any;
}

function MarqueeElement<T extends object>(
  props: MarqueeElementProps<T>,
): ReturnType<React.FunctionComponent> {
  return (
    <>
      {props.elements.map((element, index) => {
        let Component = undefined;

        if (props.component) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          Component = React.cloneElement(props.component, { element });
        }

        return (
          <li
            key={index}
            className="relative flex h-20 w-52 items-center justify-center xl:h-24"
            aria-hidden={props.hidden}
          >
            {Component ?? <p>{"label" in element && element.label}</p>}
          </li>
        );
      })}
    </>
  );
}

interface MarqueeProps<T> {
  repeat?: number;
  elements: Array<{ label: string } | T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any;
  className?: string;
  time?: string;
}

function Marquee<T extends object>(
  props: MarqueeProps<T>,
): ReturnType<React.FunctionComponent> {
  const duplicates = Array.from(new Array(props.repeat ?? 2).keys());
  return (
    <div
      className={cn(
        "bg-gradient-to-20-d h-24 w-full overflow-hidden",
        props.className,
      )}
      style={{
        mask: "linear-gradient(90deg, transparent, white var(--_fade_start, 20%), white var(--_fade_end, 80%), transparent)",
        WebkitMask:
          "linear-gradient(90deg, transparent, white var(--_fade_start, 20%), white var(--_fade_end, 80%), transparent)",
      }}
    >
      <ul
        className="flex w-max animate-[marquee_forwards_linear_infinite] gap-4"
        style={{ animationDuration: props.time ?? "20s" }}
      >
        {duplicates.map((_, num) => (
          <MarqueeElement
            elements={props.elements}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            component={props.component}
            key={num}
            hidden={num > 0}
          />
        ))}
      </ul>
    </div>
  );
}

export default Marquee;
