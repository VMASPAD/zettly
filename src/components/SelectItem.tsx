import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react";

interface Item {
  value: string;
  label: string;
  styles?: string;
  icon?: React.ReactNode;
}

function SelectItem({items = []}: { items?: Item[] }) {
    return (
        <Popover>
            <PopoverTrigger><Button variant={"outline"}>Open</Button></PopoverTrigger>
            <PopoverContent className="p-0 w-fit">
                <Command>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup >
                            {
                                items.map((item) => (
                                    <CommandItem key={item.value}>
                                        {item.label}
                                        <CommandShortcut>
                                            {item.icon}
                                        </CommandShortcut>
                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default SelectItem
