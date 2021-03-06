import React from 'react';

import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// react-router imports
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

// make sure there's a proxy in package.json when using uri
const httpLink = createHttpLink({
	uri: '/graphql'
});

// set jwt as header for queries/mutations
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="flex-column justify-flex-start min-100-vh">
					<Header></Header>
					<div className="container">
						{/* Switch makes it default to one w/out path */}
						<Switch>
							<Route exact path="/" component={Home}></Route>
							<Route exact path="/login" component={Login}></Route>
							<Route exact path="/signup" component={Signup}></Route>
							{/* question mark makes it optional */}
							<Route
								exact
								path="/profile/:username?"
								component={Profile}
							></Route>
							<Route
								exact
								path="/thought/:id"
								component={SingleThought}
							></Route>

							<Route component={NoMatch}></Route>
						</Switch>
					</div>
					<Footer></Footer>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
