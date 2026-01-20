import { Component, JSX, splitProps, Show, children as resolveChildren } from 'solid-js';
import { cn } from '../../lib/utils';

export interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
    glass?: boolean;
}

export const Card: Component<CardProps> = (props) => {
    const [local, others] = splitProps(props, ['glass', 'class', 'children']);

    return (
        <div
            class={cn('card', local.glass && 'card-glass', local.class)}
            {...others}
        >
            {local.children}
        </div>
    );
};

export const CardHeader: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
    const [local, others] = splitProps(props, ['class', 'children']);

    return (
        <div class={cn('card-header', local.class)} {...others}>
            {local.children}
        </div>
    );
};

export const CardTitle: Component<JSX.HTMLAttributes<HTMLHeadingElement>> = (props) => {
    const [local, others] = splitProps(props, ['class', 'children']);

    return (
        <h3 class={cn('card-title', local.class)} {...others}>
            {local.children}
        </h3>
    );
};

export const CardDescription: Component<JSX.HTMLAttributes<HTMLParagraphElement>> = (props) => {
    const [local, others] = splitProps(props, ['class', 'children']);

    return (
        <p class={cn('card-description', local.class)} {...others}>
            {local.children}
        </p>
    );
};

export const CardContent: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
    const [local, others] = splitProps(props, ['class', 'children']);

    return (
        <div class={cn('card-content', local.class)} {...others}>
            {local.children}
        </div>
    );
};

export const CardFooter: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
    const [local, others] = splitProps(props, ['class', 'children']);

    return (
        <div class={cn('card-footer', local.class)} {...others}>
            {local.children}
        </div>
    );
};
