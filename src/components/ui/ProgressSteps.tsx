import { Component, For, Accessor } from 'solid-js';
import { cn } from '../../lib/utils';

export interface ProgressStepsProps {
    steps: number;
    currentStep: Accessor<number>;
    class?: string;
}

export const ProgressSteps: Component<ProgressStepsProps> = (props) => {
    return (
        <div class={cn('progress-steps', props.class)}>
            <For each={Array.from({ length: props.steps }, (_, i) => i + 1)}>
                {(step, index) => (
                    <>
                        <div
                            class={cn(
                                'progress-step',
                                props.currentStep() === step && 'progress-step-active',
                                props.currentStep() > step && 'progress-step-completed'
                            )}
                        >
                            {props.currentStep() > step ? '✓' : step}
                        </div>
                        {index() < props.steps - 1 && (
                            <div
                                class={cn(
                                    'progress-line',
                                    props.currentStep() > step && 'progress-line-completed'
                                )}
                            />
                        )}
                    </>
                )}
            </For>
        </div>
    );
};
