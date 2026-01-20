import { Component, JSX, splitProps, Show } from 'solid-js';
import { cn } from '../../lib/utils';

export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: Component<InputProps> = (props) => {
    const [local, others] = splitProps(props, ['label', 'error', 'class', 'id']);
    const inputId = local.id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div class="input-wrapper">
            <Show when={local.label}>
                <label class="label" for={inputId}>{local.label}</label>
            </Show>
            <input
                id={inputId}
                class={cn('input', local.error && 'input-error', local.class)}
                {...others}
            />
            <Show when={local.error}>
                <span class="form-hint" style={{ color: 'var(--color-error)' }}>{local.error}</span>
            </Show>
        </div>
    );
};
