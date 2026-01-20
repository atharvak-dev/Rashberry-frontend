import { Component, JSX, splitProps } from 'solid-js';
import { cn } from '../../lib/utils';

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'instagram';
    size?: 'sm' | 'default' | 'lg';
    fullWidth?: boolean;
}

export const Button: Component<ButtonProps> = (props) => {
    const [local, others] = splitProps(props, ['variant', 'size', 'fullWidth', 'class', 'children']);

    const variantClass = () => {
        switch (local.variant) {
            case 'secondary': return 'btn-secondary';
            case 'outline': return 'btn-outline';
            case 'ghost': return 'btn-ghost';
            case 'instagram': return 'btn-instagram';
            default: return 'btn-primary';
        }
    };

    const sizeClass = () => {
        switch (local.size) {
            case 'sm': return 'btn-sm';
            case 'lg': return 'btn-lg';
            default: return '';
        }
    };

    return (
        <button
            class={cn(
                'btn',
                variantClass(),
                sizeClass(),
                local.fullWidth && 'btn-full',
                local.class
            )}
            {...others}
        >
            {local.children}
        </button>
    );
};
