import React, { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "./ui/command";
import { useTranslation } from "next-i18next";
import { cn } from "~/utils";
import { useRouter } from "next/router";
import { languages } from "~/utils/languages";
import { cx } from "class-variance-authority";

interface LanguageSelectorProps {
  minimize?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = (props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(router.locale ?? "");

  useEffect(() => {
    if (router.locale !== value) {
      setValue((v) => router.locale ?? v);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);

  const handleLanguageSelector = async (lang: string) => {
    setValue(lang);
    setOpen(false);

    await router.push(router.asPath, router.asPath, { locale: lang });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={props.minimize ? "link" : "outline"}
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? languages.find((language) => language.value === value)?.[
                props.minimize ? "minimized" : "label"
              ]
            : t("language.selector.placeholder")}
          {!props.minimize && (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cx("p-0", props.minimize && "w-16")}>
        <Command>
          <CommandEmpty>{t("language.selector.empty")}</CommandEmpty>
          <CommandGroup>
            {languages.map((language) => (
              <CommandItem
                key={language.value}
                value={language.value}
                onSelect={handleLanguageSelector}
              >
                <Check
                  className={cn(
                    "mr-1 h-4 w-4",
                    value === language.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {props.minimize ? language.minimized : language.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
