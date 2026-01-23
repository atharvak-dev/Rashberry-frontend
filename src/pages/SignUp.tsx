import { Component, createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, Tabs } from '../components/ui';

const SignUp: Component = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = createSignal(0);
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [confirmPassword, setConfirmPassword] = createSignal('');
    const [companyName, setCompanyName] = createSignal('');
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal('');

    const handleInfluencerSignUp = () => {
        // Redirect to backend Instagram OAuth for influencer signup
        const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        // State includes role info for callback handling
        window.location.href = `${backendUrl}/instagram/auth?state=signup_influencer`;
    };

    const handleBusinessSignUp = async (e: Event) => {
        e.preventDefault();
        setError('');

        if (password() !== confirmPassword()) {
            setError('Passwords do not match');
            return;
        }

        if (password().length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);

        try {
            // TODO: Implement actual API call
            console.log('Signing up business:', {
                email: email(),
                companyName: companyName(),
                password: password()
            });

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Navigate to business onboarding
            navigate('/onboarding/business');
        } catch (error) {
            console.error('Sign up failed:', error);
            setError('Sign up failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="auth-container">
            <div class="auth-content">
                <Card class="auth-card animate-slide-up">
                    <CardHeader>
                        <div class="auth-header">
                            <div class="auth-logo">Rashberry</div>
                            <p class="auth-subtitle">Create your account</p>
                        </div>

                        <Tabs
                            tabs={['Influencer', 'Business']}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                    </CardHeader>

                    <CardContent>
                        {activeTab() === 0 ? (
                            // Influencer Sign Up - Instagram OAuth
                            <div class="auth-form animate-fade-in">
                                <div style={{
                                    "text-align": "center",
                                    "margin-bottom": "var(--space-lg)",
                                    color: "var(--color-text-secondary)"
                                }}>
                                    <p style={{ "margin-bottom": "var(--space-sm)" }}>
                                        Connect your Instagram to get started
                                    </p>
                                    <p style={{
                                        "font-size": "var(--font-size-xs)",
                                        color: "var(--color-text-tertiary)"
                                    }}>
                                        We'll verify your profile and import your stats
                                    </p>
                                </div>

                                <Button
                                    variant="instagram"
                                    fullWidth
                                    onClick={handleInfluencerSignUp}
                                    size="lg"
                                    class="instagram-login-btn"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                    <div style="display: flex; flex-direction: column; align-items: flex-start; line-height: 1.2;">
                                        <span>Connect Instagram Account</span>
                                        <span style="font-size: 0.75em; opacity: 0.8; font-weight: normal;">(Influencers Only)</span>
                                    </div>
                                </Button>

                                <p style={{
                                    "text-align": "center",
                                    "font-size": "var(--font-size-xs)",
                                    color: "var(--color-text-tertiary)",
                                    "margin-top": "var(--space-lg)"
                                }}>
                                    By continuing, you agree to our Terms of Service and Privacy Policy
                                </p>
                            </div>
                        ) : (
                            // Business Sign Up - Email form
                            <form onSubmit={handleBusinessSignUp} class="auth-form animate-fade-in">
                                <Input
                                    label="Company Name"
                                    type="text"
                                    placeholder="Your Company"
                                    value={companyName()}
                                    onInput={(e) => setCompanyName(e.currentTarget.value)}
                                    required
                                />
                                <Input
                                    label="Business Email"
                                    type="email"
                                    placeholder="contact@company.com"
                                    value={email()}
                                    onInput={(e) => setEmail(e.currentTarget.value)}
                                    required
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password()}
                                    onInput={(e) => setPassword(e.currentTarget.value)}
                                    required
                                />
                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword()}
                                    onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                                    error={error()}
                                    required
                                />
                                <Button type="submit" fullWidth disabled={loading()}>
                                    {loading() ? 'Creating Account...' : 'Create Business Account'}
                                </Button>
                            </form>
                        )}

                        <div class="auth-footer">
                            Already have an account?{' '}
                            <A href="/signin">Sign in</A>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SignUp;
