import { Router, Route } from '@solidjs/router';
import { Component } from 'solid-js';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Upload from './pages/Upload';
import Profile from './pages/Profile';

const App: Component = () => {
    return (
        <Router root={Layout}>
            <Route path="/" component={Home} />
            <Route path="/discover" component={Discover} />
            <Route path="/upload" component={Upload} />
            <Route path="/profile" component={Profile} />
        </Router>
    );
};

export default App;
