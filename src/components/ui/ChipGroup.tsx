import { Component, For, Accessor } from 'solid-js';
import { cn } from '../../lib/utils';

export interface ChipGroupProps {
    options: string[];
    selected: Accessor<string[]>;
    onToggle: (option: string) => void;
    class?: string;
}

export const ChipGroup: Component<ChipGroupProps> = (props) => {
    return (
        <div class={cn('chip-group', props.class)}>
            <For each={props.options}>
                {(option) => (
                    <button
                        type="button"
                        class={cn('chip', props.selected().includes(option) && 'chip-selected')}
                        onClick={() => props.onToggle(option)}
                    >
                        {option}
                    </button>
                )}
            </For>
        </div>
    );
};
