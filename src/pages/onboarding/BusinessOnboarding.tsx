import { Component, createSignal, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import {
    Button,
    Input,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    ChipGroup,
    ProgressSteps
} from '../../components/ui';

// Brand archetype options
const BRAND_ARCHETYPES = [
    'The Innovator (Tech/Future)',
    'The Caregiver (Health/Wellness)',
    'The Jester (Fun/Snacks)',
    'The Ruler (Luxury/Exclusive)',
    'The Explorer (Travel/Adventure)',
    'The Creator (Art/Design)'
];

// Campaign goal options
const CAMPAIGN_GOALS = [
    'Brand Awareness',
    'Conversions/Sales',
    'Trust Building',
    'Education',
    'Lead Generation',
    'App Installs'
];

// Price point options
const PRICE_POINTS = [
    'Budget-Friendly (Under $50)',
    'Mid-Range ($50-$200)',
    'Premium ($200-$500)',
    'Luxury ($500+)'
];

// Visual style options
const VISUAL_STYLES = [
    'Raw/UGC Style',
    'Polished/Cinematic',
    'Text-Heavy/Informative',
    'Minimalist/Clean',
    'Bold/Colorful',
    'Lifestyle/Aspirational'
];

// Target audience age options
const TARGET_AGES = [
    'Gen Z (18-24)',
    'Millennials (25-34)',
    'Gen X (35-44)',
    'Boomers (45+)',
    'All Ages'
];

const BusinessOnboarding: Component = () => {
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = createSignal(1);
    const [loading, setLoading] = createSignal(false);

    // Step 1: Brand Identity
    const [brandArchetype, setBrandArchetype] = createSignal<string[]>([]);
    const [campaignGoals, setCampaignGoals] = createSignal<string[]>([]);

    // Step 2: Product Details
    const [productName, setProductName] = createSignal('');
    const [productDescription, setProductDescription] = createSignal('');
    const [targetAge, setTargetAge] = createSignal<string[]>([]);
    const [pricePoint, setPricePoint] = createSignal<string[]>([]);

    // Step 3: Visual Requirements
    const [visualStyles, setVisualStyles] = createSignal<string[]>([]);

    const toggleArchetype = (archetype: string) => {
        setBrandArchetype(prev =>
            prev.includes(archetype)
                ? prev.filter(a => a !== archetype)
                : [...prev, archetype]
        );
    };

    const toggleGoal = (goal: string) => {
        setCampaignGoals(prev =>
            prev.includes(goal)
                ? prev.filter(g => g !== goal)
                : [...prev, goal]
        );
    };

    const toggleAge = (age: string) => {
        setTargetAge(prev =>
            prev.includes(age)
                ? prev.filter(a => a !== age)
                : [...prev, age]
        );
    };

    const togglePricePoint = (point: string) => {
        // Single select for price point
        setPricePoint(prev =>
            prev.includes(point) ? [] : [point]
        );
    };

    const toggleVisualStyle = (style: string) => {
        setVisualStyles(prev =>
            prev.includes(style)
                ? prev.filter(s => s !== style)
                : [...prev, style]
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
                brandArchetype: brandArchetype(),
                campaignGoals: campaignGoals(),
                productName: productName(),
                productDescription: productDescription(),
                targetAge: targetAge(),
                pricePoint: pricePoint()[0],
                visualStyles: visualStyles(),
            };

            console.log('Business onboarding complete:', onboardingData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Navigate to discover page to find influencers
            navigate('/discover');
        } catch (error) {
            console.error('Onboarding submission failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const canProceedStep1 = () => brandArchetype().length > 0 && campaignGoals().length > 0;
    const canProceedStep2 = () => productName().trim() !== '' && targetAge().length > 0;
    const canProceedStep3 = () => visualStyles().length > 0;

    return (
        <div class="onboarding-container">
            <div class="onboarding-content">
                <ProgressSteps steps={3} currentStep={currentStep} />

                {/* Step 1: Brand Identity */}
                <Show when={currentStep() === 1}>
                    <div class="animate-fade-in">
                        <h2 class="onboarding-title">Your Brand</h2>
                        <p class="onboarding-description">
                            Tell us about your brand identity and goals
                        </p>

                        <div class="onboarding-form">
                            <div class="form-group">
                                <label class="label">Brand Archetype</label>
                                <p class="form-hint">What personality best describes your brand?</p>
                                <ChipGroup
                                    options={BRAND_ARCHETYPES}
                                    selected={brandArchetype}
                                    onToggle={toggleArchetype}
                                />
                            </div>

                            <div class="form-group">
                                <label class="label">Campaign Goals</label>
                                <p class="form-hint">What do you want to achieve?</p>
                                <ChipGroup
                                    options={CAMPAIGN_GOALS}
                                    selected={campaignGoals}
                                    onToggle={toggleGoal}
                                />
                            </div>
                        </div>

                        <div class="onboarding-actions">
                            <Button
                                fullWidth
                                onClick={handleNext}
                                disabled={!canProceedStep1()}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </Show>

                {/* Step 2: Product Details */}
                <Show when={currentStep() === 2}>
                    <div class="animate-fade-in">
                        <h2 class="onboarding-title">Your Product</h2>
                        <p class="onboarding-description">
                            Tell us about what you're promoting
                        </p>

                        <div class="onboarding-form">
                            <Input
                                label="Product/Service Name"
                                placeholder="e.g., Premium Skincare Line"
                                value={productName()}
                                onInput={(e) => setProductName(e.currentTarget.value)}
                            />

                            <div class="input-wrapper">
                                <label class="label">Product Description</label>
                                <textarea
                                    class="textarea"
                                    placeholder="Brief description of your product or service..."
                                    value={productDescription()}
                                    onInput={(e) => setProductDescription(e.currentTarget.value)}
                                    rows={3}
                                />
                            </div>

                            <div class="form-group">
                                <label class="label">Target Audience Age</label>
                                <ChipGroup
                                    options={TARGET_AGES}
                                    selected={targetAge}
                                    onToggle={toggleAge}
                                />
                            </div>

                            <div class="form-group">
                                <label class="label">Price Point</label>
                                <p class="form-hint">Select one</p>
                                <ChipGroup
                                    options={PRICE_POINTS}
                                    selected={pricePoint}
                                    onToggle={togglePricePoint}
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

                {/* Step 3: Visual Requirements */}
                <Show when={currentStep() === 3}>
                    <div class="animate-fade-in">
                        <h2 class="onboarding-title">Visual Style</h2>
                        <p class="onboarding-description">
                            What style of content are you looking for?
                        </p>

                        <div class="onboarding-form">
                            <div class="form-group">
                                <label class="label">Preferred Visual Style</label>
                                <p class="form-hint">Select all that work for your brand</p>
                                <ChipGroup
                                    options={VISUAL_STYLES}
                                    selected={visualStyles}
                                    onToggle={toggleVisualStyle}
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
                                {loading() ? 'Completing...' : 'Find Influencers'}
                            </Button>
                        </div>
                    </div>
                </Show>
            </div>
        </div>
    );
};

export default BusinessOnboarding;
