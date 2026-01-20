import { Component, Show } from 'solid-js';
import { cn } from '../../lib/utils';

export interface ProfileCardProps {
    username: string;
    bio?: string;
    profilePictureUrl?: string;
    followersCount: number;
    followingCount: number;
    postsCount: number;
    class?: string;
}

const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
};

export const ProfileCard: Component<ProfileCardProps> = (props) => {
    return (
        <div class={cn('profile-card', props.class)}>
            <img
                src={props.profilePictureUrl || '/default-avatar.png'}
                alt={`${props.username}'s profile`}
                class="profile-avatar"
            />
            <div class="profile-username">@{props.username}</div>
            <Show when={props.bio}>
                <p class="profile-bio">{props.bio}</p>
            </Show>
            <div class="profile-stats">
                <div class="profile-stat">
                    <div class="profile-stat-value">{formatNumber(props.followersCount)}</div>
                    <div class="profile-stat-label">Followers</div>
                </div>
                <div class="profile-stat">
                    <div class="profile-stat-value">{formatNumber(props.followingCount)}</div>
                    <div class="profile-stat-label">Following</div>
                </div>
                <div class="profile-stat">
                    <div class="profile-stat-value">{formatNumber(props.postsCount)}</div>
                    <div class="profile-stat-label">Posts</div>
                </div>
            </div>
        </div>
    );
};
