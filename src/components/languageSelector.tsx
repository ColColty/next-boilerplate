import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./ui/command";
import { useTranslation } from "next-i18next";
import { cn } from "~/utils";
import { useRouter } from "next/router";

const languages = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "fr",
    label: "Français",
  },
  {
    value: "es",
    label: "Español",
  },
];

const LanguageSelector = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(router.locale ?? "");

  const handleLanguageSelector = async (lang: string) => {
    setValue(lang === value ? "" : lang);
    setOpen(false);

    await router.push(router.asPath, router.asPath, { locale: lang });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? languages.find((language) => language.value === value)?.label
            : t("language.selector.placeholder")}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={t("language.selector.input")} />
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
                    "mr-2 h-4 w-4",
                    value === language.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {language.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
