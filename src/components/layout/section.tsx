import { type VariantProps, cva } from "class-variance-authority";
import { type ReactElement } from "react";
import { cn } from "~/utils";

const sectionVariants = cva("container pb-24", {
  variants: {
    disposition: {
      default: "",
      "side-by-side": "flex flex-col md:flex-row items-center justify-stretch gap-4",
      "row-4": "md:grid-cols-2 lg:grid-cols-4",
      "row-3": "lg:grid-cols-3",
      "dashboard-2-2": "grid grid-cols-2 grid-rows-2",
    },
  },
  compoundVariants: [
    {
      disposition: ["row-4", "row-3"],
      class: "grid grid-cols-1",
    },
  ],
});

interface SectionProps extends VariantProps<typeof sectionVariants> {
  name: string;
  className?: string;
  children: ReactElement;
}

const Section: React.FC<SectionProps> = (props) => {
  return (
    <div
      key={props.name}
      id={props.name}
      className={cn(
        sectionVariants({
          disposition: props.disposition,
          className: props.className,
        }),
      )}
    >
      {props.children}
    </div>
  );
};

export default Section;
