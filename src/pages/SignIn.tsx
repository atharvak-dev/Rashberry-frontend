import { Component, createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, Tabs } from '../components/ui';

const SignIn: Component = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = createSignal(0);
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [loading, setLoading] = createSignal(false);

    const handleEmailSignIn = async (e: Event) => {
        e.preventDefault();
        setLoading(true);

        try {
            // TODO: Implement actual API call
            console.log('Signing in with:', { email: email(), password: password() });

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Navigate to home on success
            navigate('/');
        } catch (error) {
            console.error('Sign in failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInstagramSignIn = () => {
        // Redirect to backend Instagram OAuth
        const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        window.location.href = `${backendUrl}/instagram/auth?state=signin`;
    };

    return (
        <div class="auth-container">
            <div class="auth-content">
                <Card class="auth-card animate-slide-up">
                    <CardHeader>
                        <div class="auth-header">
                            <div class="auth-logo">Rashberry</div>
                            <p class="auth-subtitle">Sign in to your account</p>
                        </div>

                        <Tabs
                            tabs={['Influencer', 'Business']}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                    </CardHeader>

                    <CardContent>
                        {activeTab() === 0 ? (
                            // Influencer Sign In
                            <div class="auth-form animate-fade-in">
                                <Button
                                    variant="instagram"
                                    fullWidth
                                    onClick={handleInstagramSignIn}
                                    size="lg"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                    Continue with Instagram
                                </Button>

                                <div class="auth-divider">or</div>

                                <form onSubmit={handleEmailSignIn} class="auth-form">
                                    <Input
                                        label="Email"
                                        type="email"
                                        placeholder="you@example.com"
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
                                    <Button type="submit" fullWidth disabled={loading()}>
                                        {loading() ? 'Signing in...' : 'Sign In'}
                                    </Button>
                                </form>
                            </div>
                        ) : (
                            // Business Sign In
                            <form onSubmit={handleEmailSignIn} class="auth-form animate-fade-in">
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
                                <Button type="submit" fullWidth disabled={loading()}>
                                    {loading() ? 'Signing in...' : 'Sign In'}
                                </Button>
                            </form>
                        )}

                        <div class="auth-footer">
                            Don't have an account?{' '}
                            <A href="/signup">Sign up</A>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SignIn;
