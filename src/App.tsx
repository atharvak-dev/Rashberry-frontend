import { Router, Route } from '@solidjs/router';
import { Component, JSX } from 'solid-js';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { InfluencerOnboarding, BusinessOnboarding } from './pages/onboarding';

// Simple wrapper that just renders children (no navigation)
const AuthLayout: Component<{ children?: JSX.Element }> = (props) => {
    return <>{props.children}</>;
};

const App: Component = () => {
    return (
        <Router>
            {/* Auth routes - no bottom navigation */}
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/onboarding/influencer" component={InfluencerOnboarding} />
            <Route path="/onboarding/business" component={BusinessOnboarding} />

            {/* Main app routes - with bottom navigation */}
            <Route path="/" component={Layout}>
                <Route path="/" component={Home} />
                <Route path="/discover" component={Discover} />
                <Route path="/upload" component={Upload} />
                <Route path="/profile" component={Profile} />
            </Route>
        </Router>
    );
};

export default App;
