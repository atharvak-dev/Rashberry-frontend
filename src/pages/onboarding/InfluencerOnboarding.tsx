import { Component, createSignal, Show, createEffect, onMount } from 'solid-js';
import { useNavigate, useSearchParams } from '@solidjs/router';
import {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    ChipGroup,
    ProgressSteps,
    ProfileCard
} from '../../components/ui';

// Content category options
const CONTENT_CATEGORIES = [
    'Tech/SaaS', 'Lifestyle', 'Beauty', 'Ed-Tech',
    'Finance', 'Comedy', 'Fitness', 'Fashion',
    'Travel', 'Food', 'Gaming', 'Music'
];

// Content format options
const CONTENT_FORMATS = [
    'Skits/Comedy', 'Educational', 'Aesthetic Vlogs',
    'Unboxing/Reviews', 'Tutorials', 'Day in Life'
];

// Content tone options
const CONTENT_TONES = [
    'Professional/Serious', 'Chaotic/High Energy',
    'Calming/Minimalist', 'Controversial/Debate',
    'Inspirational', 'Casual/Relatable'
];

// Product type options
const PRODUCT_TYPES = [
    'Physical Goods', 'Digital Products',
    'Apps & Software', 'Services', 'Courses'
];

// Industries to exclude
const EXCLUDED_INDUSTRIES = [
    'Gambling', 'Crypto', 'Alcohol',
    'Tobacco', 'Adult Content', 'Weapons'
];

interface InstagramProfile {
    id: string;
    username: string;
    bio?: string;
    profilePictureUrl?: string;
    followersCount: number;
    followsCount: number;
    mediaCount: number;
    accessToken: string;
}

const InfluencerOnboarding: Component = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [currentStep, setCurrentStep] = createSignal(1);
    const [loading, setLoading] = createSignal(false);

    // Step 1: Instagram profile data
    const [instagramProfile, setInstagramProfile] = createSignal<InstagramProfile | null>(null);
    const [profileConfirmed, setProfileConfirmed] = createSignal(false);

    // Step 2: Content & Niche
    const [categories, setCategories] = createSignal<string[]>([]);
    const [formats, setFormats] = createSignal<string[]>([]);
    const [tones, setTones] = createSignal<string[]>([]);

    // Step 3: Product preferences
    const [productTypes, setProductTypes] = createSignal<string[]>([]);
    const [excludedIndustries, setExcludedIndustries] = createSignal<string[]>([]);

    // Check for OAuth callback data on mount
    onMount(async () => {
        const tokenParam = searchParams.access_token;
        const accessToken = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
        if (accessToken) {
            setLoading(true);
            try {
                const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const response = await fetch(`${backendUrl}/instagram/me?access_token=${accessToken}`);

                if (response.ok) {
                    const data = await response.json();
                    setInstagramProfile({
                        id: data.id,
                        username: data.username,
                        bio: data.biography,
                        profilePictureUrl: data.profilePictureUrl,
                        followersCount: data.followersCount || 0,
                        followsCount: data.followsCount || 0,
                        mediaCount: data.mediaCount || 0,
                        accessToken: accessToken,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch Instagram profile:', error);
            } finally {
                setLoading(false);
            }
        }
    });

    const handleConnectInstagram = () => {
        const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        // Redirect URI should point back to this onboarding page
        window.location.href = `${backendUrl}/instagram/auth?state=onboarding_influencer`;
    };

    const handleConfirmProfile = () => {
        setProfileConfirmed(true);
        setCurrentStep(2);
    };

    const handleTryDifferentAccount = () => {
        setInstagramProfile(null);
        handleConnectInstagram();
    };

    const toggleCategory = (category: string) => {
        setCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleFormat = (format: string) => {
        setFormats(prev =>
            prev.includes(format)
                ? prev.filter(f => f !== format)
                : [...prev, format]
        );
    };

    const toggleTone = (tone: string) => {
        setTones(prev =>
            prev.includes(tone)
                ? prev.filter(t => t !== tone)
                : [...prev, tone]
        );
    };

    const toggleProductType = (type: string) => {
        setProductTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const toggleExcludedIndustry = (industry: string) => {
        setExcludedIndustries(prev =>
            prev.includes(industry)
                ? prev.filter(i => i !== industry)
                : [...prev, industry]
        );
    };

    const handleNext = () => {
        if (currentStep() < 3) {
            setCurrentStep(currentStep() + 1);
        }
    };

    const handleBack = () => {
        if (currentStep() > 1) {
            setCurrentStep(currentStep() - 1);
        }
    };

    const handleComplete = async () => {
        setLoading(true);

        try {
            // TODO: Submit to API
            const onboardingData = {
                instagram: instagramProfile(),
                categories: categories(),
                formats: formats(),
                tones: tones(),
                productTypes: productTypes(),
                excludedIndustries: excludedIndustries(),
            };

            console.log('Onboarding complete:', onboardingData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Navigate to profile
            navigate('/profile');
        } catch (error) {
            console.error('Onboarding submission failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const canProceedStep2 = () => categories().length > 0 && formats().length > 0;
    const canProceedStep3 = () => productTypes().length > 0;

    return (
        <div class="onboarding-container">
            <div class="onboarding-content">
                <ProgressSteps steps={3} currentStep={currentStep} />

                {/* Step 1: Instagram Verification */}
                <Show when={currentStep() === 1}>
                    <div class="animate-fade-in">
                        <h2 class="onboarding-title">Verify Your Instagram</h2>
                        <p class="onboarding-description">
                            Connect your Instagram account to verify your profile
                        </p>

                        <Show when={loading()}>
                            <Card>
                                <CardContent>
                                    <div style={{ "text-align": "center", padding: "var(--space-xl)" }}>
                                        <p style={{ color: "var(--color-text-secondary)" }}>
                                            Loading your profile...
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Show>

                        <Show when={!loading() && !instagramProfile()}>
                            <Card>
                                <CardContent>
                                    <div style={{ "text-align": "center", padding: "var(--space-xl)" }}>
                                        <p style={{
                                            color: "var(--color-text-secondary)",
                                            "margin-bottom": "var(--space-lg)"
                                        }}>
                                            We'll verify your followers, posts, and bio
                                        </p>
                                        <Button
                                            variant="instagram"
                                            size="lg"
                                            onClick={handleConnectInstagram}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                            Connect Instagram
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Show>

                        <Show when={!loading() && instagramProfile()}>
                            <Card>
                                <CardHeader>
                                    <CardTitle style={{ "text-align": "center" }}>
                                        Is this you?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ProfileCard
                                        username={instagramProfile()!.username}
                                        bio={instagramProfile()!.bio}
                                        profilePictureUrl={instagramProfile()!.profilePictureUrl}
                                        followersCount={instagramProfile()!.followersCount}
                                        followingCount={instagramProfile()!.followsCount}
                                        postsCount={instagramProfile()!.mediaCount}
                                    />

                                    <div class="onboarding-actions" style={{
                                        "justify-content": "center",
                                        "flex-direction": "column",
                                        gap: "var(--space-sm)"
                                    }}>
                                        <Button
                                            fullWidth
                                            onClick={handleConfirmProfile}
                                        >
                                            Yes, that's me!
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            fullWidth
                                            onClick={handleTryDifferentAccount}
                                        >
                                            Try a different account
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Show>
                    </div>
                </Show>

                {/* Step 2: Content & Niche */}
                <Show when={currentStep() === 2}>
                    <div class="animate-fade-in">
                        <h2 class="onboarding-title">Your Content</h2>
                        <p class="onboarding-description">
                            Tell us about the content you create
                        </p>

                        <div class="onboarding-form">
                            <div class="form-group">
                                <label class="label">Content Categories</label>
                                <p class="form-hint">Select all that apply</p>
                                <ChipGroup
                                    options={CONTENT_CATEGORIES}
                                    selected={categories}
                                    onToggle={toggleCategory}
                                />
                            </div>

                            <div class="form-group">
                                <label class="label">Content Format</label>
                                <p class="form-hint">What type of content do you create?</p>
                                <ChipGroup
                                    options={CONTENT_FORMATS}
                                    selected={formats}
                                    onToggle={toggleFormat}
                                />
                            </div>

                            <div class="form-group">
                                <label class="label">Content Tone</label>
                                <p class="form-hint">How would you describe your style?</p>
                                <ChipGroup
                                    options={CONTENT_TONES}
                                    selected={tones}
                                    onToggle={toggleTone}
                                />
                            </div>
                        </div>

                        <div class="onboarding-actions">
                            <Button variant="ghost" onClick={handleBack}>
                                Back
                            </Button>
                            <Button
                                fullWidth
                                onClick={handleNext}
                                disabled={!canProceedStep2()}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </Show>

                {/* Step 3: Product Preferences */}
                <Show when={currentStep() === 3}>
                    <div class="animate-fade-in">
                        <h2 class="onboarding-title">Product Preferences</h2>
                        <p class="onboarding-description">
                            What types of products do you want to promote?
                        </p>

                        <div class="onboarding-form">
                            <div class="form-group">
                                <label class="label">Product Types</label>
                                <p class="form-hint">Select the types you're interested in</p>
                                <ChipGroup
                                    options={PRODUCT_TYPES}
                                    selected={productTypes}
                                    onToggle={toggleProductType}
                                />
                            </div>

                            <div class="form-group">
                                <label class="label">Industries to Exclude</label>
                                <p class="form-hint">Optional - select any you won't work with</p>
                                <ChipGroup
                                    options={EXCLUDED_INDUSTRIES}
                                    selected={excludedIndustries}
                                    onToggle={toggleExcludedIndustry}
                                />
                            </div>
                        </div>

                        <div class="onboarding-actions">
                            <Button variant="ghost" onClick={handleBack}>
                                Back
                            </Button>
                            <Button
                                fullWidth
                                onClick={handleComplete}
                                disabled={!canProceedStep3() || loading()}
                            >
                                {loading() ? 'Completing...' : 'Complete Setup'}
                            </Button>
                        </div>
                    </div>
                </Show>
            </div>
        </div>
    );
};

export default InfluencerOnboarding;
