import { Component, JSX, splitProps, For, createSignal, Accessor } from 'solid-js';
import { cn } from '../../lib/utils';

export interface TabsProps {
    tabs: string[];
    activeTab: Accessor<number>;
    onTabChange: (index: number) => void;
    class?: string;
}

export const Tabs: Component<TabsProps> = (props) => {
    return (
        <div class={cn('tabs', props.class)}>
            <For each={props.tabs}>
                {(tab, index) => (
                    <button
                        class={cn('tab', props.activeTab() === index() && 'tab-active')}
                        onClick={() => props.onTabChange(index())}
                        type="button"
                    >
                        {tab}
                    </button>
                )}
            </For>
        </div>
    );
};
